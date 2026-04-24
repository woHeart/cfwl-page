from fastapi import APIRouter, Depends, HTTPException, status, Query, Body
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.db import get_db
from schemas.atlas import AtlasResponse, AtlasAddRequest

router = APIRouter()


@router.get("/find", response_model=AtlasResponse)
async def get_atlas_by_url(
    url: str = Query(...), db: AsyncIOMotorDatabase = Depends(get_db)
):

    try:
        atlas_doc = await db.atlas.find_one(
            {"url": url},
            {"_id": 0},  # 不返回 _id
        )

        if not atlas_doc:
            raise HTTPException(status.HTTP_404_NOT_FOUND, detail="未找到该地址")

        return {"code": 200, "msg": "查询成功", "data": atlas_doc}

    except Exception as e:
        raise HTTPException(
            status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"数据库错误: {str(e)}"
        )


@router.post("/add", response_model=AtlasResponse, status_code=status.HTTP_201_CREATED)
async def add_atlas_url(
    request: AtlasAddRequest = Body(...), db: AsyncIOMotorDatabase = Depends(get_db)
):

    try:
        result = await db.atlas.insert_one({"url": request.url})

        inserted_doc = await db.atlas.find_one({"_id": result.inserted_id}, {"_id": 0})

        return {"code": 200, "msg": "添加成功", "data": inserted_doc}

    except Exception as e:
        raise HTTPException(
            status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"数据库错误: {str(e)}"
        )
