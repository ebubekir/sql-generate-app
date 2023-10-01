from datetime import timedelta, datetime

from schemas import auth as schemas
from lib.database.orm import ORMBase
from lib import settings
from models import auth as models
from utils import exceptions

from jose import jwt
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def verify_token(token: str):
    token = token.replace("Bearer ", "")
    decoded_jwt = jwt.decode(token, settings.SECRET_KEY, algorithms=settings.ALGORITHM)
    return decoded_jwt


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(hours=4)

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, settings.ALGORITHM)

    # If there is already a token delete it first.
    already_created_token = ORMBase[models.UserToken].get_all(
        models.UserToken.status != models.TokenStatus.deleted, model=models.UserToken
    )
    if already_created_token:
        ORMBase[models.UserToken].update_all(
            models.UserToken.id.in_([token.id for token in already_created_token]),
            set_list=dict(status=models.TokenStatus.deleted),
            model=models.UserToken,
        )

    ORMBase[models.UserToken].create(
        models.UserToken(
            user_id=data["user_id"],
            jwt_token=encoded_jwt,
        )
    )

    return encoded_jwt


def add_user(user: schemas.AddUserSchema):
    return ORMBase[models.User].create(models.User(**user.model_dump()))


def login(email: str, password: str):
    user = ORMBase[models.User].get(models.User.email == email, model=models.User)
    if not user:
        raise exceptions.NOT_FOUND_EXCEPTION
    if not verify_password(password, user.password):
        raise exceptions.NOT_AUTH_EXCEPTION
    return {
        "access_token": create_access_token(data=dict(user_id=user.id)),
        "token_type": "bearer",
    }
