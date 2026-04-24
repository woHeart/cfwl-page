import useZodForm from "@/hooks/from";
import FormSection from "@/component/formsection/FormSection";
import FormItem from "@/component/formitem/FormItem";

import { postRoleDet } from "@/api/role";
import { RoleDetSchema, type RoleDetData, roleDetFields } from "@/types/form/roledetail";

const RoleDet: React.FC = () => {
    const { register, formSubmit, control } = useZodForm(RoleDetSchema);
    
    const sectionTitleMap = {
        baseFields: '基础信息',
        inheritFields: '洞悉信息',
        portraitFields: '塑造信息',
        firstSkillFields: '1th Brief',
        secondSkillFields: '2th Brief',
        thirdSkillFields: '3th Brief',
        firstDetFields: '1th Detail',
        secondDetFields: '2th Detail',
        thirdDetFields: '3th Detail',
        fourthDetFields: '4th Detail',
        fifthDetFields: '5th Detail',
        sixthDetFields: '6th Detail',
        seventhDetFields: '7th Detail',
    } as const;

    const apiSubmit = async (data: RoleDetData) => {
        await postRoleDet(data);
    };

    return (
        <form onSubmit={formSubmit(apiSubmit)}>
            {Object.entries(roleDetFields).map(([fieldKey, fields]) => (
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

export default RoleDet;