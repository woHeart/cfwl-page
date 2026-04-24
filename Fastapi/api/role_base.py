from fastapi import APIRouter, Depends, HTTPException, status, Query, Body
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.db import get_db
from schemas.role_base import RoleBaseAddRequest, RoleBaseResponse

router = APIRouter()


@router.get("/find", response_model=RoleBaseResponse)
async def get_role_base_by_name(
    name: str = Query(...), db: AsyncIOMotorDatabase = Depends(get_db)
):

    try:
        role_base_doc = await db.role_bases.find_one(
            {"name": name},
            {"_id": 0},  # 不返回 _id
        )

        if not role_base_doc:
            raise HTTPException(status.HTTP_404_NOT_FOUND, detail="未找到该地址")

        return {"code": 200, "msg": "查询成功", "data": role_base_doc}

    except Exception as e:
        raise HTTPException(
            status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"数据库错误: {str(e)}"
        )


@router.post(
    "/add", response_model=RoleBaseResponse, status_code=status.HTTP_201_CREATED
)
async def add_role_base_name(
    request: RoleBaseAddRequest = Body(...), db: AsyncIOMotorDatabase = Depends(get_db)
):

    try:
        await db.role_bases.update_many(
            {},
            {"$inc": {"sequence": 1}},  # MongoDB 自增操作符
        )

        result = await db.role_bases.insert_one(request.model_dump())

        inserted_doc = await db.role_bases.find_one(
            {"_id": result.inserted_id}, {"_id": 0}
        )

        return {"code": 200, "msg": "添加成功", "data": inserted_doc}

    except Exception as e:
        raise HTTPException(
            status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"数据库错误: {str(e)}"
        )
