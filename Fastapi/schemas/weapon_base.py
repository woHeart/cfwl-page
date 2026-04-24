from pydantic import BaseModel, Field


class WeaponBaseAddRequest(BaseModel):
    name: str = Field(..., description="名称")
    sequence: int = Field(default=1, description="序列")
    url: str = Field(..., description="图片地址")


# 2. 单条数据模型（返回数据用）
class WeaponBaseItem(WeaponBaseAddRequest):
    pass


# 3. 统一响应模型（保持不变）
class WeaponBaseResponse(BaseModel):
    code: int = 200
    msg: str
    data: WeaponBaseItem
