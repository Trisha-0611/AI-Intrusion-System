from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from passlib.context import CryptContext
from jose import jwt

router = APIRouter()

SECRET_KEY = "secret123"

pwd = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

class User(BaseModel):
    username: str
    password: str


# TEMP REGISTER
@router.post("/register")
async def register(user: User):

    return {
        "msg": "User registered successfully"
    }


# TEMP LOGIN
@router.post("/login")
async def login(user: User):

    # Demo credentials
    if (
        user.username == "admin"
        and
        user.password == "1234"
    ):

        token = jwt.encode(
            {"username": user.username},
            SECRET_KEY,
            algorithm="HS256"
        )

        return {
            "token": token
        }

    raise HTTPException(
        status_code=400,
        detail="Invalid credentials"
    )