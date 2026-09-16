import { useNavigate } from "react-router-dom";
import { usePlan } from "../context/PlanContext";
import { calculatePurchaseCost } from "../utils/calculatePurchaseCost";
import { BOND_DISCOUNT_POLICY_2026 } from "../data/registrationPolicies";
import { REGIONS } from "../data/regions";
import Header from "../components/Header";
import Button from "../components/Button";
import BottomSheet from "../components/BottomSheet";
import PageLayout from "../components/PageLayout";
import { formatWon } from "../utils/format";
import { useState } from "react";

type ActiveSheet = "acquisitionTax" | "bondCost" | null;

export default function PurchaseCost() {
    const navigate = useNavigate();
    const {
        selectedVehicle,
        expectedPurchasePrice,
        registrationRegion,
        targetDownPayment,
    } = usePlan();

    const [activeSheet, setActiveSheet] = useState<ActiveSheet>(null);

    if (!selectedVehicle || !expectedPurchasePrice || !registrationRegion) {
        return (
            <PageLayout>
                <Header />
                <p className="page-description">
                    구매 비용 계산에 필요한 정보가 없어요. 이전 단계를 먼저
                    진행해주세요.
                </p>
                <Button onClick={() => navigate("/purchase-price")}>
                    예상 구매 가격 설정하러 가기
                </Button>
            </PageLayout>
        );
    }

    const result = calculatePurchaseCost({
        expectedPurchasePrice,
        vehicle: selectedVehicle,
        region: registrationRegion,
        bondDiscountRate: BOND_DISCOUNT_POLICY_2026.referenceDiscountRate,
    });

    const remainingCarAmount = Math.max(
        expectedPurchasePrice - targetDownPayment,
        0
    );
    const additionalPurchaseCost = result.totalAdditionalCost;
    const remainingRequiredAmount = remainingCarAmount + additionalPurchaseCost;

    const regionName = REGIONS.find((r) => r.id === registrationRegion)?.name;

    return (
        <PageLayout>
            <Header />
            <p className="plan-result-eyebrow">예상 구매 비용</p>
            <h1 className="page-title">
                차량 가격 외에도
                <br />
                준비할 비용이 있어요
            </h1>
            <p className="page-description">
                예상 구매 가격과 등록 지역을 기준으로
                <br />
                차량 구매 시 필요한 비용을 확인해보세요.
            </p>

            <div className="plan-result-highlight-box">
                <p className="plan-result-highlight-label">총 예상 구매 비용</p>
                <p className="plan-result-highlight-value">
                    약 {formatWon(result.totalPurchaseCost)}
                </p>
            </div>

            <div className="purchase-cost-section">
                <p className="purchase-cost-section-title">예상 비용 내역</p>
                <div className="plan-result-info-list">
                    <div className="plan-result-info-row">
                        <span className="plan-result-info-label">예상 차량 가격</span>
                        <span className="plan-result-info-value">
              {formatWon(expectedPurchasePrice)}
            </span>
                    </div>
                    <div className="plan-result-info-row">
            <span className="plan-result-info-label">
              예상 취득세
              <button
                  type="button"
                  className="info-icon-button"
                  onClick={() => setActiveSheet("acquisitionTax")}
              >
                ?
              </button>
            </span>
                        <span className="plan-result-info-value">
              약 {formatWon(result.acquisitionTax)}
            </span>
                    </div>
                    <div className="plan-result-info-row">
            <span className="plan-result-info-label">
              예상 공채 할인 비용
              <button
                  type="button"
                  className="info-icon-button"
                  onClick={() => setActiveSheet("bondCost")}
              >
                ?
              </button>
            </span>
                        <span className="plan-result-info-value">
              약 {formatWon(result.bondCost)}
            </span>
                    </div>
                </div>
            </div>

            <div className="purchase-cost-section">
                <p className="purchase-cost-section-title">내 구매 준비 계획</p>
                <div className="purchase-plan-summary">
                    <div className="purchase-plan-summary-row">
                        <span className="plan-result-info-label">목표 선수금</span>
                        <span className="plan-result-info-value">
        {formatWon(targetDownPayment)}
      </span>
                    </div>
                    <div className="purchase-plan-summary-row">
                        <span className="plan-result-info-label">남은 차량 대금</span>
                        <span className="plan-result-info-value">
        {formatWon(remainingCarAmount)}
      </span>
                    </div>
                    <div className="purchase-plan-summary-row">
                        <span className="plan-result-info-label">예상 세금·공채 비용</span>
                        <span className="plan-result-info-value">
        약 {formatWon(additionalPurchaseCost)}
      </span>
                    </div>
                    <div className="purchase-plan-summary-divider" />
                    <div className="purchase-plan-summary-row">
      <span className="plan-result-info-label">
        선수금 외 필요한 예상 금액
      </span>
                        <span className="purchase-plan-summary-highlight">
        약 {formatWon(remainingRequiredAmount)}
      </span>
                    </div>
                </div>
            </div>

            <div className="purchase-cost-notice">
                실제 등록 비용은 차량 종류, 거주 지역, 세제 감면 여부 등에 따라
                달라질 수 있어요. 차곡카의 계산 결과는 구매 계획을 위한 참고용
                예상 금액이에요.
            </div>

            <Button variant="secondary" onClick={() => navigate("/plan-result")}>
                계획으로 돌아가기
            </Button>

            {activeSheet === "acquisitionTax" && (
                <BottomSheet title="예상 취득세" onClose={() => setActiveSheet(null)}>
                    <p className="bottom-sheet-text">
                        일반 개인이 비영업용 차량을 구매하는 경우를 기준으로 계산한
                        예상 취득세예요. 비영업용 승용차의 취득세율을 기준으로 계산하며,
                        전기차는 2026년 적용되는 취득세 감면 한도를 반영해요.
                        국가유공자·장애인 등 개인별 감면 조건은 반영하지 않아요.
                        실제 금액은 차량 조건과 등록 시점의 정책에 따라 달라질 수 있어요.
                    </p>
                    <Button onClick={() => setActiveSheet(null)}>확인</Button>
                </BottomSheet>
            )}

            {activeSheet === "bondCost" && (
                <BottomSheet
                    title="예상 공채 할인 비용"
                    onClose={() => setActiveSheet(null)}
                >
                    <p className="bottom-sheet-text">
                        지역공채 비용은 등록 지역({regionName})을 기준으로 계산한
                        예상 금액이에요. 즉시매도(공채 할인) 기준으로 계산했으며,
                        실제 할인율은 등록 지역과 시점에 따라 달라질 수 있어요.
                        증지·인지, 번호판 발급 등의 비용은 이 계산에 포함하지 않았어요.
                    </p>
                    <Button onClick={() => setActiveSheet(null)}>확인</Button>
                </BottomSheet>
            )}
        </PageLayout>
    );
}