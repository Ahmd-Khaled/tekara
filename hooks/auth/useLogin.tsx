"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import * as Yup from "yup";

interface LoginFormInputs {
  email: string;
  password: string;
}

interface LoginResponse {
  status: boolean;
  message?: string;
  data?: {
    token: string;
    [key: string]: any; // if more user data is returned
  };
}

const useLogin = () => {
  const locale = "en";
  const router = useRouter();
  const pathname = usePathname(); // currently unused
  const [responseFromApi, setResponseFromApi] = useState<LoginResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [errorAuth, setErrorAuth] = useState("");

  const schema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email address is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .max(32, "Password must be at most 32 characters long")
      .required("Password is required"),
  });

  const form = useForm<LoginFormInputs>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setIsLoading(true); // Start loader
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result: LoginResponse = await response.json();
      setResponseFromApi(result);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false); // Stop loader
    }
  };

  useEffect(() => {
    console.log("Response from API:", responseFromApi);
    if (responseFromApi?.status) {
      if (responseFromApi.message) {
        console.log("Notify:", responseFromApi.message); // notify(responseFromApi.message, "success");
      }
      setTimeout(() => {
        router.push("/dashboard");
      }, 500);
      if (responseFromApi.data) {
        // Cookies.set("token", responseFromApi.data.token);
        // Cookies.set("userData", JSON.stringify(responseFromApi.data));
      }
    } else {
      if (responseFromApi?.message) {
        setErrorAuth(responseFromApi.message);
      }
    }
  }, [responseFromApi, router]);

  return {
    register,
    control,
    handleSubmit,
    onSubmit,
    errors,
    isLoading,
    errorAuth,
  };
};

export default useLogin;
