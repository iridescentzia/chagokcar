import { useNavigate } from "react-router-dom";
import PageLayout from "../components/PageLayout.tsx";

export default function Splash() {
    const navigate = useNavigate();
    return (
        <PageLayout>
            <h1>온보딩</h1>

            <button onClick={() => navigate("/onboarding")}>시작하기</button>
        </PageLayout>
    );
}