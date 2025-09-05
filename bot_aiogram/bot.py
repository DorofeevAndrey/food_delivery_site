import asyncio
import aiohttp
from aiogram import Bot, Dispatcher, Router, types
from aiogram.types import ReplyKeyboardMarkup, KeyboardButton
from aiogram.filters import Command

from config import settings
from redis_client import r 

# создаём роутер
router = Router()

# клавиатура для телефона
phone_kb = ReplyKeyboardMarkup(
    keyboard=[[KeyboardButton(text="Отправить номер 📱", request_contact=True)]],
    resize_keyboard=True,
    one_time_keyboard=True
)

def redis_key_for_user(user_id: int) -> str:
    return f"tg_session:{user_id}"

# ---- handlers ----

@router.message(Command("start"))
async def send_welcome(message: types.Message):
    args = message.text.split(maxsplit=1)
    session_id = args[1].strip() if len(args) > 1 else None

    if not session_id:
        await message.answer("Привет! Чтобы начать, пожалуйста, авторизуйтесь через наш сайт.")
        return

    user_id = message.from_user.id
    await r.set(redis_key_for_user(user_id), session_id, ex=600)

    await message.answer("Привет! Отправь свой номер телефона 👇", reply_markup=phone_kb)


@router.message(lambda msg: msg.contact is not None)
async def handle_contact(message: types.Message):
    user_id = message.from_user.id
    key = redis_key_for_user(user_id)
    session_id = await r.get(key)

    if not session_id:
        await message.answer("Сессия устарела. Вернись на сайт и начни заново.")
        return

    if message.contact.user_id != user_id:
        await message.answer("Можно отправлять только свой номер.")
        return

    phone = message.contact.phone_number
    payload = {"phone": phone, "session_id": session_id }

    async with aiohttp.ClientSession() as session:
        async with session.post(f"{settings.BACKEND_URL}/auth/verify", json=payload) as resp:
            if resp.status == 200:
                await message.answer("✅ Телефон подтверждён!")
                await r.delete(key)
            else:
                text = await resp.text()
                await message.answer(f"❌ Ошибка: {text}")

# ---- запуск ----

async def main():
    bot = Bot(token=settings.TELEGRAM_BOT_TOKEN)
    dp = Dispatcher()
    dp.include_router(router)

    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
