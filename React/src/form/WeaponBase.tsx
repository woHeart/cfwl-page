import useZodForm from "@/hooks/from";
import FormSection from "@/component/formsection/FormSection";
import FormItem from "@/component/formitem/FormItem";

import { postWeaponBase } from "@/api/weapon";
import { WeaponBaseSchema, type WeaponBaseData, weaponBaseFields } from "@/types/form/weaponbase";

const WeaponBase: React.FC = () => {
    const { register, formSubmit, control } = useZodForm(WeaponBaseSchema);

    const sectionTitleMap = {
        baseFields: '基础信息',
    } as const;

    const apiSubmit = async (data: WeaponBaseData) => {
        await postWeaponBase(data);
    };

    return (
        <form onSubmit={formSubmit(apiSubmit)}>
            {Object.entries(weaponBaseFields).map(([fieldKey, fields]) => (
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

export default WeaponBase;