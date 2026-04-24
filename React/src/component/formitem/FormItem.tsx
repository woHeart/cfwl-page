import type { FormItemProps } from "@/types/formgeneral";
import styles from "./FormItem.module.css";
import { Controller, type FieldValues } from 'react-hook-form';
import JsonTextarea from "@/component/textarea/Textarea";

function FormItem<T extends FieldValues>({ fields, register, control }: FormItemProps<T>) {

    return (
        <>
            {fields.map((field) => {
                const { name, label, type, placeholder } = field;

                return (
                    <div className={styles.formItemConfig} key={name}>
                        <label className={styles.formItemLabel}>{label}</label>
                        {type === 'textarea' ? (
                            <Controller
                                name={name}
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <JsonTextarea
                                        value={value}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        placeholder={placeholder}
                                    />
                                )}
                            />
                        ) : (
                            <input
                                {...register(name)}
                                type={type}
                                placeholder={placeholder}
                            />
                        )}
                    </div>
                );
            })}
        </>
    );
}

export default FormItem;