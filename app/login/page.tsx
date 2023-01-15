"use client";
import styles from "./styles.module.css";
import Image from "next/image";
import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";

import useSWRMutation from "swr/mutation";
import { sendRequest } from "../../apis/useuser";
import { Status } from "../types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const router = useRouter();

  const { trigger } = useSWRMutation(
    "https://frontend-test-api.yoldi.agency/api/auth/login",
    sendRequest
  );

  const onEmailChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setEmail(e.target.value);
    },
    []
  );

  const onPasswordChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setPassword(e.target.value);
    },
    []
  );

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const key = await trigger({
        email: email,
        password: password,
      });
      Cookies.set("profile", key.value);
      Cookies.set("password", password);

      if (key.value) {
        router.push("./account");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const submitButtonColor = () => {
    return email !== "" && password !== ""
      ? styles.buttonSubmit
      : styles.button;
  };

  const passwordToggle = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className={styles.loginPage}>
      <form className={styles.loginForm} onSubmit={submitForm}>
        <p className={styles.title}>Вход в Yoldi Agency</p>

        <div className={styles.inputContainer}>
          <Image src="/mail.svg" alt="mail" height={30} width={30}></Image>
          <input
            className={styles.input}
            placeholder="E-mail"
            type="email"
            value={email}
            onChange={onEmailChange}
          ></input>
        </div>

        <div className={styles.inputContainer}>
          <Image src="/lock.svg" alt="password" height={30} width={30}></Image>
          <input
            className={styles.input}
            placeholder="Пароль"
            type={passwordShown ? "text" : "password"}
            value={password}
            onChange={onPasswordChange}
          ></input>
          {passwordShown ? (
            <Image
              onClick={passwordToggle}
              src="/greyEye.svg"
              alt="hide/show password"
              height={30}
              width={30}
            ></Image>
          ) : (
            <Image
              onClick={passwordToggle}
              src="/blackEye.svg"
              alt="hide/show password"
              height={30}
              width={30}
            ></Image>
          )}
        </div>

        <button className={submitButtonColor()} type="submit">
          Войти
        </button>
      </form>
      <footer className={styles.footer}>
        <span>Еще нет аккаунта?</span>
        <Link className={styles.footerButton} href="/">
          Зарегистрироваться
        </Link>
      </footer>
    </div>
  );
};
export default Login;
