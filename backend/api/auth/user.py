from typing import Annotated

from lib import app
from lib.app import create_router
from schemas import auth as schemas
from services import auth as services

from fastapi import Depends
from fastapi.security import OAuth2PasswordRequestForm

router = create_router(auth=True)


@app.post("/register")
async def register_user(user: schemas.AddUserSchema):
    return services.add_user(user)


@app.post("/login")
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
    return services.login(email=form_data.username, password=form_data.password)


@router.get("/validate-token")
async def validate_token():
    pass


@router.get("/user/{id}")
async def get_user_detail():
    pass


app.include_router(router=router, prefix="/user", tags=["user"])
