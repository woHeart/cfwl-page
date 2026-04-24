import type { FieldItem } from "@/types/formgeneral";
import { z } from "zod";

export const AtlasSchema = z.object({
    url: z.string(),
});

export type AtlasData = z.infer<typeof AtlasSchema>;

export const atlasFields: {
  baseFields: FieldItem<AtlasData>[];
} = {
    baseFields: [
        { name: 'url', label: 'Url', placeholder: '图集Url', type: 'text' },
    ],
};