from models.auth.user import User
from lib.__settings__ import settings
from lib.database import ORMBase

from jose import jwt, JWTError
from fastapi.exceptions import HTTPException
from fastapi import FastAPI, APIRouter, Depends
from fastapi.security import OAuth2PasswordBearer
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from lib import exceptions

allowed_origins = ["http://localhost:3000"]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(exceptions.CustomHTTPException)
async def custom_http_exception_handler(request, exc):
    return JSONResponse(status_code=exc.status_code, content=exc.detail)


oauth_schema = OAuth2PasswordBearer(tokenUrl="/login", scheme_name="JWT")


async def get_current_user(token: str = Depends(oauth_schema)) -> User:
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        user_id: int = payload.get("user_id")
        if user_id is None:
            raise credentials_exception
    except JWTError as e:
        print(e)
        raise credentials_exception

    user = ORMBase[User].get(User.id == user_id, model=User)
    if user is None:
        raise credentials_exception
    return user


def create_router(auth=False):
    if not auth:
        return APIRouter()
    return APIRouter(dependencies=[Depends(get_current_user)])
