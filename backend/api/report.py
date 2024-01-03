from fastapi import Request

from lib.app import create_router, app
from services.report.dto import SaveReportDto
from services.report.service import ReportService

router = create_router(auth=True)


@router.post("/save")
async def save_report(request: Request, report: SaveReportDto):
    service = ReportService(user=request.user)
    return service.save_report(report=report)


@router.delete("/delete")
async def delete_report(request: Request, report_id: int):
    service = ReportService(user=request.user)
    return service.delete_report(report_id=report_id)


@router.get("/detail")
async def get_report_detail(request: Request, report_id: int):
    service = ReportService(user=request.user)
    return service.detail_report(report_id=report_id)


@router.get("/list")
async def get_report_list(request: Request):
    service = ReportService(user=request.user)
    return service.list_reports()


app.include_router(router, prefix="/report", tags=["report"])
