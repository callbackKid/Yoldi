"use client";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Status } from "./types";
import { sendRequest } from "../apis/useuser";
import useSWRMutation from "swr/mutation";
import Cookies from "js-cookie";

function Register() {
  const [status, setStatus] = useState<Status>("Guest");
  const [passwordShown, setPasswordShown] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const { trigger } = useSWRMutation(
    "https://frontend-test-api.yoldi.agency/api/auth/sign-up",
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
  const onNameChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setName(e.target.value);
    },
    []
  );

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const key = await trigger({
        name: name,
        email: email,
        password: password,
      });
      console.log(key);
      Cookies.set("profile", key.value);

      setStatus("User");
      if (key.value) {
        router.push("./account");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const submitButtonColor = () => {
    return email !== "" && password !== "" && name !== ""
      ? styles.buttonSubmit
      : styles.button;
  };

  const passwordToggle = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div>
      <form className={styles.registerForm} onSubmit={submitForm}>
        <p className={styles.title}>Регистрация в Yoldi Agency</p>

        <div className={styles.inputContainer}>
          <Image src="/figure.svg" alt="name" height={30} width={30}></Image>
          <input
            className={styles.input}
            placeholder="Имя"
            value={name}
            type="name"
            onChange={onNameChange}
          ></input>
        </div>

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

        <button className={submitButtonColor()}>Создать аккаунт</button>
      </form>
      <footer className={styles.footer}>
        <span>Уже есть аккаунт?</span>
        <Link className={styles.footerButton} href="/login">
          Войти
        </Link>
      </footer>
    </div>
  );
}
export default Register;
