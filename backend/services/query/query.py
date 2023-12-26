from .dto import GenerateQueryDto
from ..data_source.service import DataSourceService
from lib.query import QueryManager


class QueryService:
    def __init__(self, user, query: GenerateQueryDto, data_source_id: int = None):
        self.table = query.tableName
        self.query = query.query
        self.user = user
        if not data_source_id:
            self.data_source_id = DataSourceService.get_default_data_source(
                self.user.id
            ).id
        else:
            self.data_source_id = data_source_id

    def generate(self):
        data_source_service = DataSourceService(user=self.user)
        connection = data_source_service.get_connection(
            data_source_id=self.data_source_id
        )
        query_manager = QueryManager(
            connection=connection,
            table_name=self.table,
        )

        table = query_manager.get_table()

        return self.query.render(t=table, return_query=True)
