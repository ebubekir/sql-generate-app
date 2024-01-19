FROM python:3.11.5

WORKDIR /backend

COPY pyproject.toml poetry.lock* /backend/

RUN pip install poetry && poetry config virtualenvs.create false

RUN poetry install --no-dev --no-root

COPY . /backend

CMD ["python", "main.py"]