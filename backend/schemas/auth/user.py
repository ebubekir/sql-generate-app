from typing import Annotated

from pydantic import BaseModel, EmailStr, Field
from passlib.context import CryptContext
from pydantic.functional_validators import AfterValidator


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(v: str) -> str:
    return pwd_context.hash(v)


Password = Annotated[str, AfterValidator(hash_password)]


class AddUserSchema(BaseModel):
    email: EmailStr
    password: Password
    full_name: str = Field(..., min_length=1)
