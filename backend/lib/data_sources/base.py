import sqlalchemy as sa

from pydantic import BaseModel
from abc import ABC, abstractmethod
from models.data_source import DataSourceType


class CredentialsSchema(BaseModel):
    host: str
    username: str
    password: str
    db: str
    port: str
    schema: str


class DatabaseConnection(ABC):
    __DB__ = {}
    _dialect = None

    def __init__(self, credentials: CredentialsSchema):
        self.credentials = credentials
        self._metadata = None

    def __init_subclass__(cls, name: str, **kwargs):
        if name in cls.__DB__.keys():
            raise NotImplementedError
        cls.__DB__[name] = cls

    @property
    def metadata(self):
        if not self._metadata:
            self._metadata = sa.MetaData(schema=self.credentials.schema)
        return self._metadata

    @abstractmethod
    def check_connection(self):
        pass

    def get_engine(self):
        return sa.create_engine(
            f"{self._dialect}://{self.credentials.username}:{self.credentials.password}@{self.credentials.host}:{self.credentials.port}/{self.credentials.db}"
        )

    def get_table_list(self):
        engine = self.get_engine()
        self.metadata.reflect(bind=engine)
        return self.metadata.tables

    @classmethod
    def get_data_source_cls(
        cls, data_source_type: DataSourceType, *args, **kwargs
    ) -> "DatabaseConnection":
        if data_source_type.value not in cls.__DB__.keys():
            raise NotImplementedError
        return cls.__DB__[data_source_type.value](*args, **kwargs)
