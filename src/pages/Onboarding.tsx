import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import ImageBox from "../components/ImageBox";
import Button from "../components/Button";
import PageLayout from "../components/PageLayout";

const CHECKLIST_ITEMS = [
    "예상 차량 구매비용",
    "목표 선수금 설정",
    "내 상황에 맞는 자금 준비 계획",
];

export default function Onboarding() {
    const navigate = useNavigate();

    return (
        <PageLayout>
            <p className="brand-name">차곡카</p>
            <h1 className="page-title">
                사고 싶은 차,
                <br />
                얼마나 준비해야 할까요?
            </h1>
            <p className="page-description">
                차량 구매에 필요한 비용부터
                <br />
                내 상황에 맞는 준비 계획까지 확인해보세요.
            </p>

            <ImageBox>
                <img
                    src="/imgs/logo2.png"
                    alt=""
                    className="onboarding-illustration"
                />
                <ul className="onboarding-checklist">
                    {CHECKLIST_ITEMS.map((item) => (
                        <li key={item} className="onboarding-checklist-item">
                            <Check size={16} color="var(--color-primary)" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </ImageBox>

            <div className="onboarding-cta">
                <Button onClick={() => navigate("/vehicle-select")}>시작하기</Button>
            </div>
        </PageLayout>
    );
}