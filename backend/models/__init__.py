from .base import Base
from lib.database.engine import engine
from .auth import *
from .data_source import *
from .report import *

Base.metadata.create_all(engine)
