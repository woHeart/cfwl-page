import { accountEnroll, accountLogin } from "@/apis/accout";
import { EnrollFormData, LoginFormData } from "@/types";
import { setToken } from "@/utils/auth";
import { ElMessage, FormInstance } from "element-plus";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

export function useLogin() {

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
      console.log("登录失败");
    }
  };

  return {
    formData,
    loginVerify
  };
}

export function useEnroll(
  enrollSuccess: () => void
) {

  const checkAgree = ref<boolean>(false)

  const formData: EnrollFormData = reactive({
    account: '',
    password: '',
    confirmPassword: ''
  })

  const enrollVerify = async (ref: FormInstance | null): Promise<void> => {
    if (!checkAgree.value) {
      ElMessage.warning('您未同意用户协议');
      return
    }
    try {
      await ref?.validate();
      await accountEnroll(formData);
      ElMessage.success('注册成功');
      enrollSuccess();
    } catch {
      console.log("注册失败")
    }
  }

  return {
    checkAgree,
    formData,
    enrollVerify
  }
}
