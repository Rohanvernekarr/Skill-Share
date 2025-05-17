import Navbar from "@/components/common/Navbar"
import Footer from "@/components/common/Footer"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  )
}
