import type { FieldItem } from "@/types/formgeneral";
import { z } from "zod";

export const RoleBaseSchema = z.object({
  name: z.string(),
  bgImg: z.string(),
  career: z.string(),
  sequence: z.coerce.number().int(),
  gramentImg: z.string(),
  initImg: z.string(),
});

export type RoleBaseData = z.infer<typeof RoleBaseSchema>;

export const roleBaseFields: {
  baseFields: FieldItem<RoleBaseData>[];
} = {
    baseFields: [
        { name: 'name', label: 'Name', placeholder: '角色名', type: 'text' },
        { name: 'bgImg', label: 'Background Image', placeholder: '星级', type: 'text' },
        { name: 'career', label: 'Career', placeholder: '属性', type: 'text' },
        { name: 'sequence', label: 'Sequence', placeholder: '序列', type: 'text' },
        { name: 'initImg', label: 'Initial Image', placeholder: '初始图片Url', type: 'text' },
        { name: 'gramentImg', label: 'Grament Image', placeholder: '衣装图片Url', type: 'text' },
    ],
};