from models.data_source import DataSourceType
from .base import CredentialsSchema, DatabaseConnection


class PostgreSqlConnection(DatabaseConnection, name=DataSourceType.postgresql.value):
    __dialect = "postgresql"

    def __init__(self, credentials: CredentialsSchema):
        self.credentials = credentials

    def check_connection(self):
        engine = self.get_engine(dialect=self.__dialect, **self.credentials.__dict__)
        try:
            engine.connect()
            return True
        except Exception as e:
            return False
