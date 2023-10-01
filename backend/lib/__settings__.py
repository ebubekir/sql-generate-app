from dynaconf import Dynaconf

settings = Dynaconf(
    environments=True,
    envvar_prefix="DYNACONF",
    settings_files=["settings.toml", ".secrets.toml"],
)
