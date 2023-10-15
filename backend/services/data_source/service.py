from lib.database.orm import ORMBase
from lib.exceptions import NOT_FOUND_EXCEPTION
from models.data_source import DataSource
from lib.data_sources.base import DatabaseConnection


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
