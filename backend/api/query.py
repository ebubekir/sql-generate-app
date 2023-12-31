from fastapi import Request

from lib.app import create_router, app
import time
from services.query import GenerateQueryDto, QueryService

router = create_router(auth=True)


@router.post("/generate")
async def generate_query(
    request: Request, query: GenerateQueryDto, data_source_id: int = None
):
    service = QueryService(
        user=request.user, query=query, data_source_id=data_source_id
    )
    return service.generate()


app.include_router(router, prefix="/query", tags=["query"])
