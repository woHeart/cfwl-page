from pydantic import BaseModel, Field


class VideoAddRequest(BaseModel):
    id: int
    gameId: int
    envType: int
    title: str = Field(..., description="视频标题")
    desc: str = Field(..., description="视频描述")
    collectionId: int = Field(..., description="合集ID")
    status: int = Field(..., description="状态")
    onlineTime: str = Field(..., description="上线时间")
    offlineTime: str = Field(..., description="下线时间")
    videoUrl: str = Field(..., description="视频播放地址")
    bigCoverUrl: str = Field(..., description="大图封面")
    smallCoverUrl: str = Field(..., description="小图封面")
    mobileThumbnailUrl: str = Field(..., description="移动端缩略图")
    weight: int


class VideoItem(VideoAddRequest):
    pass


class VideoResponse(BaseModel):
    code: int = 200
    msg: str
    data: VideoItem
