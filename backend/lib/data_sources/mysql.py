from models.data_source import DataSourceType
from .base import CredentialsSchema, DatabaseConnection


class MySqlConnection(DatabaseConnection, name=DataSourceType.mysql.value):
    _dialect = "mysql+pymysql"

    def __init__(self, credentials: CredentialsSchema):
        super().__init__(credentials)

    def check_connection(self):
        engine = self.get_engine()
        try:
            engine.connect()
            return {
                "connection_result": True,
            }
        except Exception as e:
            return {"connection_result": False, "connection_error": e.__str__()}
