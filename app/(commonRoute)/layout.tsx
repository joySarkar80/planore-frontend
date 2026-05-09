import { Footer } from "@/app/(commonRoute)/_component/shared/footer/Footer";
import { Navbar } from "@/app/(commonRoute)/_component/shared/navbar/Navbar";


export default function CommonLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    )
}
