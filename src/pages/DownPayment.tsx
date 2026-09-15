import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Info} from "lucide-react";
import {usePlan} from "../context/PlanContext";
import Header from "../components/Header";
import Button from "../components/Button";
import PageLayout from "../components/PageLayout";
import {
    formatNumberInput,
    parseNumberInput,
    formatWon,
    formatNumberOnly
} from "../utils/format";

export default function DownPayment() {
    const navigate = useNavigate();
    const {
        expectedPurchasePrice,
        targetDownPayment,
        currentSavings,
        setTargetDownPayment,
        setCurrentSavings,
    } = usePlan();

    const [downPaymentInput, setDownPaymentInput] = useState(
        targetDownPayment ? formatNumberInput(String(targetDownPayment)) : ""
    );
    const [savingsInput, setSavingsInput] = useState(
        currentSavings ? formatNumberInput(String(currentSavings)) : ""
    );
    const [isDefinitionOpen, setIsDefinitionOpen] = useState(false);
    const [error, setError] = useState("");

    if (!expectedPurchasePrice) {
        return (
            <PageLayout>
                <Header/>
                <p className="page-description">
                    예상 구매 가격 정보가 없어요. 이전 단계를 먼저 진행해주세요.
                </p>
                <Button onClick={() => navigate("/purchase-price")}>
                    예상 구매 가격 설정하러 가기
                </Button>
            </PageLayout>
        );
    }

    const parsedDownPayment = parseNumberInput(downPaymentInput);
    const parsedSavings = parseNumberInput(savingsInput);
    const remainingToSave = Math.max(parsedDownPayment - parsedSavings, 0);

    const handleNext = () => {
        if (!downPaymentInput.trim() || parsedDownPayment <= 0) {
            setError("목표 선수금을 올바르게 입력해주세요.");
            return;
        }

        if (parsedDownPayment > expectedPurchasePrice) {
            setError("목표 선수금이 예상 구매 가격보다 많아요. 다시 확인해주세요.");
            return;
        }

        if (!savingsInput.trim()) {
            setError("현재 준비한 금액을 입력해주세요.");
            return;
        }

        if (parsedSavings < 0) {
            setError("현재 준비한 금액을 올바르게 입력해주세요.");
            return;
        }

        if (parsedSavings > parsedDownPayment) {
            setError(
                "현재 준비한 금액이 목표 선수금보다 많아요. 다시 확인해주세요."
            );
            return;
        }

        setError("");
        setTargetDownPayment(parsedDownPayment);
        setCurrentSavings(parsedSavings);
        navigate("/plan-method");
    };

    return (
        <PageLayout>
            <Header/>
            <h1 className="page-title">
                차량 구매 전
                <br/>
                얼마를 먼저 준비할까요?
            </h1>
            <p className="page-description">
                목표 선수금과 지금까지 준비한 금액을 알려주세요.
            </p>

            <div className="goal-field">
                <div className="readonly-price-pill">
                    <span className="readonly-price-pill-label">예상 구매 가격</span>
                    <span className="readonly-price-pill-value">
      {formatNumberOnly(expectedPurchasePrice)}원
    </span>
                </div>
            </div>

            <div className="goal-field">
                <div className="price-input-label-row">
                    <label className="purchase-price-field-label">목표 선수금</label>
                    <button
                        type="button"
                        className="definition-toggle-link"
                        onClick={() => setIsDefinitionOpen((prev) => !prev)}
                    >
                        선수금이란? <Info size={13}/>
                    </button>
                </div>
                <div className="goal-input-wrapper">
                    <input
                        type="text"
                        inputMode="numeric"
                        value={downPaymentInput}
                        onChange={(e) =>
                            setDownPaymentInput(formatNumberInput(e.target.value))
                        }
                        placeholder="예: 20,000,000"
                        className="goal-input"
                    />
                    <span className="goal-input-suffix">원</span>
                </div>
                {isDefinitionOpen ? (
                    <div className="definition-box">
                        <p className="definition-box-title">선수금이란?</p>
                        <p className="definition-box-text">
                            차량 구매 시 전체 금액 중 먼저 준비해 지불하려는 금액을
                            의미해요. 선수금이 많을수록 이후에 마련해야 할 차량 구매
                            금액은 줄어들어요.
                        </p>
                    </div>
                ) : (
                    <p className="goal-field-caption">
                        차량을 구매하기 전에 먼저 마련하고 싶은 금액이에요.
                    </p>
                )}
            </div>

            <div className="goal-field">
                <label className="purchase-price-field-label">
                    현재 준비한 금액
                </label>
                <div className="goal-input-wrapper">
                    <input
                        type="text"
                        inputMode="numeric"
                        value={savingsInput}
                        onChange={(e) =>
                            setSavingsInput(formatNumberInput(e.target.value))
                        }
                        placeholder="예: 5,000,000"
                        className="goal-input"
                    />
                    <span className="goal-input-suffix">원</span>
                </div>
                <p className="goal-field-caption">
                    차량 구매를 위해 현재 따로 준비해둔 금액을 입력해주세요.
                </p>

                {parsedDownPayment > 0 && (
                    <div className="readonly-price-pill readonly-price-pill-margin">
                        <span className="readonly-price-pill-label">앞으로 준비할 선수금</span>
                        <span className="readonly-price-pill-value">
      {formatWon(remainingToSave)}
    </span>
                    </div>
                )}
            </div>

            {error && <p className="goal-error">{error}</p>}

            <div className="down-payment-cta">
                <Button onClick={handleNext}>다음</Button>
            </div>
        </PageLayout>
    );
}