import "@/app/globals.css";

import Header from "@/components/global-components/Header";
import Sidebar from "@/components/global-components/Sidebar";
import Footer from "@/components/global-components/Footer";

export default function ProtectedLayout({ children }) {
    return (
        <div className="layout">
            {/* Top content: sidebar + main */}
            <div className="content-area">
                <Sidebar />
                <div className="main-section">
                <Header />
                <main className="main-content">{children}</main>
                </div>
            </div>

            {/* Footer always at the bottom */}
            <Footer />
        </div>
    );
}