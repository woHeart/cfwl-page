import useZodForm from "@/hooks/from";
import FormSection from "@/component/formsection/FormSection";
import FormItem from "@/component/formitem/FormItem";

import { postAtlas } from "@/api/atlas";
import { AtlasSchema, type AtlasData, atlasFields } from "@/types/form/atlas";

const Atlas: React.FC = () => {
    const { register, formSubmit, control } = useZodForm(AtlasSchema);

    const sectionTitleMap = {
        baseFields: '基础信息',
    } as const;

    const apiSubmit = async (data: AtlasData) => {
        await postAtlas(data);
    };

    return (
        <form onSubmit={formSubmit(apiSubmit)}>
            {Object.entries(atlasFields).map(([fieldKey, fields]) => (
                <FormSection
                    key={fieldKey}
                    title={sectionTitleMap[fieldKey as keyof typeof sectionTitleMap]}
                >
                    <FormItem fields={fields} register={register} control={control}/>
                </FormSection>
            ))}

            <button type="submit">提交</button>
        </form>
    );
}

export default Atlas;