import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePlan } from "../context/PlanContext";
import { REGIONS } from "../data/regions";
import Header from "../components/Header";
import Button from "../components/Button";
import BottomSheet from "../components/BottomSheet";
import PageLayout from "../components/PageLayout";
import { formatNumberInput, parseNumberInput, formatWon } from "../utils/format";
import type { Region } from "../types/registration";

export default function PurchasePrice() {
    const navigate = useNavigate();
    const {
        selectedVehicle,
        expectedPurchasePrice,
        registrationRegion,
        setExpectedPurchasePrice,
        setRegistrationRegion,
    } = usePlan();

    const [priceInput, setPriceInput] = useState(
        expectedPurchasePrice
            ? formatNumberInput(String(expectedPurchasePrice))
            : ""
    );
    const [isRegionSheetOpen, setIsRegionSheetOpen] = useState(false);

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

    const currentPrice = parseNumberInput(priceInput);
    const isPriceChanged = currentPrice !== selectedVehicle.price;

    const handlePriceChange = (value: string) => {
        setPriceInput(formatNumberInput(value));
    };

    const handleResetPrice = () => {
        setPriceInput(formatNumberInput(String(selectedVehicle.price)));
    };

    const handleSelectRegion = (region: Region) => {
        setRegistrationRegion(region);
        setIsRegionSheetOpen(false);
    };

    const selectedRegionName = REGIONS.find(
        (r) => r.id === registrationRegion
    )?.name;

    const canProceed = currentPrice > 0 && registrationRegion !== null;

    const handleNext = () => {
        setExpectedPurchasePrice(currentPrice);
        navigate("/down-payment");
    };

    return (
        <PageLayout>
            <Header />
            <h1 className="page-title">
                구매를 예상하는
                <br />
                차량 가격을 알려주세요
            </h1>
            <p className="page-description">구매 계획을 계산할 기준 금액이에요.</p>

            <div className="purchase-price-vehicle-card">
                <span>{selectedVehicle.name}</span>
                <div className="purchase-price-vehicle-row">
                    <span className="goal-label">기준 차량 가격</span>
                    <span>{formatWon(selectedVehicle.price)}</span>
                </div>
            </div>

            <div className="goal-field">
                <div className="price-input-label-row">
                    <label className="purchase-price-field-label">예상 구매 가격</label>
                    {isPriceChanged && (
                        <button
                            type="button"
                            className="price-reset-link"
                            onClick={handleResetPrice}
                        >
                            기준 가격으로 되돌리기
                        </button>
                    )}
                </div>
                <div className="goal-input-wrapper">
                    <input
                        type="text"
                        inputMode="numeric"
                        value={priceInput}
                        onChange={(e) => handlePriceChange(e.target.value)}
                        className="goal-input"
                    />
                    <span className="goal-input-suffix">원</span>
                </div>
                <p className="price-input-notice">
                    {isPriceChanged ? (
                        <>
                        <span className="price-input-notice-emphasis">
                            기준 차량 가격은 {formatWon(selectedVehicle.price)}이에요.
                        </span>
                            <br />
                            입력한 예상 구매 가격을 기준으로 구매 계획을 계산해요.
                        </>
                    ) : (
                        <>
                        <span className="price-input-notice-emphasis">
                            기준 차량 가격을 입력해두었어요.
                        </span>
                            <br />
                            원하는 트림이나 옵션 등을 고려해 예상 금액을
                            <br />
                            수정할 수 있어요.
                        </>
                    )}
                </p>
            </div>

            <div className="goal-field">
                <label className="purchase-price-field-label">등록 예정 지역</label>
                <button
                    type="button"
                    className="region-select-button"
                    onClick={() => setIsRegionSheetOpen(true)}
                >
                    <span>{selectedRegionName ?? "지역을 선택해주세요"}</span>
                    <span className="region-select-chevron">›</span>
                </button>
                <p className="goal-field-caption">
                    등록 지역에 따라 공채 관련 비용이 달라질 수 있어요.
                </p>
            </div>

            <Button disabled={!canProceed} onClick={handleNext}>
                다음
            </Button>

            {isRegionSheetOpen && (
                <BottomSheet
                    title="등록 예정 지역을 선택해주세요"
                    description="차량을 등록할 지역을 기준으로 공채 비용을 계산해요."
                    onClose={() => setIsRegionSheetOpen(false)}
                >
                    <ul className="region-list">
                        {REGIONS.map((region) => (
                            <li key={region.id}>
                                <button
                                    type="button"
                                    className={`region-list-item ${
                                        registrationRegion === region.id
                                            ? "region-list-item-selected"
                                            : ""
                                    }`}
                                    onClick={() => handleSelectRegion(region.id)}
                                >
                                    {region.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </BottomSheet>
            )}
        </PageLayout>
    );
}