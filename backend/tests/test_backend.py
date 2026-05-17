"""Backend API tests for Pčelarstvo honey site."""
import os
import requests
import pytest

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://pcelji-zaklon.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


# Root
def test_root_message():
    r = requests.get(f"{API}/", timeout=20)
    assert r.status_code == 200
    data = r.json()
    assert "Pčelarstvo" in data.get("message", "")


# Products
def test_products_list():
    r = requests.get(f"{API}/products", timeout=20)
    assert r.status_code == 200
    items = r.json()
    assert isinstance(items, list)
    assert len(items) == 5
    ids = {p["id"] for p in items}
    assert {"bagremov-med", "livadski-med", "sumski-med", "propolis", "polen"} == ids
    for p in items:
        for k in ("name", "description", "price", "image"):
            assert p.get(k)


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
    # 'created_at' must be ISO/datetime string
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


# Contact list (no _id)
def test_contact_list_persistence_and_no_mongo_id():
    # Seed one
    seed = {"name": "TEST_Seed", "email": "seed@test.rs", "message": "TEST_seed"}
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
