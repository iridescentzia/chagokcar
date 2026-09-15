import type { FuelType } from "../types/vehicle";
import { ACQUISITION_TAX_POLICY_2026 } from "../data/registrationPolicies";

interface CalculateAcquisitionTaxParams {
    expectedPurchasePrice: number;
    fuelType: FuelType;
}

export const calculateAcquisitionTax = ({
                                            expectedPurchasePrice,
                                            fuelType,
                                        }: CalculateAcquisitionTaxParams): number => {
    if (expectedPurchasePrice <= 0) {
        return 0;
    }

    // 예상 구매 가격은 부가세 포함 금액이므로 공급가액으로 환산
    const taxBase = expectedPurchasePrice / 1.1;

    const acquisitionTax =
        taxBase * ACQUISITION_TAX_POLICY_2026.passengerRate;

    // 2026년 전기차 취득세 최대 140만 원 감면
    if (fuelType === "electric") {
        return Math.max(
            Math.floor(
                acquisitionTax -
                ACQUISITION_TAX_POLICY_2026.electric.reductionLimit
            ),
            0
        );
    }

    return Math.floor(acquisitionTax);
};