from fastapi.exceptions import HTTPException

NOT_FOUND_EXCEPTION = HTTPException(
    status_code=404, detail={"message": "Not found.", "status_code": "404"}
)

NOT_AUTH_EXCEPTION = HTTPException(
    status_code=401, detail={"message": "Not authorized", "status_code": 401}
)
