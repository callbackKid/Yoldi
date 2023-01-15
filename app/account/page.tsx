"use client";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./AccountPageStyles.module.css";
import Image from "next/image";
import Cookies from "js-cookie";
import useSWR, { preload } from "swr";
import ModalWindow from "../../components/ModalWindow";
import useUser, {
  imageGetRequest,
  imagePostRequest,
  profileFetcher,
} from "../../apis/useuser";
import useSWRMutation from "swr/mutation";

function AccountPage() {
  const router = useRouter();
  const [styleWallpaper, setStyleWallpaper] = useState({ display: "none" });
  const [styleAvatar, setStyleAvatar] = useState({ display: "none" });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [fill, setFill] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAvatarImage, setSelectedAvatarImage] = useState<File | null>(
    null
  );
  const { user: data, error, mutate, isLoading } = useUser();

  const id = Cookies.get("imageId");
  const { data: image } = useSWR(
    `https://frontend-test-api.yoldi.agency/api/image/${id}`,
    imageGetRequest
  );

  const { trigger } = useSWRMutation(
    "https://frontend-test-api.yoldi.agency/api/image",
    imagePostRequest
  );
  if (error) return <div>ошибка загрузки</div>;
  if (isLoading) return <div>загрузка...</div>;

  let userName = "";

  data ? Cookies.set("name", data.name) : "error";
  data ? Cookies.set("slug", data.slug) : "error";
  data ? data.name.slice(0, 1).toUpperCase() : "user";

  let description = null;
  if (typeof window !== "undefined") {
    description = window.localStorage.getItem("description");
  }

  async function uploadImage(event: ChangeEvent<HTMLInputElement>) {
    event.target.files instanceof FileList &&
      setSelectedImage(event.target.files[0]);

    setFill(true);
    let image = event.target.files![0];
    try {
      const img = await trigger({
        image,
      });
      Cookies.set("imageId", img.id);
    } catch (e) {
      console.log(e);
    }
  }
  async function uploadAvatarImage(event: ChangeEvent<HTMLInputElement>) {
    event.target.files instanceof FileList &&
      setSelectedAvatarImage(event.target.files[0]);

    let image = event.target.files![0];
    try {
      const img = await trigger({
        image,
      });
      Cookies.set("imageId", img.id);
    } catch (e) {
      console.log(e);
    }
  }
  const logOut = () => {
    router.push("/login");
    Cookies.remove("profile");
  };

  const deleteImage = () => {
    setSelectedImage(null);
    setFill(false);
  };

  return (
    <div className={styles.accountPage}>
      {isOpen && <ModalWindow setIsOpen={setIsOpen} />}
      <div
        className={styles.wallpaperContainer}
        onMouseEnter={(e) => {
          setStyleWallpaper({ display: "inline-block" });
        }}
        onMouseLeave={(e) => {
          setStyleWallpaper({ display: "none" });
        }}
      >
        {selectedImage ? (
          <Image
            alt="not found"
            width={0}
            height={0}
            className={styles.wallpaperContainer}
            src={URL.createObjectURL(selectedImage)}
          />
        ) : (
          <div className={styles.wallpaperContainer}></div>
        )}
        <div className={styles.buttonContainer} style={styleWallpaper}>
          {!fill ? (
            <div className={styles.uploadButton}>
              <Image
                src="/upload.svg"
                alt="uploadButton"
                height={19}
                width={19}
              ></Image>
              <label htmlFor="wallpaper">Загрузить</label>
              <input
                src=""
                id="wallpaper"
                type="file"
                name="wallpaperImage"
                onChange={uploadImage}
              />
              <Image
                src="/image.svg"
                alt="uploadButton"
                height={19}
                width={19}
              ></Image>
            </div>
          ) : (
            <button className={styles.uploadButton} onClick={deleteImage}>
              <Image
                src="/delete.svg"
                alt="deleteButton"
                height={19}
                width={19}
              ></Image>
              Удалить
              <Image
                src="/image.svg"
                alt="image"
                height={19}
                width={19}
              ></Image>
            </button>
          )}
        </div>
      </div>
      <div className={styles.main}>
        <div
          className={styles.imageContainer}
          onMouseEnter={(e) => {
            setStyleAvatar({ display: "inline-block" });
          }}
          onMouseLeave={(e) => {
            setStyleAvatar({ display: "none" });
          }}
        >
          {selectedAvatarImage ? (
            <Image
              src={URL.createObjectURL(selectedAvatarImage)}
              className={styles.image}
              alt={userName}
              width={50}
              height={50}
            />
          ) : (
            <div className={styles.image}>
              <p className={styles.imageText}>{userName}</p>
            </div>
          )}
          <div className={styles.downloadAvatarButton} style={styleAvatar}>
            <label htmlFor="avatar">
              <Image
                className={styles.downloadImage}
                src="/downloadAvatar.svg"
                alt="uploadButton"
                height={31.25}
                width={40.62}
              ></Image>
            </label>
            <input
              src="/downloadAvatar.svg"
              id="avatar"
              type="file"
              name="avatar"
              onChange={uploadAvatarImage}
            />
          </div>
        </div>

        <div className={styles.headerContainer}>
          <div className={styles.infoContainer}>
            <span className={styles.name}>{data.name}</span>
            <span className={styles.email}>{data.slug}</span>
          </div>
          <button onClick={() => setIsOpen(true)} className={styles.editButton}>
            <Image
              src="/edit.svg"
              alt="editButton"
              height={19}
              width={19}
            ></Image>
            Редактировать
          </button>
        </div>
        <p className={styles.description}>
          {description
            ? description
            : "Рыбатекст используется дизайнерами, проектировщиками и фронтендерами когда нужно быстро заполнить макеты или прототипы содержимым. Это тестовый контент, который не должен нести никакого смысла, лишь показать наличие самого текста или продемонстрировать типографику в деле"}
        </p>

        <button className={styles.logoutButton} onClick={logOut}>
          <Image src="/logout.svg" alt="Exit" height={19} width={19}></Image>
          Выйти
        </button>
      </div>
    </div>
  );
}

export default AccountPage;
