export interface SubMenu {
  title: string;
  href: string;
  icon?: string;
}

export interface MenuItem {
  title: string;
  href: string;
  icon?: string;
  sub?: SubMenu[];
}

export interface UserMenu {
  username: string;
  menu: MenuItem[];
}
