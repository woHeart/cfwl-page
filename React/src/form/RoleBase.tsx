import useZodForm from "@/hooks/from";
import FormSection from "@/component/formsection/FormSection";
import FormItem from "@/component/formitem/FormItem";

import { postRoleBase } from "@/api/role";
import { RoleBaseSchema, type RoleBaseData, roleBaseFields } from "@/types/form/rolebase";

const RoleBase: React.FC = () => {
    const { register, formSubmit, control } = useZodForm(RoleBaseSchema);

    const sectionTitleMap = {
        baseFields: '基础信息',
    } as const;

    const apiSubmit = async (data: RoleBaseData) => {
        await postRoleBase(data);
    };

    return (
        <form onSubmit={formSubmit(apiSubmit)}>
            {Object.entries(roleBaseFields).map(([fieldKey, fields]) => (
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

export default RoleBase;