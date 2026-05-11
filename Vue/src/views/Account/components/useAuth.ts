import { accountLogin } from "@/apis/accout";
import { LoginFormData } from "@/types";
import { setToken } from "@/utils/auth";
import { ElMessage, FormInstance } from "element-plus";
import { reactive } from "vue";
import { useRouter } from "vue-router";

export const router = useRouter()

export const formData: LoginFormData = reactive({
  account: '',
  password: ''
})

export const loginVerify = async (ref: FormInstance | null): Promise<void> => {
  try {
    await ref?.validate();
    const data = await accountLogin(formData)
    ElMessage.success('登录成功')
    setToken(data.token, 3600)
    router.push("/")
  } catch {
    console.error("登录失败")
  }
}
