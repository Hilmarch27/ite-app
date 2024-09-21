'use client';
import Sidebar from "@/components/layout/side-bar";
import useIsCollapsed from "@/hook/use-is-collapsed";

export default function AuthLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed();
  return (
    <div className="relative">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main
        id="content"
        className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 ${
          isCollapsed ? "md:ml-14" : "md:ml-64"
        } h-full`}
      >
        {children}
      </main>
    </div>
  );
}
