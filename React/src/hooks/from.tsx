import { useForm, type FieldValues, type UseFormProps } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { message } from "antd";
import type { ZodType } from "zod";

export default function useZodForm<T extends FieldValues>(
  schema: ZodType<T>,
  defaultValues?: UseFormProps<T>["defaultValues"]
) {

  const { handleSubmit, register, control } = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues
  });

  const formSubmit = (callBack: (data: T) => void | Promise<void>) => {
    return handleSubmit(
      async (data) => {
        try {
          await callBack(data);
        } catch (error) {
          message.error('提交失败，请重试');
          console.error('submit error:', error);
          console.log('submitted data with errors:', data);
        }
      },
      (formErrors, data) => {
        message.error('表单验证失败，请检查输入');
        console.error('validation errors:', formErrors);
        console.log('submitted data with errors:', data);
      }
    );
  };

  return {
    formSubmit,
    register,
    control,
  }
}