from lib import app
from lib.app import create_router
from services.data_source.service import DataSourceService
from services.data_source.dto import AddDataSourceRequestDto, CheckCredentialsDto

from fastapi import Request

router = create_router(auth=True)


@router.post("/add")
async def add_data_source(request: Request, data_source: AddDataSourceRequestDto):
    service = DataSourceService(user=request.user)
    return service.add(data_source=data_source)


@router.post("/check-connection")
async def check_data_source_connection(
    request: Request, credentials: CheckCredentialsDto
):
    service = DataSourceService(user=request.user)
    return service.check_connection(credentials=credentials)


@router.get("/list")
async def get_all_data_sources(request: Request):
    service = DataSourceService(user=request.user)
    return [
        {
            k: v
            for k, v in l.__dict__.items()
            if k != "_sa_instance_state" and not k.startswith("__")
        }
        for l in service.list()
    ]


@router.get("/detail")
async def get_data_source_detail(request: Request, data_source_id: int):
    service = DataSourceService(user=request.user)
    return service.get(data_source_id=data_source_id)


@router.get("/table-list")
async def get_table_list_of_data_source(request: Request, data_source_id: int):
    service = DataSourceService(user=request.user)
    return service.get_table_list(data_source_id=data_source_id)


@router.get("/column-list")
async def get_column_list_of_table(
    request: Request, table_name: str, data_source_id: int
):
    service = DataSourceService(user=request.user)
    return service.get_column_list(data_source_id=data_source_id, table_name=table_name)


@router.get("/column-values")
async def get_column_values(
    request: Request,
    table_name: str,
    data_source_id: int,
    column_name: str,
    search_query: str = None,
):
    service = DataSourceService(user=request.user)
    return service.get_column_values(
        data_source_id=data_source_id,
        table_name=table_name,
        column_name=column_name,
        search_query=search_query,
    )


app.include_router(router, prefix="/data-source", tags=["data-source"])
