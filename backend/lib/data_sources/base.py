import sqlalchemy as sa

from dataclasses import dataclass
from abc import ABC, abstractmethod


@dataclass
class CredentialsSchema:
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

    def get_engine(
        self, dialect: str, username: str, password: str, host: str, port: str, db: str
    ):
        return sa.create_engine(f"{dialect}://{username}:{password}@{host}:{port}/{db}")
