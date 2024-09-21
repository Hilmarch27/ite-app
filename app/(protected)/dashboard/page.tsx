'use client'
import { Layout} from "@/components/layout/layout";
import { TopNav } from "@/components/layout/top-nav";
import { UserNav } from "@/components/layout/user-nav";
import React from "react";
const page = () => {
  return (
    <>
      <Layout>
        {/* ===== Top Heading ===== */}
        <Layout.Header>
          <TopNav links={topNav} />
          <div className="ml-auto flex items-center space-x-4">
            {/* <Search />
            <ThemeSwitch /> */}
            <UserNav />
          </div>
        </Layout.Header>

        {/* ===== Main ===== */}
        <Layout.Body>
          <div className="mb-2 flex items-center justify-between space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          </div>
        </Layout.Body>
      </Layout>
    </>
  );
};

const topNav = [
  {
    title: "Overview",
    href: "dashboard/overview",
    isActive: true,
  },
  {
    title: "Customers",
    href: "dashboard/customers",
    isActive: false,
  },
  {
    title: "Products",
    href: "dashboard/products",
    isActive: false,
  },
  {
    title: "Settings",
    href: "dashboard/settings",
    isActive: false,
  },
];

export default page;
