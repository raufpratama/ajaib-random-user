import { SelectProps } from "antd"

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export const STORAGE_KEYS = {
  user_credential: "user_credential",
  token: "randomme_token",
}

export const API_URL = "https://randomuser.me/api/"

export const GENDER_OPTIONS: SelectProps["options"] = [
  {
    label:"Male",
    value: "male"
  },
  {
    label: "Female",
    value: "female"
  }
]