"use client";

import React from "react";
import styles from "./AccountGuestStyles.module.css";
import Image from "next/image";
import useSWR from "swr";
import { userFetcher } from "../../../apis/useuser";

function AccountGuestPage(params: any) {
  const { data, error, isLoading } = useSWR(
    `https://frontend-test-api.yoldi.agency/api/user/${params.params.slug}`,
    userFetcher
  );

  if (error) return <div>ошибка загрузки</div>;
  if (isLoading) return <div>загрузка...</div>;

  return (
    <div className={styles.accountPage}>
      <div className={styles.wallpaperContainer}>
        {data.image ? (
          <Image
            alt="not found"
            width={0}
            height={0}
            className={styles.wallpaperContainer}
            src={URL.createObjectURL(data.image)}
          />
        ) : (
          <div className={styles.wallpaperContainer}></div>
        )}
      </div>
      <div className={styles.main}>
        {data.image ? (
          <Image
            src={data.image}
            className={styles.image}
            alt={"sdf"}
            width={50}
            height={50}
          />
        ) : (
          <div className={styles.image}>
            <p className={styles.imageText}>
              {data.name.slice(0, 1).toUpperCase()}
            </p>
          </div>
        )}

        <div className={styles.headerContainer}>
          <div className={styles.infoContainer}>
            <span className={styles.name}>{data.name}</span>
            <span className={styles.email}>{data.email}</span>
          </div>
        </div>
        <p className={styles.description}>
          Рыбатекст используется дизайнерами, проектировщиками и фронтендерами
          когда нужно быстро заполнить макеты или прототипы содержимым. Это
          тестовый контент, который не должен нести никакого смысла, лишь
          показать наличие самого текста или продемонстрировать типографику в
          деле
        </p>
      </div>
    </div>
  );
}

export default AccountGuestPage;
