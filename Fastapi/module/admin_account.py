from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class AdminDoc(BaseModel):
    username: str
    hashed_password: str
    is_active: bool = False
    last_login_time: Optional[datetime] = None
