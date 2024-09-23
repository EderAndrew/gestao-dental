
import MenuOffice from '@/components/menu-office';
import '../../../globals.css'
import HeaderOffice from '@/components/utils/header-office';

export default function OfficesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex">
      <MenuOffice />
      <section className="flex flex-col w-full">
        <HeaderOffice />
        <div className="p-8">
          {children}
        </div>
        
      </section>
    </main>
  );
}
