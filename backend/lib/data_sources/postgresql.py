from models.data_source import DataSourceType
from .base import CredentialsSchema, DatabaseConnection


class PostgreSqlConnection(DatabaseConnection, name=DataSourceType.postgresql.value):
    __dialect = "postgresql"

    def __init__(self, credentials: CredentialsSchema):
        self.credentials = credentials

    def check_connection(self):
        engine = self.get_engine(dialect=self.__dialect, credentials=self.credentials)
        try:
            engine.connect()
            return {"connection_result": True}
        except Exception as e:
            return {"connection_result": False, "connection_error": e.__str__()}
