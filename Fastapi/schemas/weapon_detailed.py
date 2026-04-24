from pydantic import BaseModel, Field, RootModel


class BaseAttrDict(BaseModel):
    attack: str = Field(..., alias="攻击")
    hp: str = Field(..., alias="生命")
    reality: str = Field(..., alias="现实")
    spirit: str = Field(..., alias="精神")
    model_config = {"populate_by_name": True}


class UniqueAttrDict(RootModel[dict[str, str]]):
    model_config = {"from_attributes": True}


class AmplifyDictionary(BaseModel):
    level_0: str = Field(..., alias="0", description="精0效果")
    level_1: str = Field(..., alias="1", description="精1效果")
    level_2: str = Field(..., alias="2", description="精2效果")
    level_3: str = Field(..., alias="3", description="精3效果")
    level_4: str = Field(..., alias="4", description="精4效果")
    model_config = {"populate_by_name": True}


class BaseData(BaseModel):
    url: str = Field(..., description="图片地址")
    chinese: str = Field(..., description="中文名称")
    english: str = Field(..., description="英文名称")
    level: int = Field(..., description="星级/等级")


class DetailedData(BaseModel):
    tag: str
    baseDict: BaseAttrDict
    uniqueDict: UniqueAttrDict
    improveBaseDict: BaseAttrDict
    improveUniqueDict: UniqueAttrDict
    amplifyDictionary: AmplifyDictionary
    impression: str = Field(..., description="印象文案/描述")


class WeaponDetailedAddRequest(BaseModel):
    baseData: BaseData
    detailedData: DetailedData


class WeaponDetailedItem(WeaponDetailedAddRequest):
    pass


class WeaponDetailedResponse(BaseModel):
    code: int = 200
    msg: str
    data: WeaponDetailedItem
