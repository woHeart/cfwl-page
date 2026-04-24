from pydantic import BaseModel


class BannerItem(BaseModel):
    url: str


class BannerResponse(BaseModel):
    code: int = 200
    msg: str
    data: list[BannerItem]
