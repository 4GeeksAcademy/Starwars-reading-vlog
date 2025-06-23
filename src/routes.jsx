import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Single from "./pages/Single.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import { Navbar } from "./components/Navbar.jsx";
import { Footer } from "./components/Footer.jsx"; // Import Footer (which is AppFooter)

const AppRoutes = () => {
    const basename = import.meta.env.VITE_BASENAME || "";

    return (
        <div className="app-wrapper min-h-screen flex flex-col">
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <main className="flex-grow">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/:resource/:uid" element={<Single />} />
                            <Route path="*" element={
                                <div className="min-h-screen flex items-center justify-center font-retro">
                                    <div className="text-center p-8 bg-sw-dark/50 rounded-lg border-2 border-sw-red">
                                        <div className="text-sw-red text-4xl font-mono-retro mb-4">[ ERROR 404 ]</div>
                                        <div className="text-sw-yellow text-xl font-mono-retro uppercase tracking-wider">
                                            Page Not Found
                                        </div>
                                        <div className="text-sw-blue/60 text-sm font-mono-retro mt-2">
                                            Return to the main database
                                        </div>
                                    </div>
                                </div>
                            } />
                        </Routes>
                    </main>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default AppRoutes;