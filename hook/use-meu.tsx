"use client";
import { useEffect, useState } from "react";

import {
  IconLayoutDashboard,
  IconBook,
  IconRosetteDiscount,
  IconUserCog,
  IconUser,
  IconBuildingEstate,
} from "@tabler/icons-react";

export interface NavLink {
  title: string;
  label?: string;
  href: string;
  icon: JSX.Element;
}
import { menuData } from "@/data/menu-data";
import { MenuItem, SubMenu } from "@/types/menu-types";

export interface SideLink extends NavLink {
  sub?: NavLink[];
}

interface IconMapping {
  [key: string]: JSX.Element;
}

export function useMenu(): SideLink[] {
  const [menu, setMenu] = useState<SideLink[]>([]);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin") === "true"; // Get the isAdmin flag from localStorage

    const iconMapping: IconMapping = {
      IconLayoutDashboard: <IconLayoutDashboard size={18} />,
      IconBook: <IconBook size={18} />,
      IconRosetteDiscount: <IconRosetteDiscount size={18} />,
      IconUserCog: <IconUserCog size={18} />,
      IconUser: <IconUser size={18} />,
      IconBuildingEstate: <IconBuildingEstate size={18} />,
    };

    const filteredMenuData = menuData.filter((item) =>
      isAdmin ? item.adminOnly : !item.adminOnly
    );

    const menuWithIcons = filteredMenuData.map((item: MenuItem) => ({
      ...item,
      icon: iconMapping[item.icon as keyof IconMapping] || null,
      sub: item.sub?.map((subItem: SubMenu) => ({
        ...subItem,
        icon: iconMapping[subItem.icon as keyof IconMapping] || null,
      })),
    }));

    setMenu(menuWithIcons);
  }, []);

  return menu;
}
