import os
from alembic import context
from sqlalchemy import engine_from_config, pool
from logging.config import fileConfig

# Импортируем настройки и Base
from app.core.config import settings
from app.core.database import Base
# Импортируем модель User
from app.models.user import User
from app.models.notification import Notification
from app.models.product import Product

# Загружаем конфигурацию из alembic.ini
config = context.config

# Настраиваем логи
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Устанавливаем строку подключения из settings.DATABASE_URL
config.set_main_option("sqlalchemy.url", settings.DATABASE_URL)

# Указываем metadata для моделей SQLAlchemy
target_metadata = Base.metadata

def run_migrations_offline():
    """Запуск миграций в оффлайн-режиме."""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online():
    """Запуск миграций в онлайн-режиме."""
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection, target_metadata=target_metadata
        )

        with context.begin_transaction():
            context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()