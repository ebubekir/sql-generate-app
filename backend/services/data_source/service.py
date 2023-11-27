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

    def add(self, data_source: AddDataSourceRequestDto):
        data_source = DataSource(
            name=data_source.name,
            created_by_id=self.user.id,
            credentials=data_source.credentials.model_dump(),
            type=data_source.type,
        )
        return ORMBase[DataSource].create(data_source)

    def _get_connection(self, data_source_id: int):
        data_source = self.get(data_source_id)
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

    def get(self, data_source_id: int):
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

    def get_table_list(self, data_source_id: int):
        connection = self._get_connection(data_source_id)
        table_names = [t for t in connection.get_table_list()]

        return table_names

    def get_column_list(self, data_source_id: int, table_name: str):
        connection = self._get_connection(data_source_id)
        engine = connection.get_engine()
        inspector = sa.inspect(engine)
        columns = inspector.get_columns(table_name)

        return [{**c, **dict(type=str(c["type"]))} for c in columns]

    def get_column_values(
        self,
        table_name: str,
        data_source_id: int,
        column_name: str,
        search_query: str = None,
    ):
        connection = self._get_connection(data_source_id)
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
