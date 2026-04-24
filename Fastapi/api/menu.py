from fastapi import APIRouter, HTTPException, status
from schemas.menu import MenuResponse
from app.db import MongoDB

router = APIRouter()


@router.get("", response_model=MenuResponse, response_model_exclude_unset=True)
async def get_menu():
    db = MongoDB().db

    try:
        menu_doc = await db.menus.find_one({"_id": "main_menu"})

        if not menu_doc:
            raise HTTPException(status.HTTP_404_NOT_FOUND, "未查询到菜单")

        menu_tree = menu_doc.get("menu_tree")

        return {"code": 200, "msg": "查询成功", "data": menu_tree}

    except Exception as e:
        raise HTTPException(
            status.HTTP_500_INTERNAL_SERVER_ERROR, f"Database error: {str(e)}"
        )
