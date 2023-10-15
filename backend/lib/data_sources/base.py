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


class DatabaseConnection(ABC):
    __DB__ = {}

    def __init_subclass__(cls, name: str, **kwargs):
        if name in cls.__DB__.keys():
            raise
        cls.__DB__[name] = cls

    @abstractmethod
    def check_connection(self):
        pass

    def get_engine(self, dialect: str, credentials: CredentialsSchema):
        return sa.create_engine(
            f"{dialect}://{credentials.username}:{credentials.password}@{credentials.host}:{credentials.port}/{credentials.db}"
        )

    @classmethod
    def get_data_source_cls(cls, data_source_type: DataSourceType, *args, **kwargs):
        if not data_source_type.value in cls.__DB__.keys():
            raise NotImplementedError
        return cls.__DB__[data_source_type.value](*args, **kwargs)
