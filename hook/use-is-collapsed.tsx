'use client';
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

export default function useIsCollapsed() {
  const [isClient, setIsClient] = useState(false);
  const [isCollapsed, setIsCollapsed] = useLocalStorage(
    "collapsed-sidebar",
    false
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth < 768 ? false : isCollapsed);
    };

    if (isClient) {
      handleResize();
      window.addEventListener("resize", handleResize);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isClient, isCollapsed, setIsCollapsed]);

  return [isClient ? isCollapsed : false, setIsCollapsed] as const;
}
