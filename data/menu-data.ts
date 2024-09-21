export const menuData = [
  {
    title: "Debitur",
    href: "/rm",
    icon: "IconLayoutDashboard",
    adminOnly: false,
  },
  {
    title: "Laporan",
    href: "/rm/laporan",
    icon: "IconBook",
    adminOnly: false,
  },
  {
    title: "Dashboard",
    href: "/adm",
    icon: "IconLayoutDashboard",
    adminOnly: true,
    sub: [
      {
        title: "Keseluruhan",
        href: "/adm",
        icon: "IconLayoutDashboard",
        adminOnly: true,
      },
      {
        title: "Ro Bandung Lelang",
        href: "/adm/branch-office/lelang",
        icon: "IconLayoutDashboard",
        adminOnly: true,
      },
      {
        title: "Ro Bandung Non Lelang",
        href: "/adm/branch-office/non-lelang",
        icon: "IconLayoutDashboard",
        adminOnly: true,
      },
    ],
  },
  {
    title: "Laporan",
    href: "/adm/laporan",
    icon: "IconLayoutDashboard",
    adminOnly: true,
  },
  // {
  //   title: "Bo Ro Bandung",
  //   href: "/adm/branch-office",
  //   icon: "IconLayoutDashboard",
  //   adminOnly: true,
  //   sub: [
  //     {
  //       title: "Lelang",
  //       href: "/adm/branch-office/lelang",
  //       icon: "IconLayoutDashboard",
  //       adminOnly: true,
  //     },
  //     {
  //       title: "Non Lelang",
  //       href: "/adm/branch-office/non-lelang",
  //       icon: "IconLayoutDashboard",
  //       adminOnly: true,
  //     },
  //   ],
  // },
];
