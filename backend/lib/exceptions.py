import typing
import http
from pydantic import BaseModel, Field
from fastapi.exceptions import HTTPException


class ExceptionSchema(BaseModel):
    status_name: str
    status_code: int
    error_message: typing.Optional[str] = Field(default=None)
    invalid_params: typing.Optional[dict] = Field(default=None)


class CustomHTTPException(HTTPException):
    def __init__(
        self,
        status: http.HTTPStatus,
        error_message: str = None,
        invalid_params: dict = None,
        *args,
        **kwargs
    ):
        super().__init__(status_code=status.value, *args, **kwargs)
        self.detail = ExceptionSchema(
            status_name=status.name,
            status_code=status.value,
            error_message=error_message,
            invalid_params=invalid_params,
        ).model_dump(exclude_unset=True, exclude_none=True)


NOT_FOUND_EXCEPTION = CustomHTTPException(status=http.HTTPStatus.NOT_FOUND)

NOT_AUTH_EXCEPTION = CustomHTTPException(status=http.HTTPStatus.UNAUTHORIZED)
