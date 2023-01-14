"use client";
import { ChangeEvent, useCallback, useState } from "react";
import styles from "./ModalWindowStyles.module.css";
import useSWRMutation from "swr/mutation";
import { patchRequest } from "../apis/useuser";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function ModalWindow({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const password = Cookies.get("password");
  const router = useRouter();
  const { trigger } = useSWRMutation(
    "https://frontend-test-api.yoldi.agency/api/profile",
    patchRequest
  );
  const saveData = async () => {
    setIsOpen(false);
    console.log(slug);
    await trigger({
      name: name,
      password: password,
      slug: slug,
    });
    window.localStorage.setItem("description", description);
    router.refresh();
  };

  const cancelAction = () => {
    setIsOpen(true);
  };

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");

  const onNameChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setName(e.target.value);
    },
    []
  );

  const onSlugChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSlug(e.target.value);
    },
    []
  );
  const onDescriptionChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setDescription(e.target.value);
    },
    []
  );

  return (
    <div className={styles.backgroundModal}>
      <div className={styles.modal}>
        <p className={styles.header}>Редактировать профиль</p>
        <label className={styles.label}>Имя</label>
        <input onChange={onNameChange} className={styles.input} value={name} />
        <label className={styles.label}>Адрес Профиля</label>
        <div className={styles.exampleContainer}>
          <p className={styles.example}>example.com/</p>
          <input
            onChange={onSlugChange}
            className={styles.inputExample}
            value={slug}
          />
        </div>
        <label className={styles.label}>Описание</label>
        <textarea
          onChange={onDescriptionChange}
          rows={5}
          className={styles.text}
          value={description}
        />
        <div className={styles.buttonContainer}>
          <button className={styles.canceled} onClick={cancelAction}>
            Отмена
          </button>
          <button className={styles.save} onClick={saveData}>
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}
