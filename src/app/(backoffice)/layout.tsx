import HeaderAdmin from "@/components/header-admin";
import { cn } from "@/lib/utils";

export default function BackofficeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
        <HeaderAdmin />
        <div className={cn("mt-4 px-10")}>
          {children}
        </div>
    </section>
  );
}
