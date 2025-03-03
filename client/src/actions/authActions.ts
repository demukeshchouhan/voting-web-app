"use server";

import {
  CHECK_CREDENTIALS_URL,
  LOGIN_URL,
  REGISTER_URL,
} from "@/lib/apiEndPoints";
import axios, { AxiosError } from "axios";

export async function registerAction(formState: any, formData: FormData) {
  try {
    const { data } = await axios.post(REGISTER_URL, {
      name: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirm_password: formData.get("confirmPassword"),
    });
    return {
      status: 200,
      message:
        data?.message ||
        "Account Created Successfully! Please check and verify your email.",
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 422) {
        return {
          status: 422,
          message: error.response.data.message,
          errors: error.response.data.errors,
        };
      }
    }
    return {
      status: 500,
      message: "Something went wrong",
      errors: {},
    };
  }
}

export async function loginAction(formState: any, formData: FormData) {
  try {
    const { data } = await axios.post(CHECK_CREDENTIALS_URL, {
      email: formData.get("email"),
      password: formData.get("password"),
    });
    return {
      status: 200,
      message: data?.message ?? "Logging you",
      errors: {},
      data: {
        email: formData.get("email"),
        password: formData.get("password"),
      },
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 422) {
        return {
          status: 422,
          message: error.response.data.message,
          errors: error.response.data.errors,
          data: {},
        };
      }
    }
    return {
      status: 500,
      message: "Something went wrong",
      errors: {},
      data: {},
    };
  }
}
