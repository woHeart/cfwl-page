import type { FieldItem } from "@/types/formgeneral";
import { z } from "zod";

export const WeaponBaseSchema = z.object({
    name: z.string(),
    sequence: z.coerce.number().int(),
    url: z.string(),
});

export type WeaponBaseData = z.infer<typeof WeaponBaseSchema>;

export const weaponBaseFields: {
    baseFields: FieldItem<WeaponBaseData>[];
} = {
    baseFields: [
        { name: 'name', label: 'Name', placeholder: '角色名', type: 'text' },
        { name: 'sequence', label: 'Sequence', placeholder: '序列', type: 'text' },
        { name: 'url', label: 'Image URL', placeholder: '图片Url', type: 'text' },
    ],
};