from sqlalchemy import create_engine
from lib.__settings__ import settings

engine = create_engine(
    f"postgresql://{settings.db.user}:{settings.db.password}@{settings.db.host}:{settings.db.port}/{settings.db.name}"
)
