import pandas as pd
import sqlalchemy as sa

from .query import Query
from lib.exceptions import NOT_FOUND_EXCEPTION
from lib.data_sources.base import DatabaseConnection


class QueryManager:
    def __init__(self, connection: DatabaseConnection, table_name: str):
        self.connection = connection
        self.table_name = table_name

    def read_query(self, q: Query, raise_exc: bool = True) -> pd.DataFrame:
        table = sa.Table(self.table_name, self.connection.metadata)
        df = pd.read_sql(q.render(table), self.connection.get_engine())
        if raise_exc and df.empty:
            raise NOT_FOUND_EXCEPTION
        return df
