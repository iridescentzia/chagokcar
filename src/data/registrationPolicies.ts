import type { Region } from "../types/registration";

/**
 * 차곡카 V2 - 2026년 차량 등록비용 정책
 *
 * 계산 기준
 * - 일반 개인
 * - 비영업용 차량
 * - 신차 신규등록
 * - 구매 준비를 위한 예상 비용
 *
 * 계산 제외
 * - 장애인, 국가유공자, 다자녀 등 개인별 감면
 * - 영업용 차량
 * - 법인 / 리스 등 별도 등록 조건
 * - 중고차 이전등록
 * - 모든 지자체별 세부 예외의 완전한 재현
 *
 * 실제 등록비용은 차량 조건, 등록 지역, 등록 시점,
 * 공채 할인율 및 정책 변경에 따라 달라질 수 있다.
 */


/* =========================
   1. 취득세
========================= */

export const ACQUISITION_TAX_POLICY_2026 = {
    // 일반 비영업용 승용자동차
    passengerRate: 0.07,

    // 전기자동차 취득세 감면
    electric: {
        reductionLimit: 1_400_000,
        expiresAt: "2026-12-31",
    },
} as const;


/* =========================
   2. 지역별 기본 공채 매입률
========================= */

/**
 * 비영업용 일반 승용자동차 신규등록 기준의
 * 대표적인 배기량별 공채 매입률
 *
 * 0 = 공채 매입 면제
 */

export interface BondRateByDisplacement {
    under1600: number;
    under2000: number;
    over2000: number;
}

export const BOND_RATES_2026: Record<
    Region,
    BondRateByDisplacement
> = {
    seoul: {
        under1600: 0,
        under2000: 0.12,
        over2000: 0.20,
    },

    busan: {
        under1600: 0,
        under2000: 0,
        over2000: 0,
    },

    daegu: {
        under1600: 0,
        under2000: 0,
        over2000: 0.05,
    },

    incheon: {
        under1600: 0,
        under2000: 0,
        over2000: 0.05,
    },

    gwangju: {
        under1600: 0,
        under2000: 0.04,
        over2000: 0.05,
    },

    daejeon: {
        under1600: 0,
        under2000: 0.04,
        over2000: 0.05,
    },

    ulsan: {
        under1600: 0,
        under2000: 0.08,
        over2000: 0.12,
    },

    sejong: {
        under1600: 0,
        under2000: 0.08,
        over2000: 0.12,
    },

    gyeonggi: {
        under1600: 0,
        under2000: 0.08,
        over2000: 0.12,
    },

    gangwon: {
        under1600: 0,
        under2000: 0.08,
        over2000: 0.12,
    },

    chungbuk: {
        under1600: 0,
        under2000: 0.08,
        over2000: 0.12,
    },

    chungnam: {
        under1600: 0,
        under2000: 0.04,
        over2000: 0.05,
    },

    jeonbuk: {
        under1600: 0,
        under2000: 0.04,
        over2000: 0.05,
    },

    jeonnam: {
        under1600: 0,
        under2000: 0.06,
        over2000: 0.10,
    },

    gyeongbuk: {
        under1600: 0,
        under2000: 0.04,
        over2000: 0.08,
    },

    gyeongnam: {
        under1600: 0,
        under2000: 0,
        over2000: 0,
    },

    jeju: {
        under1600: 0,
        under2000: 0.04,
        over2000: 0.05,
    },
};


/* =========================
   3. MVP 공채 예외 정책
========================= */

/**
 * 차곡카 V2에서 명확하게 반영하기로 한
 * 2026년 주요 공채 예외만 관리한다.
 *
 * 모든 지자체 조례의 세부 예외를
 * 완전히 재현하는 것을 목표로 하지 않는다.
 */

export const BOND_EXEMPTIONS_2026 = {
    // 부산: V2 계산 범위의 신차 신규등록 면제
    busan: {
        allNewPassengerVehicles: true,
        expiresAt: "2026-12-31",
    },

    // 인천: V2에서 반영하는 주요 차량 유형 면제
    incheon: {
        electric: true,
        multipurpose: true,
        sevenToTenSeat: true,
        hybridOver2000: true,
        expiresAt: "2026-12-31",
    },

    // 경기: 2026-07-01 이후
    // 1,600cc 초과 하이브리드는 일반 차량 요율 적용
    gyeonggi: {
        hybridUnderOrEqual1600Exempt: true,
        hybridGeneralRateOver1600: true,
        effectiveFrom: "2026-07-01",
    },

    // 경남: V2 계산 범위의 신차 신규등록 면제
    gyeongnam: {
        allNewPassengerVehicles: true,
    },
} as const;


/* =========================
   4. 공채 할인 계산 정책
========================= */

/**
 * 차곡카에서는 공채를 보유하는 '매입' 금액이 아니라
 * 매입 후 즉시 매도하는 '공채 할인' 기준의
 * 예상 사용자 부담액을 제공한다.
 *
 * 할인율은 등록 시점에 따라 변동되므로
 * 연간 고정 정책값으로 저장하지 않는다.
 */

export const BOND_DISCOUNT_POLICY_2026 = {
    calculationMethod: "immediateSale",
} as const;