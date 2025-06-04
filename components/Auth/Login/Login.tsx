"use client";
import Link from "next/link";
import styles from "./styles.module.scss";
import Logo from "@/components/common/Logo/Logo";
import InputRHF from "@/components/common/InputRHF/InputRHF";
import useLogin from "@/hooks/auth/useLogin";
import OverlaySpinner from "@/components/common/Spinner/OverlaySpinner";

const Login = () => {
  const {
    register,
    control,
    handleSubmit,
    onSubmit,
    errors,
    isLoading,
    errorAuth,
  } = useLogin();

  console.log("errorAuth:", errorAuth);

  return (
    <section className={styles.login}>
      {isLoading ? <OverlaySpinner /> : null}
      <div className={styles.loginContainer}>
        <div className={styles.loginHead}>
          <Logo isResized={false} bg="#fff" />
          <h4 className={styles.loginTitle}>Sign in to your account</h4>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.authForm}>
          <div className={styles.inputs}>
            <InputRHF
              isRequired={true}
              label="Email Address"
              placeholder="Enter your email address"
              type="email"
              id="email"
              register={{ ...register("email") }}
              error={errors.email?.message}
            />

            <InputRHF
              isRequired={true}
              label="Password"
              placeholder="Enter your password"
              type="password"
              id="password"
              register={{ ...register("password") }}
              error={errors.password?.message}
            />
          </div>
          <div className={styles.fromLinks}>
            <button type="submit" className={styles.submitBtn}>
              Sign In
            </button>
          </div>
          <p className={styles.errorMsg}>{errorAuth}</p>
        </form>
      </div>
    </section>
  );
};

export default Login;
