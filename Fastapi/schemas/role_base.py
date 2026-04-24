from pydantic import BaseModel, Field


class RoleBaseAddRequest(BaseModel):
    name: str = Field(..., description="角色名称")
    bgImg: str = Field(..., description="背景图片标识")
    career: str = Field(..., description="职业")
    sequence: int = Field(default=1, description="序列")
    gramentImg: str = Field(..., description="服装图片地址")
    initImg: str = Field(..., description="初始形象图片地址")


class RoleBaseItem(RoleBaseAddRequest):
    pass


class RoleBaseResponse(BaseModel):
    code: int = 200
    msg: str
    data: RoleBaseItem
