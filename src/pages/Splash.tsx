import { useNavigate } from "react-router-dom";
import PageLayout from "../components/PageLayout.tsx";

export default function Splash() {
    const navigate = useNavigate();
    return (
        <PageLayout>
            <h1>스플래시</h1>
            <p>차곡카 - 사고 싶은 차, 얼마씩 모으면 살 수 있을까?</p>
            <button onClick={() => navigate("/onboarding")}>시작하기</button>
        </PageLayout>
    );
}