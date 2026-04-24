import type { FieldItem } from "@/types/formgeneral";
import { z } from "zod";
import parseStr from "@/hooks/parse";

export const WeaponDetSchema = z.object({
    baseData: z.object({
        url: z.string(),
        chinese: z.string(),
        english: z.string(),
        level: z.coerce.number().int().min(1).max(6),
    }),
    detailedData: z.object({
        tag: z.string(),
        impression: z.string(),
        baseDict: parseStr,
        uniqueDict: parseStr,
        improveBaseDict: parseStr,
        improveUniqueDict: parseStr,
        amplifyDictionary: parseStr,
    }),
});

export type WeaponDetData = z.infer<typeof WeaponDetSchema>;

export const weaponDetFields: {
    baseFields: FieldItem<WeaponDetData>[];
    dictFields: FieldItem<WeaponDetData>[];
} = {
    baseFields: [
        { name: 'baseData.chinese', label: 'Chinese', placeholder: '中文名', type: 'text' },
        { name: 'baseData.english', label: 'English', placeholder: '英文名', type: 'text' },
        { name: 'baseData.url', label: 'Url', placeholder: '图片Url', type: 'text' },
        { name: 'baseData.level', label: 'Level', placeholder: '星级', type: 'text' },
        { name: 'detailedData.tag', label: 'Tag', placeholder: '标签', type: 'text' },
        { name: 'detailedData.impression', label: 'Impression', placeholder: '印象描述', type: 'text' },
    ],
    dictFields: [
        { name: 'detailedData.baseDict', label: 'Base Dict', placeholder: '基础词条', type: 'textarea' },
        { name: 'detailedData.uniqueDict', label: 'Unique Dict', placeholder: '专属词条', type: 'textarea' },
        { name: 'detailedData.improveBaseDict', label: 'Improve Base Dict', placeholder: '提升基础词条', type: 'textarea' },
        { name: 'detailedData.improveUniqueDict', label: 'Improve Unique Dict', placeholder: '提升专武词条', type: 'textarea' },
        { name: 'detailedData.amplifyDictionary', label: 'Amplify Dictionary', placeholder: '增幅详情', type: 'textarea' }
    ]
};
