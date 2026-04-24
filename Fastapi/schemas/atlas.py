from pydantic import BaseModel, Field


class AtlasAddRequest(BaseModel):
    url: str = Field(..., description="图片URL地址")


class AtlasItem(AtlasAddRequest):
    pass


class AtlasResponse(BaseModel):
    code: int = 200
    msg: str
    data: AtlasItem
