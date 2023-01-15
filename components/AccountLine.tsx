"use client";

import Image from "next/image";
import styles from "./AccountLineStyles.module.css";
import Link from "next/link";

const AccountLine = ({ acc }: any) => {
  const { image, name, email, slug } = acc || {};

  return (
    <Link href={`/accountsList/${slug}`} className={styles.link}>
      <div className={styles.accountline}>
        {image ? (
          <Image
            src={image}
            className={styles.image}
            alt={name.slice()}
            width={50}
            height={50}
          />
        ) : (
          <div className={styles.image}>
            <p className={styles.imageText}>{name.slice(0, 1).toUpperCase()}</p>
          </div>
        )}
        {image && (
          <Image
            src={image}
            alt="avatar"
            className={styles.image}
            width={20}
            height={20}
          />
        )}
        <div className={styles.rightContainer}>
          <span>{name}</span>

          <span className={styles.email}>{email}</span>
        </div>
      </div>
    </Link>
  );
};

export default AccountLine;
