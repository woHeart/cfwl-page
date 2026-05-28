import { FormInstance } from "element-plus"
import { LoginFormData } from "./component"

export interface LoginComponentInstance {
  formData: LoginFormData
  $refs: {
    loginFormRef: FormInstance
  }
}

export interface ValidateError {
  [field: string]: Error[]
}

