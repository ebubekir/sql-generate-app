import typing
import sqlalchemy as sa

from lib.database.orm import ORMBase
from lib.exceptions import NOT_FOUND_EXCEPTION
from models.data_source import DataSource
from lib.data_sources.base import DatabaseConnection, CredentialsSchema
from lib.query import Expression, Query, WhereClause, Operator, QueryManager


from .dto import AddDataSourceRequestDto, CheckCredentialsDto


class DataSourceService:
    def __init__(self, user):
        self.user = user

    @staticmethod
    def get_default_data_source(user_id: int):
        data_source = ORMBase[DataSource].get(
            DataSource.created_by_id == user_id,
            DataSource.is_default == True,
            model=DataSource,
        )
        return data_source

    def add(self, data_source: AddDataSourceRequestDto):
        data_source = DataSource(
            name=data_source.name,
            created_by_id=self.user.id,
            credentials=data_source.credentials.model_dump(),
            type=data_source.type,
        )
        return ORMBase[DataSource].create(data_source)

    def get_connection(self, data_source_id: int):
        data_source = DataSourceService.get(data_source_id)
        connection = DatabaseConnection.get_data_source_cls(
            data_source_type=data_source.get("type"),
            credentials=CredentialsSchema(**data_source["credentials"]),
        )
        return connection

    def check_connection(self, credentials: CheckCredentialsDto) -> bool:
        data_source = DatabaseConnection.get_data_source_cls(
            data_source_type=credentials.type, credentials=credentials.credentials
        )
        return data_source.check_connection()

    def list(self):
        return ORMBase[DataSource].get_all(
            DataSource.created_by_id == self.user.id, model=DataSource
        )

    @staticmethod
    def get(data_source_id: int):
        data_source = ORMBase[DataSource].get(
            DataSource.id == data_source_id, model=DataSource
        )
        if not data_source:
            raise NOT_FOUND_EXCEPTION
        return {
            k: v
            for k, v in data_source.__dict__.items()
            if k != "_sa_instance_state" and not k.startswith("__")
        }

    def get_table_list(self, data_source_id: int = None):
        if not data_source_id:
            data_source_id = DataSourceService.get_default_data_source(self.user.id).id
        connection = self.get_connection(data_source_id)
        table_names = [t for t in connection.get_table_list()]

        return table_names

    def get_column_list(self, table_name: str, data_source_id: int = None):
        if not data_source_id:
            data_source_id = DataSourceService.get_default_data_source(self.user.id).id
        data_source = DataSourceService.get(data_source_id=data_source_id)
        connection = self.get_connection(data_source_id)
        engine = connection.get_engine()
        inspector = sa.inspect(engine)
        columns = inspector.get_columns(
            table_name, schema=data_source["credentials"]["schema"]
        )

        return [{**c, **dict(type=str(c["type"]))} for c in columns]

    def get_column_list_of_tables(
        self, table_name_list: typing.List[str], data_source_id: int = None
    ):
        if not data_source_id:
            data_source_id = DataSourceService.get_default_data_source(self.user.id).id

        column_list = {}
        for table_name in table_name_list:
            column_list[table_name] = self.get_column_list(
                table_name=table_name, data_source_id=data_source_id
            )
        return column_list

    def set_as_default_data_source(self, data_source_id: int):
        ORMBase[DataSource].update_all(
            DataSource.id == data_source_id,
            set_list=dict(is_default=True),
            model=DataSource,
        )

        ORMBase[DataSource].update_all(
            DataSource.id != data_source_id,
            set_list=dict(is_default=False),
            model=DataSource,
        )

        return True

    def get_column_values(
        self,
        table_name: str,
        column_name: str,
        data_source_id: int = None,
        search_query: str = None,
    ):
        if not data_source_id:
            data_source_id = DataSourceService.get_default_data_source(self.user.id).id
        connection = self.get_connection(data_source_id)
        query = Query(
            selections=[
                Expression(col=column_name, col_operator="distinct", label="values")
            ]
        )
        condition = None

        if search_query:
            condition = WhereClause(
                col=Expression(col=column_name, col_operator="lower"),
                op=Operator.contains,
                value=search_query.lower(),
            )

        query.conditions = condition

        query_manager = QueryManager(connection=connection, table_name=table_name)
        response = query_manager.read_query(q=query)
        return response["values"].tolist()
