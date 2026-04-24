from pydantic import BaseModel
from typing import Optional, List


class MenuItem(BaseModel):
    key: str
    label: str
    path: str
    children: Optional[List["MenuItem"]] = None  # 自引用，使用字符串形式


class MenuResponse(BaseModel):
    code: int = 200
    msg: str = "查询成功"
    data: List[MenuItem]


# 解决自引用类型提示，确保 Pydantic 正确解析 'MenuNode' 引用
MenuItem.model_rebuild()
