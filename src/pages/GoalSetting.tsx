import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { usePlan } from "../context/PlanContext";
import Header from "../components/Header";
import Card from "../components/Card";
import Button from "../components/Button";
import PageLayout from "../components/PageLayout";
import { formatNumberOnly, formatNumberInput, parseNumberInput } from "../utils/format";

const MONTH_OPTIONS = [24, 36, 48];

export default function GoalSetting() {
    const navigate = useNavigate();
    const {
        selectedVehicle,
        targetDownPayment,
        currentSavings,
        targetMonths,
        setTargetDownPayment,
        setCurrentSavings,
        setTargetMonths,
    } = usePlan();

    const [downPaymentInput, setDownPaymentInput] = useState(
        targetDownPayment ? formatNumberInput(String(targetDownPayment)) : ""
    );
    const [savingsInput, setSavingsInput] = useState(
        currentSavings ? formatNumberInput(String(currentSavings)) : ""
    );
    const [selectedMonths, setSelectedMonths] = useState<number | null>(
        targetMonths || null
    );
    const [error, setError] = useState("");

    if (!selectedVehicle) {
        return (
            <PageLayout>
                <Header />
                <p className="page-description">
                    선택된 차량이 없어요. 차량을 먼저 선택해주세요.
                </p>
                <Button onClick={() => navigate("/vehicle-select")}>
                    차량 선택하러 가기
                </Button>
            </PageLayout>
        );
    }

    const handleSubmit = () => {
        const downPayment = parseNumberInput(downPaymentInput);
        const savings = parseNumberInput(savingsInput);

        if (!downPaymentInput.trim() || downPayment <= 0) {
            setError("목표 선수금을 올바르게 입력해주세요.");
            return;
        }
        if (!savingsInput.trim() || savings < 0) {
            setError("현재 준비한 금액을 올바르게 입력해주세요.");
            return;
        }

        if (savings > downPayment) {
            setError("현재 준비한 금액이 목표 선수금보다 많아요. 다시 확인해주세요.");
            return;
        }
        if (downPayment > selectedVehicle.price) {
            setError("목표 선수금이 차량 가격보다 많아요. 다시 확인해주세요.");
            return;
        }
        if (!selectedMonths) {
            setError("목표 기간을 선택해주세요.");
            return;
        }

        setError("");
        setTargetDownPayment(downPayment);
        setCurrentSavings(savings);
        setTargetMonths(selectedMonths);
        navigate("/monthly-plan");
    };

    return (
        <PageLayout>
            <Header />
            <h1 className="page-title">
                {selectedVehicle.name} 구매를 위해
                <br />
                목표를 설정해 보세요.
            </h1>
            <p className="page-description">
                목표 선수금과 현재 준비금, 목표 기간을 설정하면
                <br />
                매월 필요한 금액을 계산해드려요.
            </p>

            <div className="goal-field">
                <label className="goal-label">차량 가격</label>
                <div className="goal-input-wrapper">
                    <div className="goal-readonly-display">
                        {formatNumberOnly(selectedVehicle.price)}
                    </div>
                    <span className="goal-input-suffix">원</span>
                </div>
            </div>

            <div className="goal-field">
                <label className="goal-label">목표 선수금</label>
                <div className="goal-input-wrapper">
                    <input
                        type="text"
                        inputMode="numeric"
                        value={downPaymentInput}
                        onChange={(e) => setDownPaymentInput(formatNumberInput(e.target.value))}
                        placeholder="목표 선수금을 입력해주세요."
                        className="goal-input"
                    />
                    {downPaymentInput && <span className="goal-input-suffix">원</span>}
                </div>
            </div>

            <div className="goal-field">
                <label className="goal-label">현재 준비한 금액</label>
                <div className="goal-input-wrapper">
                    <input
                        type="text"
                        inputMode="numeric"
                        value={savingsInput}
                        onChange={(e) => setSavingsInput(formatNumberInput(e.target.value))}
                        placeholder="현재 준비한 금액을 입력해주세요."
                        className="goal-input"
                    />
                    {savingsInput && <span className="goal-input-suffix">원</span>}
                </div>
            </div>

            <div className="goal-field">
                <label className="goal-label">목표 기간</label>
                <div className="goal-month-list">
                    {MONTH_OPTIONS.map((months) => (
                        <Card
                            key={months}
                            selected={selectedMonths === months}
                            onClick={() => setSelectedMonths(months)}
                        >
                            <div className="vehicle-card-row">
                                <span>{months}개월</span>
                                {selectedMonths === months && (
                                    <Check size={20} color="var(--color-primary)" />
                                )}
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            {error && <p className="goal-error">{error}</p>}

            <Button onClick={handleSubmit}>월 필요 금액 계산하기</Button>
        </PageLayout>
    );
}