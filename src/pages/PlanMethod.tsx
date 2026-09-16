import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePlan } from "../context/PlanContext";
import { calculatePlan } from "../utils/calculatePlan";
import Header from "../components/Header";
import Button from "../components/Button";
import BottomSheet from "../components/BottomSheet";
import PageLayout from "../components/PageLayout";
import {
    formatWon,
    formatNumberInput,
    parseNumberInput,
} from "../utils/format";
import type { PlanMethod as PlanMethodType } from "../types/plan";

const MONTH_OPTIONS = [12, 24, 36, 48, 60];

export default function PlanMethod() {
    const navigate = useNavigate();
    const {
        expectedPurchasePrice,
        targetDownPayment,
        currentSavings,
        planMethod,
        targetMonths,
        monthlySavings,
        setPlanMethod,
        setTargetMonths,
        setMonthlySavings,
    } = usePlan();

    const [selectedMethod, setSelectedMethod] =
        useState<PlanMethodType | null>(planMethod);

    const [selectedPeriodOption, setSelectedPeriodOption] =
        useState<number | "custom" | null>(() => {
            if (planMethod !== "period" || !targetMonths) {
                return null;
            }

            return MONTH_OPTIONS.includes(targetMonths)
                ? targetMonths
                : "custom";
        });

    const [customMonthsInput, setCustomMonthsInput] = useState(
        planMethod === "period" &&
        targetMonths > 0 &&
        !MONTH_OPTIONS.includes(targetMonths)
            ? String(targetMonths)
            : ""
    );

    const [monthlyAmountInput, setMonthlyAmountInput] = useState(
        planMethod === "monthly" && monthlySavings > 0
            ? formatNumberInput(String(monthlySavings))
            : ""
    );
    const [error, setError] = useState("");

    const [isCustomMonthsSheetOpen, setIsCustomMonthsSheetOpen] =
        useState(false);
    const [customMonthsDraft, setCustomMonthsDraft] = useState("");

    if (!targetDownPayment) {
        return (
            <PageLayout>
                <Header />
                <p className="page-description">
                    선수금 정보가 없어요. 이전 단계를 먼저 진행해주세요.
                </p>
                <Button onClick={() => navigate("/down-payment")}>
                    선수금 입력하러 가기
                </Button>
            </PageLayout>
        );
    }

    const amountToSave = Math.max(targetDownPayment - currentSavings, 0);

    const handleCalculate = () => {
        if (!selectedMethod) {
            setError("계획 기준을 선택해주세요.");
            return;
        }

        if (selectedMethod === "period") {
            const months =
                selectedPeriodOption === "custom"
                    ? parseNumberInput(customMonthsInput)
                    : selectedPeriodOption;

            if (!months || months <= 0) {
                setError("목표 기간을 선택하거나 입력해주세요.");
                return;
            }

            const result = calculatePlan({
                expectedPurchasePrice,
                targetDownPayment,
                currentSavings,
                planMethod: "period",
                targetMonths: months,
                monthlySavings: 0,
            });

            setError("");
            setPlanMethod("period");
            setTargetMonths(result.targetMonths);
            setMonthlySavings(result.monthlySavings);
            navigate("/plan-result");
            return;
        }

        // planMethod === "monthly"
        const monthly = parseNumberInput(monthlyAmountInput);

        if (!monthlyAmountInput.trim() || monthly <= 0) {
            setError("매월 모을 수 있는 금액을 입력해주세요.");
            return;
        }

        const result = calculatePlan({
            expectedPurchasePrice,
            targetDownPayment,
            currentSavings,
            planMethod: "monthly",
            targetMonths: 0,
            monthlySavings: monthly,
        });

        setError("");
        setPlanMethod("monthly");
        setMonthlySavings(result.monthlySavings);
        setTargetMonths(result.targetMonths);
        navigate("/plan-result");
    };

    return (
        <PageLayout>
            <Header />
            <h1 className="page-title">
                어떤 기준으로
                <br />
                준비 계획을 세울까요?
            </h1>
            <p className="page-description">나에게 더 편한 방법을 선택해주세요.</p>

            <div className="readonly-price-pill">
                <span className="readonly-price-pill-label">앞으로 준비할 선수금</span>
                <span className="readonly-price-pill-value">
          {formatWon(amountToSave)}
        </span>
            </div>

            <div className="plan-method-field plan-criteria-field">
                <label className="purchase-price-field-label">계획 기준</label>

                <div
                    className={`plan-method-option ${
                        selectedMethod === "period" ? "plan-method-option-selected" : ""
                    }`}
                    onClick={() => setSelectedMethod("period")}
                >
                    <span className="plan-method-radio" />
                    <div>
                        <p className="plan-method-option-title">사고 싶은 시기가 있어요</p>
                        <p className="plan-method-option-desc">
                            목표 기간을 정하면 매월 얼마씩 모아야 하는지 계산해드려요.
                        </p>
                    </div>
                </div>

                <div
                    className={`plan-method-option ${
                        selectedMethod === "monthly" ? "plan-method-option-selected" : ""
                    }`}
                    onClick={() => setSelectedMethod("monthly")}
                >
                    <span className="plan-method-radio" />
                    <div>
                        <p className="plan-method-option-title">
                            매월 모을 수 있는 금액이 있어요
                        </p>
                        <p className="plan-method-option-desc">
                            매월 모을 금액을 정하면 선수금을 준비하는 데 걸리는 기간을
                            계산해드려요.
                        </p>
                    </div>
                </div>
            </div>

            {selectedMethod === "period" && (
                <div className="plan-method-field">
                    <label className="purchase-price-field-label">
                        선수금 마련 목표 기간
                    </label>
                    <div className="month-option-grid">
                        {MONTH_OPTIONS.map((months) => (
                            <button
                                key={months}
                                type="button"
                                className={`month-option-button ${
                                    selectedPeriodOption === months
                                        ? "month-option-button-selected"
                                        : ""
                                }`}
                                onClick={() => setSelectedPeriodOption(months)}
                            >
                                {months}개월
                            </button>
                        ))}
                        <button
                            type="button"
                            className={`month-option-button ${
                                selectedPeriodOption === "custom"
                                    ? "month-option-button-selected"
                                    : ""
                            }`}
                            onClick={() => {
                                setCustomMonthsDraft(customMonthsInput);
                                setIsCustomMonthsSheetOpen(true);
                            }}
                        >
                            직접입력
                        </button>
                    </div>

                    {selectedPeriodOption === "custom" && customMonthsInput && (
                        <p className="custom-months-confirmed">
                            {customMonthsInput}개월로 설정했어요.
                        </p>
                    )}

                    <p className="goal-field-caption">
                        선수금을 모두 마련하고 싶은 기간이에요.
                    </p>
                </div>
            )}

            {selectedMethod === "monthly" && (
                <div className="plan-method-field">
                    <label className="purchase-price-field-label">
                        매월 모을 수 있는 금액
                    </label>
                    <div className="goal-input-wrapper">
                        <input
                            type="text"
                            inputMode="numeric"
                            value={monthlyAmountInput}
                            onChange={(e) =>
                                setMonthlyAmountInput(formatNumberInput(e.target.value))
                            }
                            placeholder="예: 500,000"
                            className="goal-input"
                        />
                        <span className="goal-input-suffix">원</span>
                    </div>
                    <p className="goal-field-caption">
                        차량 구매를 위해 매월 꾸준히 준비할 수 있는 금액을 입력해주세요.
                    </p>
                </div>
            )}

            {error && <p className="goal-error">{error}</p>}

            <Button onClick={handleCalculate}>계획 계산하기</Button>

            {isCustomMonthsSheetOpen && (
                <BottomSheet
                    title="어떤 기준으로 준비 계획을 세울까요?"
                    description="나에게 더 편한 방법을 선택해주세요."
                    onClose={() => setIsCustomMonthsSheetOpen(false)}
                >
                    <div className="readonly-price-pill">
            <span className="readonly-price-pill-label">
              앞으로 준비할 선수금
            </span>
                        <span className="readonly-price-pill-value">
              {formatWon(amountToSave)}
            </span>
                    </div>

                    <div className="plan-method-field" style={{ marginTop: 20 }}>
                        <label className="purchase-price-field-label">
                            목표 기간 직접 입력
                        </label>
                        <div className="goal-input-wrapper">
                            <input
                                type="text"
                                inputMode="numeric"
                                autoFocus
                                value={customMonthsDraft}
                                onChange={(e) =>
                                    setCustomMonthsDraft(
                                        e.target.value.replace(/[^0-9]/g, "")
                                    )
                                }
                                placeholder="예: 20"
                                className="goal-input"
                            />
                            <span className="goal-input-suffix">개월</span>
                        </div>
                    </div>

                    <Button
                        disabled={!customMonthsDraft || Number(customMonthsDraft) <= 0}
                        onClick={() => {
                            setCustomMonthsInput(customMonthsDraft);
                            setSelectedPeriodOption("custom");
                            setIsCustomMonthsSheetOpen(false);
                        }}
                    >
                        확인
                    </Button>
                </BottomSheet>
            )}
        </PageLayout>
    );
}