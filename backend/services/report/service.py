from .dto import SaveReportDto

from models.report import Report
from services.data_source.service import DataSourceService
from lib.database.orm import ORMBase
from lib.exceptions import NOT_FOUND_EXCEPTION


class ReportService:
    def __init__(self, user):
        self.user = user

    def save_report(self, report: SaveReportDto):
        data_source_id = report.data_source_id
        if not data_source_id:
            data_source_id = DataSourceService.get_default_data_source(self.user.id).id
        model = Report(
            name=report.name,
            description=report.description,
            created_by_id=self.user.id,
            data_source_id=data_source_id,
            type=report.report_type,
            config=report.request_schema,
        )
        return ORMBase[Report].create(model)

    def delete_report(self, report_id: int):
        return ORMBase[Report].delete(Report.id == report_id, model=Report)

    def detail_report(self, report_id: int):
        report = ORMBase[Report].get(Report.id == report_id, model=Report)
        if not report:
            raise NOT_FOUND_EXCEPTION
        return {
            k: v
            for k, v in report.__dict__.items()
            if k != "_sa_instance_state" and not k.startswith("__")
        }

    def list_reports(self):
        report_list = ORMBase[Report].get_all(
            Report.created_by_id == self.user.id, model=Report
        )
        if not report_list:
            raise NOT_FOUND_EXCEPTION

        response = []
        for report in report_list:
            response.append(
                {
                    k: v
                    for k, v in report.__dict__.items()
                    if k != "_sa_instance_state" and not k.startswith("__")
                }
            )
        return response
