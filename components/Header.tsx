"use client";
import Image from "next/image";

import styles from "./HeaderStyles.module.css";
import Link from "next/link";
import Cookies from "js-cookie";
import useSWR, { preload } from "swr";
import useUser, { profileFetcher } from "../apis/useuser";

export const Header = () => {
  let profile = (
    <Link className={styles.button} href="/login">
      Войти
    </Link>
  );

  const { user: data, error, isLoading } = useUser();

  if (error) return <div>ошибка загрузки</div>;
  if (isLoading) return <div>загрузка...</div>;

  if (data.name) {
    profile = (
      <div className={styles.container}>
        <p className={styles.name}>{data.name}</p>
        <div className={styles.image}>
          <p className={styles.imageText}>{data.name.slice(0, 1)}</p>
        </div>
      </div>
    );
  }

  return (
    <header className={styles.header}>
      <Image src="/logo.svg" alt="YoldiLogo" height={50} width={80} />
      <span className={styles.text}>
        Разрабатываем и запускаем сложные веб проекты
      </span>
      {profile}
    </header>
  );
};
