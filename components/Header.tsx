"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

import { User } from "../app/types";
import styles from "./HeaderStyles.module.css";
import Link from "next/link";
import Cookies from "js-cookie";
import useSWR, { preload } from "swr";
import useUser from "../apis/useuser";

export const Header = (props: User) => {
  // const [isEntered, setEntred] = useState<boolean>(false);
  // const { user: data, error, isLoading } = useUser();
  // console.log(data);
  // let profile = <p>sdfd</p>;
  // console.log(data);
  // console.log(Cookies.get("profile"));

  // if (error) return <div>ошибка загрузки</div>;
  // if (isLoading) return <div>загрузка...</div>;

  // if (Cookies.get("profile")) {
  //   profile = <p>sdfd</p>;
  // } else {
  //   profile = (
  //     <Link className={styles.button} href="/login">
  //       Войти
  //     </Link>
  //   );
  // }

  return (
    <header className={styles.header}>
      <Image src="/logo.svg" alt="YoldiLogo" height={50} width={80} />
      <span className={styles.text}>
        Разрабатываем и запускаем сложные веб проекты
      </span>
      <Link className={styles.button} href="/login">
        Войти
      </Link>
    </header>
  );
};
