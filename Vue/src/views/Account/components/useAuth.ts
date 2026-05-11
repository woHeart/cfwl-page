import { accountLogin } from "@/apis/accout";
import { LoginFormData } from "@/types";
import { setToken } from "@/utils/auth";
import { ElMessage, FormInstance } from "element-plus";
import { reactive } from "vue";
import { useRouter } from "vue-router";

export function useAuth() {
  const router = useRouter();

  const formData: LoginFormData = reactive({
    account: '',
    password: ''
  });

  const loginVerify = async (ref: FormInstance | null): Promise<void> => {
    try {
      await ref?.validate();
      const data = await accountLogin(formData);
      ElMessage.success('登录成功');
      setToken(data.token, 3600);
      router.push("/");
    } catch {
      console.error("登录失败");
    }
  };

  return {
    router,
    formData,
    loginVerify
  };
}
