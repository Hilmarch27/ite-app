import { useState, useEffect } from "react";
import { menuData } from "@/data/menu-data";
import { usePathname } from "next/navigation";

export default function useCheckActiveNav() {
  const pathname = usePathname();
  const [activePath, setActivePath] = useState<string | null>(null);

  useEffect(() => {
    const validPath = menuData.find((item) => item.href === pathname)?.href;
    if (validPath) {
      setActivePath(validPath);
    } else {
      setActivePath((prev) => prev || "/"); // Use previous path if available, default to '/' otherwise
    }
  }, [pathname]);

  const checkActiveNav = (nav: string) => {
    return nav === activePath;
  };

  return { checkActiveNav };
}
