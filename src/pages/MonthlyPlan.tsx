import { useNavigate } from "react-router-dom";

export default function Splash() {
    const navigate = useNavigate();
    return (
        <div style={{ padding: 24 }}>
            <h1>구매계획</h1>

            <button onClick={() => navigate("/onboarding")}>시작하기</button>
        </div>
    );
}