import { useNavigate } from "react-router-dom";
import PageLayout from "../components/PageLayout.tsx";

export default function Splash() {
    const navigate = useNavigate();
    return (
        <PageLayout>
            <div className="splash-screen" onClick={() => navigate("/onboarding")}>
                <img src="/imgs/logo.png" alt="차곡카" className="splash-logo" />
            </div>
        </PageLayout>
    );
}