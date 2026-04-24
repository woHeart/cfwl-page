import type { FieldItem } from "@/types/formgeneral";
import { z } from "zod";
import parseStr from "@/hooks/parse";

export const RoleDetSchema = z.object({
  baseData: z.object({
    chinese: z.string(),
    english: z.string(),
    simplePosition: z.string(),
    detailedPosition: z.string(),
    sign: z.string(),
    initContent: z.string(),
    initImg: z.string(),
    gramentContent: z.string(),
    gramentImg: z.string(),
    changeContent: z.string(),
    infoDictionary: parseStr,
  }),
  improveData: z.object({
    firstInherit: z.string(),
    secondInherit: z.string(),
    thirdInherit: z.string(),
    firstPortrait: z.string(),
    secondPortrait: z.string(),
    thirdPortrait: z.string(),
    fourthPortrait: z.string(),
    fifthPortrait: z.string(),
  }),
  skillData: z.object({
    firstIncantation: z.tuple([z.string(), z.string()]),
    secondIncantation: z.tuple([z.string(), z.string()]),
    thirdIncantation: z.tuple([z.string(), z.string()]),
    firstSkill: z.object({ name: z.string(), content: z.string(), info: z.string() }),
    secondSkill: z.object({ name: z.string(), content: z.string(), info: z.string() }),
    thirdSkill: z.object({ name: z.string(), content: z.string(), info: z.string() }),
    fourthSkill: z.object({ name: z.string(), content: z.string(), info: z.string() }),
    fifthSkill: z.object({ name: z.string(), content: z.string(), info: z.string() }),
    sixthSkill: z.object({ name: z.string(), content: z.string(), info: z.string() }),
    seventhSkill: z.object({ name: z.string(), content: z.string(), info: z.string() }),
  }),
});

export type RoleDetData = z.infer<typeof RoleDetSchema>;

