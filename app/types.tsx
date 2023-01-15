export type User = {
  name: string;
  email: string;
  key: string;
  image: string | null;
};

export type Status = "Guest" | "User";

export type dataType = {
  name: string;
  imageId: string;
  password: string;
  slug: string;
};
