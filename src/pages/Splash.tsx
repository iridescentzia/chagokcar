import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/PageLayout";

export default function Splash() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = window.setTimeout(() => {
            navigate("/onboarding");
        }, 1200);

        return () => window.clearTimeout(timer);
    }, [navigate]);

    return (
        <PageLayout>
            <div className="splash-screen">
                <img
                    src="/imgs/logo.png"
                    alt="차곡카"
                    className="splash-logo"
                />
            </div>
        </PageLayout>
    );
}