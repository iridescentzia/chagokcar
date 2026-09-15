import type { BondCategory, FuelType } from "../types/vehicle";
import type { Region } from "../types/registration";
import {BOND_RATES_2026} from "../data/registrationPolicies";

interface CalculateBondCostParams {
    expectedPurchasePrice: number;
    region: Region;
    fuelType: FuelType;
    displacement: number | null;
    bondCategory: BondCategory;
    discountRate: number;
}

export const calculateBondCost = ({
                                      expectedPurchasePrice,
                                      region,
                                      fuelType,
                                      displacement,
                                      bondCategory,
                                      discountRate,
                                  }: CalculateBondCostParams): number => {
    if (expectedPurchasePrice <= 0 || discountRate <= 0) {
        return 0;
    }

    // 부산·경남은 차곡카 V2 계산 범위에서 신규등록 공채 면제
    if (region === "busan" || region === "gyeongnam") {
        return 0;
    }

    // 인천의 2026년 주요 면제 조건
    if (region === "incheon") {
        if (fuelType === "electric") {
            return 0;
        }

        if (
            bondCategory === "multipurpose" ||
            bondCategory === "sevenToTenSeat"
        ) {
            return 0;
        }

        if (
            fuelType === "hybrid" &&
            displacement !== null &&
            displacement >= 2000
        ) {
            return 0;
        }
    }

    // 경기: 2026-07-01 이후
    // 1,600cc 이하 하이브리드는 면제
    if (
        region === "gyeonggi" &&
        fuelType === "hybrid" &&
        displacement !== null &&
        displacement <= 1600
    ) {
        return 0;
    }

    /*
     * 전기차는 배기량이 없기 때문에
     * 현재 MVP의 일반 승용차 배기량 요율로 계산하지 않는다.
     *
     * 지역별 전기차 공채 정책 전체를 재현하지 않는
     * V2 정책 범위에 따라 0원으로 처리한다.
     */
    if (fuelType === "electric" || displacement === null) {
        return 0;
    }

    const regionalRates = BOND_RATES_2026[region];

    let bondRate = 0;

    if (displacement < 1600) {
        bondRate = regionalRates.under1600;
    } else if (displacement < 2000) {
        bondRate = regionalRates.under2000;
    } else {
        bondRate = regionalRates.over2000;
    }

    if (bondRate === 0) {
        return 0;
    }

    // 예상 구매 가격은 부가세 포함 금액이므로 공급가액으로 환산
    const taxBase = expectedPurchasePrice / 1.1;

    // 공채 매입액
    const bondPurchaseAmount = taxBase * bondRate;

    // 공채 즉시매도 기준 예상 할인비용
    const bondCost = bondPurchaseAmount * discountRate;

    return Math.floor(bondCost);
};