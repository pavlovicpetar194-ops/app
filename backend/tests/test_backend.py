"""Backend API tests for Pavlovića med honey site (iteration 2)."""
import os
import requests
import pytest

BASE_URL = os.environ["REACT_APP_BACKEND_URL"].rstrip("/")
API = f"{BASE_URL}/api"


# Root
def test_root_message():
    r = requests.get(f"{API}/", timeout=20)
    assert r.status_code == 200
    data = r.json()
    assert "Pčelarstvo" in data.get("message", "")


# Products — must be exactly 3 with new IDs, prices, weight, and image paths
def test_products_list_count_and_ids():
    r = requests.get(f"{API}/products", timeout=20)
    assert r.status_code == 200
    items = r.json()
    assert isinstance(items, list)
    assert len(items) == 3, f"Expected 3 products, got {len(items)}"
    ids = {p["id"] for p in items}
    assert ids == {"bagremov-med", "suncokretov-med", "livadski-med"}, ids


def test_products_fields_and_prices():
    r = requests.get(f"{API}/products", timeout=20)
    items = {p["id"]: p for p in r.json()}

    # Bagremov 1.200 RSD
    bag = items["bagremov-med"]
    assert bag["name"] == "Bagremov med"
    assert bag["price"] == "1.200 RSD"
    assert bag["weight"] == "1kg"
    assert bag["image"] == "/api/static/products/bagremov.png"

    # Suncokretov 1.000 RSD
    sun = items["suncokretov-med"]
    assert sun["name"] == "Suncokretov med"
    assert sun["price"] == "1.000 RSD"
    assert sun["weight"] == "1kg"
    assert sun["image"] == "/api/static/products/suncokretov.png"

    # Livadski 1.000 RSD
    liv = items["livadski-med"]
    assert liv["name"] == "Livadski med"
    assert liv["price"] == "1.000 RSD"
    assert liv["weight"] == "1kg"
    assert liv["image"] == "/api/static/products/livadski.png"


# Static product images
@pytest.mark.parametrize("name", ["bagremov.png", "suncokretov.png", "livadski.png"])
def test_static_product_image_served(name):
    url = f"{API}/static/products/{name}"
    r = requests.get(url, timeout=20)
    assert r.status_code == 200, f"{url} -> {r.status_code}"
    assert r.headers.get("content-type", "").startswith("image/png"), r.headers.get("content-type")
    assert len(r.content) > 1000  # not an empty/error response


# Contact create
def test_contact_create_valid():
    payload = {
        "name": "TEST_Marko",
        "email": "marko@test.rs",
        "message": "TEST_Testna poruka iz pytest-a",
    }
    r = requests.post(f"{API}/contact", json=payload, timeout=20)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["id"]
    assert data["created_at"]
    assert data["name"] == payload["name"]
    assert data["email"] == payload["email"]
    assert data["message"] == payload["message"]
    assert isinstance(data["created_at"], str)


def test_contact_missing_email_returns_422():
    r = requests.post(f"{API}/contact", json={"name": "X", "message": "hi"}, timeout=20)
    assert r.status_code == 422


def test_contact_invalid_email_returns_422():
    r = requests.post(
        f"{API}/contact",
        json={"name": "X", "email": "not-an-email", "message": "hi"},
        timeout=20,
    )
    assert r.status_code == 422


def test_contact_missing_message_returns_422():
    r = requests.post(
        f"{API}/contact",
        json={"name": "X", "email": "a@b.co"},
        timeout=20,
    )
    assert r.status_code == 422


# Contact list (persistence + no _id)
def test_contact_list_persistence_and_no_mongo_id():
    seed = {"name": "TEST_Seed2", "email": "seed2@test.rs", "message": "TEST_seed2"}
    cr = requests.post(f"{API}/contact", json=seed, timeout=20)
    assert cr.status_code == 200
    new_id = cr.json()["id"]

    r = requests.get(f"{API}/contact", timeout=20)
    assert r.status_code == 200
    items = r.json()
    assert isinstance(items, list)
    assert any(it["id"] == new_id for it in items)
    for it in items:
        assert "_id" not in it
