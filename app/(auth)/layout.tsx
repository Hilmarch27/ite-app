
export default function AuthLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="flex min-h-screen items-center justify-center">
        {children}
      </section>
    </>
  );
}
