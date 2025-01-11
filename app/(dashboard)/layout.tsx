import { Footer } from "@/common/components/custom-components/footer";
import { Header } from "@/common/components/custom-components/header";


export const metadata = {
  title: "Phil-IRI - Reading Assessment Platform",
  description: "AI-powered reading assessment platform in the Philippines",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
