from fastapi import APIRouter, Depends, HTTPException, status, Query, Body
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.db import get_db
from schemas.music import MusicAddRequest, MusicResponse

router = APIRouter()


@router.get("/find", response_model=MusicResponse)
async def get_music_by_title(
    title: str = Query(...), db: AsyncIOMotorDatabase = Depends(get_db)
):

    try:
        music_doc = await db.musics.find_one({}, {"_id": 0})
        for item in music_doc.get("music", []):
            if item["title"] == title:
                return {"code": 200, "msg": "查询成功", "data": item}
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail="未找到该地址")

    except Exception as e:
        raise HTTPException(
            status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"数据库错误: {str(e)}"
        )


@router.post("/add", response_model=MusicResponse, status_code=status.HTTP_201_CREATED)
async def add_music_title(
    request: MusicAddRequest = Body(...), db: AsyncIOMotorDatabase = Depends(get_db)
):

    try:
        result = await db.musics.update_one(
            {},
            {
                "$push": {
                    "music": {
                        "$each": [request.model_dump()],  # 要插入的数据
                        "$position": 0,  # 数组头部（索引0）
                    }
                }
            },
        )

        if result.modified_count == 1:
            return {"code": 200, "msg": "添加成功", "data": request.model_dump()}
        else:
            return {"code": 400, "msg": "添加失败", "data": {}}

    except Exception as e:
        raise HTTPException(
            status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"数据库错误: {str(e)}"
        )
