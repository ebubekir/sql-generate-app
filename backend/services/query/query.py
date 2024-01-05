from .dto import GenerateQueryDto
from ..data_source.service import DataSourceService
from lib.query import QueryManager
from .report_type_factory import ReportBuilder


class QueryService:
    def __init__(self, user, query: GenerateQueryDto, data_source_id: int = None):
        self.table = query.tableName
        self.query = query.query
        self.report_type = query.reportType
        self.report_config = query.reportConfig
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
        report_builder = ReportBuilder.get_builder(
            type=self.report_type.value,
            query=self.query,
            config=self.report_config,
            connection=connection,
            table=table,
        )
        return report_builder.build()
