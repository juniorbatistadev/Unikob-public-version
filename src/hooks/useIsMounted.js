import { useEffect, useState } from "react";

export default function useScrollToTop() {
  const [isMounted, setIsMounted] = useState();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return { isMounted };
}
