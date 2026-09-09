import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePlan } from "../context/PlanContext";
import PageLayout from "../components/PageLayout.tsx";

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
        targetDownPayment ? String(targetDownPayment) : ""
    );
    const [savingsInput, setSavingsInput] = useState(
        currentSavings ? String(currentSavings) : ""
    );
    const [selectedMonths, setSelectedMonths] = useState<number | null>(
        targetMonths || null
    );
    const [error, setError] = useState("");

    if (!selectedVehicle) {
        return (
            <div style={{ padding: 24 }}>
                <p>선택된 차량이 없어요. 차량을 먼저 선택해주세요.</p>
                <button onClick={() => navigate("/vehicle-select")}>
                    차량 선택하러 가기
                </button>
            </div>
        );
    }

    const handleSubmit = () => {
        const downPayment = Number(downPaymentInput);
        const savings = Number(savingsInput);

        if (!downPaymentInput.trim() || isNaN(downPayment) || downPayment <= 0) {
            setError("목표 선수금을 올바르게 입력해주세요.");
            return;
        }
        if (!savingsInput.trim() || isNaN(savings) || savings < 0) {
            setError("현재 준비금을 올바르게 입력해주세요.");
            return;
        }
        if (savings > downPayment) {
            setError("현재 준비금이 목표 선수금보다 많아요. 다시 확인해주세요.");
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
            <h1>{selectedVehicle.name} 구매를 위해 목표를 설정해보세요</h1>
            <p>매월 준비하면 좋을 금액을 계산해드려요.</p>

            <label>목표 차량</label>
            <p>{selectedVehicle.name} ({selectedVehicle.price.toLocaleString()}원)</p>

            <label>목표 선수금</label>
            <input
                type="number"
                value={downPaymentInput}
                onChange={(e) => setDownPaymentInput(e.target.value)}
                placeholder="예: 30000000"
                style={{ width: "100%", padding: 12, marginBottom: 12 }}
            />

            <label>현재 준비금</label>
            <input
                type="number"
                value={savingsInput}
                onChange={(e) => setSavingsInput(e.target.value)}
                placeholder="예: 10000000"
                style={{ width: "100%", padding: 12, marginBottom: 12 }}
            />

            <label>목표 기간</label>
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                {MONTH_OPTIONS.map((months) => (
                    <button
                        key={months}
                        onClick={() => setSelectedMonths(months)}
                        style={{
                            padding: 12,
                            border:
                                selectedMonths === months ? "2px solid green" : "1px solid #ccc",
                        }}
                    >
                        {months}개월
                    </button>
                ))}
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button onClick={handleSubmit}>월 필요 금액 계산하기</button>
        </PageLayout>
    );
}