import useZodForm from "@/hooks/from";
import FormSection from "@/component/formsection/FormSection";
import FormItem from "@/component/formitem/FormItem";

import { postWeaponDet } from "@/api/weapon";
import { WeaponDetSchema, type WeaponDetData, weaponDetFields } from "@/types/form/weapondetail";

const WeaponDet: React.FC = () => {
    const { register, formSubmit, control } = useZodForm(WeaponDetSchema);
    
    const sectionTitleMap = {
        baseFields: '基础信息',
        dictFields: '字典信息',
    } as const;

    const apiSubmit = async (data: WeaponDetData) => {
        await postWeaponDet(data);
    };

    return (
        <form onSubmit={formSubmit(apiSubmit)}>
            {Object.entries(weaponDetFields).map(([fieldKey, fields]) => (
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

export default WeaponDet;