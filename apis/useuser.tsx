import Cookies from "js-cookie";
import useSWR, { preload } from "swr";

// Login + Sign-UP
export async function sendRequest(url: string, { arg }: { arg: any }) {
  return await fetch(url, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  }).then((res) => res.json());
}

//Get Profile
export async function profileFetcher(url: string) {
  const r = await fetch(url, {
    headers: {
      "X-API-KEY": Cookies.get("profile")!,
    },
  });
  return await r.json();
}

// Patch Profile
export async function patchRequest(url: string, { arg }: { arg: any }) {
  return await fetch(url, {
    method: "PATCH",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-API-KEY": Cookies.get("profile")!,
    },
    body: JSON.stringify(arg),
  }).then((res) => res.json());
}

// Get user List
export async function fetcher(url: string) {
  const r = await fetch(url);
  return await r.json();
}

// Get user
export async function userFetcher(url: string) {
  const r = await fetch(url);
  return await r.json();
}

export async function imageGetRequest(url: string) {
  const r = await fetch(url);
  return await r.json();
}
//Post Image
export async function imagePostRequest(url: string, { arg }: { arg: any }) {
  const formData = new FormData();
  formData.append("file", arg.image);
  return await fetch(url, {
    method: "POST",
    body: formData,
  }).then((res) => res.json());
}

export default function useUser() {
  const { data, error, mutate, isLoading } = useSWR(
    `https://frontend-test-api.yoldi.agency/api/profile`,
    profileFetcher
  );

  return {
    user: data,
    isLoading,
    error,
    mutate,
  };
}
