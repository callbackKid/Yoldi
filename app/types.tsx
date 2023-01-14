import { ReactElement } from "react";

export type User = {
  name: string;
  email: string;
  key: string;
  image: string | null;
};

export type Status = "Guest" | "User";

type AccountPageType = {
  description: string;
  children?: JSX.Element | React.ReactElement | JSX.IntrinsicElements;
};

export type dataType = {
  name: string;
  imageId: string;
  password: string;
  slug: string;
};
