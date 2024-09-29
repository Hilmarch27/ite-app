"use client";
import { Layout } from "@/components/layout/layout";
import { TopNav } from "@/components/layout/top-nav";
import { UserNav } from "@/components/layout/user-nav";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SunMoon } from "@/components/ui/sun-moon";
import { iconMap, tsiData } from "@/data/tsi-data";
import { IconArrowBackUp } from "@tabler/icons-react";
import React, { useState } from "react";
import { DataTable } from "@/components/table/data-table";
import { columns } from "@/components/table/columns";
import { DialogCustom } from "@/components/custom/dialog-custom";

const PageDashboard = () => {
  const [openTable, setOpenTable] = useState({
    key: "none",
    isOpen: false,
  });
  console.log(openTable);
  const tasks = [
    {
      id: "TASK-8782",
      title:
        "You can't compress the program without quantifying the open-source SSD pixel!",
      status: "in progress",
      label: "documentation",
      priority: "medium",
    },
    {
      id: "TASK-7878",
      title:
        "Try to calculate the EXE feed, maybe it will index the multi-byte pixel!",
      status: "backlog",
      label: "documentation",
      priority: "medium",
    },
    {
      id: "TASK-7839",
      title: "We need to bypass the neural TCP card!",
      status: "todo",
      label: "bug",
      priority: "high",
    },
    {
      id: "TASK-5562",
      title:
        "The SAS interface is down, bypass the open-source pixel so we can back up the PNG bandwidth!",
      status: "backlog",
      label: "feature",
      priority: "medium",
    },
  ];
  return (
    <>
      <Layout>
        {/* ===== Top Heading ===== */}
        <Layout.Header>
          <TopNav links={topNav} />
          <div className="ml-auto flex items-center space-x-4">
            {/* <Search /> */}
            <SunMoon />
            <UserNav />
          </div>
        </Layout.Header>
        <Separator className="bg-primary" />
        {/* ===== Main ===== */}
        <Layout.Body>
          {/* ===== TSI Data ===== */}
          {openTable.isOpen === false && (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6">
              <>
                {tsiData.map((tsi, idx) => {
                  const IconComponent = iconMap[tsi.icon];
                  return (
                    <Button
                      onClick={() => {
                        setOpenTable({
                          key: tsi.title,
                          isOpen: true,
                        });
                      }}
                      key={idx}
                      variant="outline"
                      className="h-28 w-28 flex flex-col shadow-xl relative overflow-hidden rounded-lg p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                    >
                      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                      <span className="absolute inset-[1px] bg-white dark:bg-slate-950 rounded-lg" />
                      <span className="relative flex flex-col items-center justify-center">
                        <IconComponent className="h-16 w-16" stroke={2} />
                        <span className="font-bold text-base mt-1 text-wrap">
                          {tsi.title}
                        </span>
                      </span>
                    </Button>
                  );
                })}
              </>
            </div>
          )}

          {/* ======= table data tsi ======= */}
          {openTable.isOpen &&
            (openTable.key === "Data Router" ? (
              <div>
                <DialogCustom />
                <Button
                  className="my-3"
                  onClick={() => setOpenTable({ key: "none", isOpen: false })}
                >
                  <IconArrowBackUp stroke={2} />
                  Back
                </Button>
                <DataTable data={tasks} columns={columns} />
              </div>
            ) : (
              <>
                <Button
                  className="my-3"
                  onClick={() => setOpenTable({ key: "none", isOpen: false })}
                >
                  <IconArrowBackUp stroke={2} />
                  Back
                </Button>
                <div className="flex justify-center items-center h-[60dvh]">
                  <span>Data Tidak Ada</span>
                </div>
              </>
            ))}
        </Layout.Body>
      </Layout>
    </>
  );
};

const topNav = [
  {
    title: "Data TSI",
    href: "dashboard",
    isActive: true,
  },
];

export default PageDashboard;
