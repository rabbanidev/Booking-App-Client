import Footer from "@/components/UI/Footer";
import Navbar from "@/components/UI/Navbar";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-[90vh]">{children}</main>
      <Footer />
    </>
  );
}