export const roleDetFields: {
  baseFields: FieldItem<RoleDetData>[];
  inheritFields: FieldItem<RoleDetData>[];
  portraitFields: FieldItem<RoleDetData>[];
  firstSkillFields: FieldItem<RoleDetData>[];
  secondSkillFields: FieldItem<RoleDetData>[];
  thirdSkillFields: FieldItem<RoleDetData>[];
  firstDetFields: FieldItem<RoleDetData>[];
  secondDetFields: FieldItem<RoleDetData>[];
  thirdDetFields: FieldItem<RoleDetData>[];
  fourthDetFields: FieldItem<RoleDetData>[];
  fifthDetFields: FieldItem<RoleDetData>[];
  sixthDetFields: FieldItem<RoleDetData>[];
  seventhDetFields: FieldItem<RoleDetData>[];
} = {
  baseFields: [
    { name: 'baseData.chinese', label: 'Chinese', placeholder: '中文名', type: 'text' },
    { name: 'baseData.english', label: 'English', placeholder: '英文名', type: 'text' },
    { name: 'baseData.sign', label: 'Sign', placeholder: '签名图片Url', type: 'text' },
    { name: 'baseData.changeContent', label: 'Change Content', placeholder: '服装名', type: 'text' },
    { name: 'baseData.simplePosition', label: 'Simple Position', placeholder: '如：现实创伤', type: 'text' },
    { name: 'baseData.detailedPosition', label: 'Detailed Position', placeholder: '如：输出 辅助 控制', type: 'text' },
    { name: 'baseData.initContent', label: 'Init Content', placeholder: '初始内容', type: 'text' },
    { name: 'baseData.initImg', label: 'Init Image', placeholder: '初始图片Url', type: 'text' },
    { name: 'baseData.gramentContent', label: 'Grament Content', placeholder: '格言内容', type: 'text' },
    { name: 'baseData.gramentImg', label: 'Grament Image', placeholder: '格言图片Url', type: 'text' },
    { name: 'baseData.infoDictionary', label: 'Info Dictionary', placeholder: '信息字典', type: 'textarea' },
  ],
  inheritFields: [
    { name: 'improveData.firstInherit', label: 'First Inherit', placeholder: '洞悉一', type: 'text' },
    { name: 'improveData.secondInherit', label: 'Second Inherit', placeholder: '洞悉二', type: 'text' },
    { name: 'improveData.thirdInherit', label: 'Third Inherit', placeholder: '洞悉三', type: 'text' },
  ],
  portraitFields: [
    { name: 'improveData.firstPortrait', label: 'First Portrait', placeholder: '一塑', type: 'text' },
    { name: 'improveData.secondPortrait', label: 'Second Portrait', placeholder: '二塑', type: 'text' },
    { name: 'improveData.thirdPortrait', label: 'Third Portrait', placeholder: '三塑', type: 'text' },
    { name: 'improveData.fourthPortrait', label: 'Fourth Portrait', placeholder: '四塑', type: 'text' },
    { name: 'improveData.fifthPortrait', label: 'Fifth Portrait', placeholder: '五塑', type: 'text' },
  ],
  firstSkillFields: [
    { name: 'skillData.firstIncantation.0', label: 'First Incantation Img', placeholder: 'url', type: 'text' },
    { name: 'skillData.firstIncantation.1', label: 'First Incantation Type', placeholder: 'type', type: 'text' },
  ],
  secondSkillFields: [
    { name: 'skillData.secondIncantation.0', label: 'Second Incantation Img', placeholder: 'url', type: 'text' },
    { name: 'skillData.secondIncantation.1', label: 'Second Incantation Type', placeholder: 'type', type: 'text' },
  ],
  thirdSkillFields: [
    { name: 'skillData.thirdIncantation.0', label: 'Third Incantation Img', placeholder: 'url', type: 'text' },
    { name: 'skillData.thirdIncantation.1', label: 'Third Incantation Type', placeholder: 'type', type: 'text' },
  ],
  firstDetFields: [
    { name: 'skillData.firstSkill.name', label: 'First Skill Name', placeholder: 'name', type: 'text' },
    { name: 'skillData.firstSkill.content', label: 'First Skill Content', placeholder: 'content', type: 'text' },
    { name: 'skillData.firstSkill.info', label: 'First Skill Info', placeholder: 'info', type: 'text' },
  ],
  secondDetFields: [
    { name: 'skillData.secondSkill.name', label: 'Second Skill Name', placeholder: 'name', type: 'text' },
    { name: 'skillData.secondSkill.content', label: 'Second Skill Content', placeholder: 'content', type: 'text' },
    { name: 'skillData.secondSkill.info', label: 'Second Skill Info', placeholder: 'info', type: 'text' },
  ],
  thirdDetFields: [
    { name: 'skillData.thirdSkill.name', label: 'Third Skill Name', placeholder: 'name', type: 'text' },
    { name: 'skillData.thirdSkill.content', label: 'Third Skill Content', placeholder: 'content', type: 'text' },
    { name: 'skillData.thirdSkill.info', label: 'Third Skill Info', placeholder: 'info', type: 'text' },
  ],
  fourthDetFields: [
    { name: 'skillData.fourthSkill.name', label: 'Fourth Skill Name', placeholder: 'name', type: 'text' },
    { name: 'skillData.fourthSkill.content', label: 'Fourth Skill Content', placeholder: 'content', type: 'text' },
    { name: 'skillData.fourthSkill.info', label: 'Fourth Skill Info', placeholder: 'info', type: 'text' },
  ],
  fifthDetFields: [
    { name: 'skillData.fifthSkill.name', label: 'Fifth Skill Name', placeholder: 'name', type: 'text' },
    { name: 'skillData.fifthSkill.content', label: 'Fifth Skill Content', placeholder: 'content', type: 'text' },
    { name: 'skillData.fifthSkill.info', label: 'Fifth Skill Info', placeholder: 'info', type: 'text' },
  ],
  sixthDetFields: [
    { name: 'skillData.sixthSkill.name', label: 'Sixth Skill Name', placeholder: 'name', type: 'text' },
    { name: 'skillData.sixthSkill.content', label: 'Sixth Skill Content', placeholder: 'content', type: 'text' },
    { name: 'skillData.sixthSkill.info', label: 'Sixth Skill Info', placeholder: 'info', type: 'text' },
  ],
  seventhDetFields: [
    { name: 'skillData.seventhSkill.name', label: 'Seventh Skill Name', placeholder: 'name', type: 'text' },
    { name: 'skillData.seventhSkill.content', label: 'Seventh Skill Content', placeholder: 'content', type: 'text' },
    { name: 'skillData.seventhSkill.info', label: 'Seventh Skill Info', placeholder: 'info', type: 'text' },
  ]
}