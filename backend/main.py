import uvicorn
from lib.__settings__ import *
from models import *
from api import *
from lib import app
from lib.database import run_migrations

if __name__ == "__main__":
    run_migrations()
    uvicorn.run(app)
