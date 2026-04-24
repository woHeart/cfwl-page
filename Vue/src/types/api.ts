// 接口基础数据
export interface ApiResponse<T> {
  code: string
  msg: string
  data: T
}

// 角色和心相详情参数
export interface RoleParams {
  rolename: string
}
export interface WeaponParams {
  weaponname: string
}
// 壁纸参数
export interface AtlasParams {
  page: number
}

// 角色和心相图鉴
export interface RoleCard {
  name: string
  career: string
  sequence: string
  bgImg: string
  initImg: string
  gramentImg: string
}
export interface WeaponCard {
  name: string
  url: string
}

// 音乐
export interface MusicCard {
  title: string
  musicUrl: string
  bigCoverUrl: string
}

// 视频
export interface VideoCard {
  desc: string
  title: string
  videoUrl: string
  smallCoverUrl: string
  bigCoverUrl: string
}

// 壁纸
export interface AtlasCard {
  results: string[]
  isMore: boolean
}

// 角色详情信息
export interface RoleDetailed {
  baseData: RoleBase
  improveData: RoleImprove
  skillData: RoleSkill
}

export interface RoleBase {
  chinese: string
  english: string
  sign: string
  simplePosition: string
  detailedPosition: string
  initContent: string
  changeContent: string
  gramentContent: string
  initImg: string
  gramentImg: string
  infoDictionary: RoleBaseDicDDD
}

export interface RoleBaseDicDDD {
  [key: string]: string
}

export interface RoleImprove {
  firstInherit: string
  secondInherit: string
  thirdInherit: string
  firstPortrait: string
  secondPortrait: string
  thirdPortrait: string
  fourthPortrait: string
  fifthPortrait: string
}

export interface RoleSkill {
  firstSkill: SkillDetail
  secondSkill: SkillDetail
  thirdSkill: SkillDetail
  fourthSkill: SkillDetail
  fifthSkill: SkillDetail
  sixthSkill: SkillDetail
  seventhSkill: SkillDetail
  firstIncantation: [string, string]
  secondIncantation: [string, string]
  thirdIncantation: [string, string]
}

export interface SkillDetail {
  name: string
  content: string
  info: string
}

export interface OneSkill extends Array<[string, string] | SkillDetail> {
  0: [string, string]
  1: SkillDetail
  2: SkillDetail
  3: SkillDetail
}

// 心相详情信息
export interface WeaponDetail {
  baseData: BaseData
  detailedData: DetailedData
}

export interface BaseData {
  chinese: string
  english: string
  level: number
  url: string
}

export interface DetailedData {
  tag: string
  baseDict: Dict
  uniqueDict: Dict
  improveBaseDict: Dict
  improveUniqueDict: Dict
  amplifyDictionary: Dict
  impression: string
}

export interface Dict {
  [key: string]: string
}

// 登录和注册
export interface LoginResponse {
  account: string
  token: string
}
export interface EnrollResponse {
  account: string
}
