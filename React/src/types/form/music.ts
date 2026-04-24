import type { FieldItem } from "@/types/formgeneral";
import { z } from "zod";

export const MusicSchema = z.object({
    id: z.coerce.number().int(),
    gameId: z.coerce.number().int(),
    envType: z.coerce.number().int(),
    title: z.string(),
    shortTitle: z.string(),
    desc: z.string(),
    collectionId: z.coerce.number().int(),
    status: z.coerce.number().int(),
    onlineTime: z.string(),
    offlineTime: z.string(),
    musicUrl: z.string(),
    bigCoverUrl: z.string(),
    smallCoverUrl: z.string(),
    weight: z.coerce.number().int(),
});

export type MusicData = z.infer<typeof MusicSchema>;

export const musicFields: {
  baseFields: FieldItem<MusicData>[];
} = {
    baseFields: [
        { name: 'id', label: 'ID', placeholder: '音乐ID', type: 'text' },
        { name: 'gameId', label: 'Game ID', placeholder: '游戏ID', type: 'text' },
        { name: 'envType', label: 'Environment Type', placeholder: '环境类型', type: 'text' },
        { name: 'title', label: 'Title', placeholder: '标题', type: 'text' },
        { name: 'shortTitle', label: 'Short Title', placeholder: '短标题', type: 'text' },
        { name: 'desc', label: 'Description', placeholder: '描述', type: 'text' },
        { name: 'collectionId', label: 'Collection ID', placeholder: '合集ID', type: 'text' },
        { name: 'status', label: 'Status', placeholder: '状态', type: 'text' },
        { name: 'onlineTime', label: 'Online Time', placeholder: '上线时间', type: 'text' },
        { name: 'offlineTime', label: 'Offline Time', placeholder: '下线时间', type: 'text' },
        { name: 'musicUrl', label: 'Music Url', placeholder: '音乐Url', type: 'text' },
        { name: 'bigCoverUrl', label: 'Big Cover Url', placeholder: '大封面Url', type: 'text' },
        { name: 'smallCoverUrl', label: 'Small Cover Url', placeholder: '小封面Url', type: 'text' },
        { name: 'weight', label: 'Weight', placeholder: '权重', type: 'text' },
    ],
};