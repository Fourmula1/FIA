import os
from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache

class Settings(BaseSettings):
    openai_api_key: str | None = None
    llama_cloud_api_key: str | None = None
    chroma_db_dir: str = os.path.join(os.getcwd(), "data/chroma_db")
    
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

@lru_cache
def get_settings():
    return Settings()
