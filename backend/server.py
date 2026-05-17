from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ============== Models ==============
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class ContactMessageCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    phone: Optional[str] = Field(default=None, max_length=40)
    subject: Optional[str] = Field(default=None, max_length=200)
    message: str = Field(..., min_length=1, max_length=4000)
    product: Optional[str] = Field(default=None, max_length=120)


class ContactMessage(ContactMessageCreate):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ============== Routes ==============
@api_router.get("/")
async def root():
    return {"message": "Pčelarstvo API"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    items = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for item in items:
        if isinstance(item.get('timestamp'), str):
            item['timestamp'] = datetime.fromisoformat(item['timestamp'])
    return items


@api_router.post("/contact", response_model=ContactMessage)
async def create_contact_message(payload: ContactMessageCreate):
    obj = ContactMessage(**payload.model_dump())
    doc = obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    try:
        await db.contact_messages.insert_one(doc)
    except Exception:
        logging.exception("Failed to store contact message")
        raise HTTPException(status_code=500, detail="Greška prilikom čuvanja poruke")
    return obj


@api_router.get("/contact", response_model=List[ContactMessage])
async def list_contact_messages():
    items = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for item in items:
        if isinstance(item.get('created_at'), str):
            item['created_at'] = datetime.fromisoformat(item['created_at'])
    return items


# ============== Products (static, served from API for flexibility) ==============
PRODUCTS = [
    {
        "id": "bagremov-med",
        "name": "Bagremov med",
        "description": "Svetli, blagi med sa cvetova bagrema. Nežnog ukusa, savršen za svakodnevnu upotrebu i čaj.",
        "price": "1.200 RSD",
        "weight": "720g",
        "image": "https://static.prod-images.emergentagent.com/jobs/433fc96d-379b-496e-b1e9-64758ac885c1/images/6dc443831ae9764a463bbeba8baab496f054a222d3f1e76f89264145020faa5c.png",
    },
    {
        "id": "livadski-med",
        "name": "Livadski med",
        "description": "Bogat med sa raznih livadskih cvetova. Karakterističan, pun ukus i topla zlatna boja.",
        "price": "1.100 RSD",
        "weight": "720g",
        "image": "https://images.unsplash.com/photo-1587049352851-8d4e89133924?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwxfHxob25leSUyMGphciUyMHBvdXJpbmd8ZW58MHx8fHwxNzc5MDE4MTc2fDA&ixlib=rb-4.1.0&q=85",
    },
    {
        "id": "sumski-med",
        "name": "Šumski med",
        "description": "Taman, izrazito aromatičan med iz šumskih predela. Snažan, mineralno bogat profil.",
        "price": "1.400 RSD",
        "weight": "720g",
        "image": "https://images.unsplash.com/photo-1718146921295-700b969e7c78?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHw0fHxob25leSUyMGphciUyMHBvdXJpbmd8ZW58MHx8fHwxNzc5MDE4MTc2fDA&ixlib=rb-4.1.0&q=85",
    },
    {
        "id": "propolis",
        "name": "Propolis",
        "description": "Prirodna propolisova tinktura. Tradicionalno korišćena za jačanje organizma.",
        "price": "900 RSD",
        "weight": "30ml",
        "image": "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwzfHxob25leSUyMGphciUyMHBvdXJpbmd8ZW58MHx8fHwxNzc5MDE4MTc2fDA&ixlib=rb-4.1.0&q=85",
    },
    {
        "id": "polen",
        "name": "Polen",
        "description": "Sveže ubran cvetni polen. Prirodan izvor proteina, vitamina i minerala.",
        "price": "1.300 RSD",
        "weight": "250g",
        "image": "https://images.unsplash.com/photo-1613548058193-1cd24c1bebcf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwyfHxob25leSUyMGphciUyMHBvdXJpbmd8ZW58MHx8fHwxNzc5MDE4MTc2fDA&ixlib=rb-4.1.0&q=85",
    },
]


@api_router.get("/products")
async def get_products():
    return PRODUCTS


# Include router
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
