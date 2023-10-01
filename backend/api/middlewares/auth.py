from lib.app import app
from lib.database.orm import ORMBase
from utils.exceptions import NOT_AUTH_EXCEPTION
from services.auth.user import verify_token
from models.auth.user import User

from starlette.authentication import AuthenticationBackend
from starlette.middleware.authentication import AuthenticationMiddleware


class AuthMiddleware(AuthenticationBackend):
    async def authenticate(self, conn):
        if "Authorization" not in conn.headers or conn.url.path == "/login":
            return

        try:
            token = conn.headers["Authorization"]
            decoded = verify_token(token)
        except:
            raise NOT_AUTH_EXCEPTION

        user = ORMBase[User].get(User.id == decoded["user_id"], model=User)

        return True, user


app.add_middleware(AuthenticationMiddleware, backend=AuthMiddleware())
