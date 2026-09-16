import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import Button from "../components/Button";
import PageLayout from "../components/PageLayout";
import { usePlan } from "../context/PlanContext";

export default function Complete() {
    const navigate = useNavigate();
    const { resetPlan } = usePlan();

    const handleRestart = () => {
        resetPlan();
        navigate("/");
    };

    return (
        <PageLayout>
            <div className="complete-wrapper">
                <div className="complete-screen">
                    <div className="complete-icon-box">
                        <div className="complete-icon-circle">
                            <Check size={28} color="#fff" />
                        </div>
                    </div>

                    <h1 className="complete-title">구매 계획을 확인했어요!</h1>
                    <p className="complete-description">
                        계산한 내용을 참고해
                        <br />
                        원하는 차량 구매를 차근차근 준비해보세요.
                    </p>

                    <p className="complete-thanks">
                        차곡카를 이용해주셔서 감사합니다.
                    </p>
                </div>

                <Button onClick={handleRestart}>처음으로 돌아가기</Button>
            </div>
        </PageLayout>
    );
}