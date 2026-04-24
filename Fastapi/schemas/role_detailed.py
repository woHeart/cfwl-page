from pydantic import BaseModel, Field
from typing import List


# 基础数据
class BaseDataModel(BaseModel):
    sign: str = Field(..., alias="sign", description="角色签名图片地址")
    changeContent: str = Field(..., alias="changeContent", description="衣装名称")
    chinese: str = Field(..., alias="chinese", description="中文名称")
    detailedPosition: str = Field(..., alias="detailedPosition", description="详细定位")
    english: str = Field(..., alias="english", description="英文名称")
    gramentContent: str = Field(..., alias="gramentContent", description="衣装文案")
    gramentImg: str = Field(..., alias="gramentImg", description="衣装图片地址")
    infoDictionary: dict = Field(..., alias="infoDictionary", description="信息词典")
    initContent: str = Field(..., alias="initContent", description="初始文案")
    initImg: str = Field(..., alias="initImg", description="初始图片地址")
    simplePosition: str = Field(..., alias="simplePosition", description="简单定位")


# 提升数据（按顺序排列）
class ImproveDataModel(BaseModel):
    firstInherit: str = Field(..., alias="firstInherit", description="第一继承效果")
    secondInherit: str = Field(..., alias="secondInherit", description="第二继承效果")
    thirdInherit: str = Field(..., alias="thirdInherit", description="第三继承效果")
    firstPortrait: str = Field(..., alias="firstPortrait", description="第一肖像效果")
    secondPortrait: str = Field(..., alias="secondPortrait", description="第二肖像效果")
    thirdPortrait: str = Field(..., alias="thirdPortrait", description="第三肖像效果")
    fourthPortrait: str = Field(..., alias="fourthPortrait", description="第四肖像效果")
    fifthPortrait: str = Field(..., alias="fifthPortrait", description="第五肖像效果")


# 技能项（不包含吟唱图，因为吟唱图单独存放）
class SkillItem(BaseModel):
    name: str = Field(..., description="技能名称")
    content: str = Field(..., description="技能描述")
    info: str = Field(..., description="技能效果")


# 技能数据（按顺序排列）
class SkillDataModel(BaseModel):
    firstIncantation: List[str] = Field(
        ..., alias="firstIncantation", description="第一技能吟唱图片及类型"
    )
    secondIncantation: List[str] = Field(
        ..., alias="secondIncantation", description="第二技能吟唱图片及类型"
    )
    thirdIncantation: List[str] = Field(
        ..., alias="thirdIncantation", description="第三技能吟唱图片及类型"
    )
    firstSkill: SkillItem = Field(..., alias="firstSkill", description="第一技能")
    secondSkill: SkillItem = Field(..., alias="secondSkill", description="第二技能")
    thirdSkill: SkillItem = Field(..., alias="thirdSkill", description="第三技能")
    fourthSkill: SkillItem = Field(..., alias="fourthSkill", description="第四技能")
    fifthSkill: SkillItem = Field(..., alias="fifthSkill", description="第五技能")
    sixthSkill: SkillItem = Field(..., alias="sixthSkill", description="第六技能")
    seventhSkill: SkillItem = Field(..., alias="seventhSkill", description="第七技能")


# 角色完整数据
class RoleDetailedAddRequest(BaseModel):
    baseData: BaseDataModel = Field(..., alias="baseData", description="基础数据")
    improveData: ImproveDataModel = Field(
        ..., alias="improveData", description="提升数据"
    )
    skillData: SkillDataModel = Field(..., alias="skillData", description="技能数据")


class RoleDetailedItem(RoleDetailedAddRequest):
    pass


class RoleDetailedRResponse(BaseModel):
    code: int = 200
    msg: str
    data: RoleDetailedItem
