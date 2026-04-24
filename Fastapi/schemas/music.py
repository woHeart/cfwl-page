from pydantic import BaseModel, Field


class MusicAddRequest(BaseModel):
    id: int
    gameId: int
    envType: int
    title: str = Field(..., description="主标题")
    shortTitle: str = Field(..., description="短标题")
    desc: str = Field(..., description="详细描述")
    collectionId: int = Field(..., description="合集ID")
    status: int = Field(..., description="状态")
    onlineTime: str = Field(..., description="上线时间")
    offlineTime: str = Field(..., description="下线时间")
    musicUrl: str = Field(..., description="音乐文件URL地址")
    bigCoverUrl: str = Field(..., description="大封面图片URL地址")
    smallCoverUrl: str = Field(..., description="小封面图片URL地址")
    weight: int


class MusicItem(MusicAddRequest):
    pass


class MusicResponse(BaseModel):
    code: int = 200
    msg: str
    data: MusicItem
