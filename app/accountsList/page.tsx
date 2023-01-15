"use client";
import styles from "./AccountListStyles.module.css";
import useSWR from "swr";
import { fetcher } from "../../apis/useuser";
import AccountLine from "../../components/AccountLine";
import { useState } from "react";
const AccountsList = () => {
  const { data, error, isLoading } = useSWR(
    `https://frontend-test-api.yoldi.agency/api/user`,
    fetcher
  );
  const [styleWallpaper, setStyleWallpaper] = useState({ display: "none" });
  if (error) return <div>ошибка загрузки</div>;
  if (isLoading) return <div>загрузка...</div>;

  return (
    <div className={styles.accountPage}>
      <p className={styles.headerAcc}>Список аккаунтов</p>

      <div className={styles.accountsContainer}>
        {data.map((el: any) => {
          return (
            <AccountLine
              acc={el}
              name={el.name}
              email={el.email}
              key={el.slug}
              image={el.image}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AccountsList;
