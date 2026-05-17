"""One-time generator for 3 Pavlovića med product jar shots using Gemini Nano Banana."""
import asyncio
import base64
import os
from pathlib import Path
from dotenv import load_dotenv
from emergentintegrations.llm.chat import LlmChat, UserMessage, ImageContent

ROOT = Path(__file__).resolve().parent.parent
load_dotenv(ROOT / ".env")

REF_IMAGE = "/tmp/jars_ref.webp"
OUT_DIR = ROOT / "static" / "products"
OUT_DIR.mkdir(parents=True, exist_ok=True)

PRODUCTS = [
    {
        "id": "bagremov",
        "prompt": (
            "Create a single premium product photograph of one glass honey jar identical "
            "in shape and label style to the jars in the reference image. The jar contains "
            "light golden, crystal clear acacia honey (bagremov med). The label is the "
            "exact same orange/red label from the reference with a black hexagonal "
            "honeycomb pattern at the top, a small bee emblem, and Serbian Cyrillic text "
            "reading 'БАГРЕМОВ - врцани -' as the main title and 'Павловића мед' in a "
            "cursive script below. Keep label colors, layout, fonts and proportions "
            "exactly like the reference jars. The jar has a black metal lid and is "
            "photographed centered on a soft warm beige background (#F2EAE0) with a gentle "
            "drop shadow. Studio product photography, sharp focus, square 1:1 framing, "
            "high-end commercial look."
        ),
    },
    {
        "id": "suncokretov",
        "prompt": (
            "Create a single premium product photograph of one glass honey jar identical "
            "in shape and label style to the jars in the reference image. The jar contains "
            "rich opaque sunflower honey (suncokretov med) in a vivid warm yellow/amber "
            "color. The label is the exact same orange/red label from the reference with "
            "the black hexagonal honeycomb pattern at the top, the small bee emblem, and "
            "Serbian Cyrillic text reading 'СУНЦОКРЕТОВ - врцани -' as the main title and "
            "'Павловића мед' in cursive script below. Match label colors, layout, fonts "
            "and proportions exactly like the reference jars. Black metal lid. Centered "
            "on a soft warm beige background (#F2EAE0) with gentle drop shadow. Studio "
            "product photography, sharp focus, square 1:1 framing, high-end commercial look."
        ),
    },
    {
        "id": "livadski",
        "prompt": (
            "Create a single premium product photograph of one glass honey jar identical "
            "in shape and label style to the jars in the reference image. The jar contains "
            "warm amber-orange wildflower honey (livadski/cvetni med). The label is the "
            "exact same orange/red label from the reference with the black hexagonal "
            "honeycomb pattern at the top, the small bee emblem, and Serbian Cyrillic "
            "text reading 'ЛИВАДСКИ - врцани -' as the main title and 'Павловића мед' in "
            "cursive script below. Match label colors, layout, fonts and proportions "
            "exactly like the reference jars. Black metal lid. Centered on a soft warm "
            "beige background (#F2EAE0) with gentle drop shadow. Studio product photography, "
            "sharp focus, square 1:1 framing, high-end commercial look."
        ),
    },
]


async def generate_one(api_key: str, ref_b64: str, item: dict):
    chat = LlmChat(
        api_key=api_key,
        session_id=f"gen-{item['id']}",
        system_message="You are an expert product photographer and packaging designer.",
    )
    chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(
        modalities=["image", "text"]
    )
    msg = UserMessage(text=item["prompt"], file_contents=[ImageContent(ref_b64)])
    text, images = await chat.send_message_multimodal_response(msg)
    print(f"[{item['id']}] response text snippet:", (text or "")[:120])
    if not images:
        print(f"[{item['id']}] NO IMAGES returned")
        return None
    img = images[0]
    out_path = OUT_DIR / f"{item['id']}.png"
    out_path.write_bytes(base64.b64decode(img["data"]))
    print(f"[{item['id']}] saved -> {out_path}")
    return out_path


async def main():
    api_key = os.getenv("EMERGENT_LLM_KEY")
    assert api_key, "EMERGENT_LLM_KEY missing"
    ref_b64 = base64.b64encode(Path(REF_IMAGE).read_bytes()).decode("utf-8")
    for item in PRODUCTS:
        try:
            await generate_one(api_key, ref_b64, item)
        except Exception as e:
            print(f"[{item['id']}] FAILED:", repr(e))


if __name__ == "__main__":
    asyncio.run(main())
