"use client";

import { useEffect } from "react";

export default function Error({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  console.log(error);
  return (
    <div>
      <p>Something went wrong!</p>
    </div>
  );
}
