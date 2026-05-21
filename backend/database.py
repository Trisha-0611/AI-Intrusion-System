from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URL = "mongodb://localhost:27017"

client = AsyncIOMotorClient(
    MONGO_URL,
    serverSelectionTimeoutMS=3000
)

db = client["intrusion_db"]

attacks_collection = db["attacks"]
users_collection = db["users"]
