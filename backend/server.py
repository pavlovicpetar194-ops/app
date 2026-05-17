from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.staticfiles import StaticFiles
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
        "description": "Svetli, bistro zlatni med sa cvetova bagrema. Nežnog ukusa i dugotrajne tečnosti — savršen za čaj, doručak i svakodnevnu upotrebu.",
        "price": "1.200 RSD",
        "weight": "1kg",
        "image": "/api/static/products/bagremov.png",
        "imagePosition": "center",
    },
    {
        "id": "suncokretov-med",
        "name": "Suncokretov med",
        "description": "Bogat, žarko žuti med sa polja suncokreta. Karakterističnog, punog ukusa — brzo kristališe, što je znak prirodnosti.",
        "price": "1.000 RSD",
        "weight": "1kg",
        "image": "/api/static/products/suncokretov.png",
        "imagePosition": "center",
    },
    {
        "id": "cvetni-med",
        "name": "Cvetni med",
        "description": "Cvetni (vrcani) med sa raznovrsnih livadskih cvetova okoline Lazarevca. Topla zlatna boja, balansiran i mirisan ukus.",
        "price": "1.000 RSD",
        "weight": "1kg",
        "image": "https://customer-assets.emergentagent.com/job_pcelji-zaklon/artifacts/ld8g1jbk_image.png",
        "imagePosition": "center",
    },
]


@api_router.get("/products")
async def get_products():
    return PRODUCTS


# Include router
app.include_router(api_router)

# Mount static files (product images) under /api/static
STATIC_DIR = ROOT_DIR / "static"
STATIC_DIR.mkdir(parents=True, exist_ok=True)
app.mount("/api/static", StaticFiles(directory=str(STATIC_DIR)), name="static")

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
