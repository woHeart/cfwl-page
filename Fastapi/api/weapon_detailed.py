from fastapi import APIRouter, Depends, HTTPException, status, Query, Body
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.db import get_db
from schemas.weapon_detailed import WeaponDetailedAddRequest, WeaponDetailedResponse

router = APIRouter()


@router.get("/find", response_model=WeaponDetailedResponse)
async def get_weapon_detailed_by_name(
    name: str = Query(...), db: AsyncIOMotorDatabase = Depends(get_db)
):

    try:
        weapon_detailed_doc = await db.weapon_detaileds.find_one(
            {"baseData.chinese": name},
            {"_id": 0},  # 不返回 _id
        )

        if not weapon_detailed_doc:
            raise HTTPException(status.HTTP_404_NOT_FOUND, detail="未找到该地址")

        return {"code": 200, "msg": "查询成功", "data": weapon_detailed_doc}

    except Exception as e:
        raise HTTPException(
            status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"数据库错误: {str(e)}"
        )


@router.post(
    "/add", response_model=WeaponDetailedResponse, status_code=status.HTTP_201_CREATED
)
async def add_weapon_detailed_name(
    request: WeaponDetailedAddRequest = Body(...),
    db: AsyncIOMotorDatabase = Depends(get_db),
):

    try:
        result = await db.weapon_detaileds.insert_one(request.model_dump(by_alias=True))

        inserted_doc = await db.weapon_detaileds.find_one(
            {"_id": result.inserted_id}, {"_id": 0}
        )

        return {"code": 200, "msg": "添加成功", "data": inserted_doc}

    except Exception as e:
        raise HTTPException(
            status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"数据库错误: {str(e)}"
        )
