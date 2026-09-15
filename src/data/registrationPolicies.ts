import type { Region } from "../types/registration";

/**
 * 차곡카 V2 - 2026년 차량 등록비용 정책
 *
 * 계산 대상
 * - 일반 개인
 * - 비영업용 승용자동차
 * - 신차 신규등록
 * - vehicles.ts에 지정한 대표 파워트레인 기준
 *
 * 계산 제외
 * - 장애인, 국가유공자, 다자녀 등 개인별 감면
 * - 영업용 차량
 * - 법인/리스 등 별도 등록 조건
 * - 중고차 이전등록
 */


// ======================================================
// 1. 취득세 정책
// ======================================================

export const ACQUISITION_TAX_POLICY_2026 = {
    /**
     * 일반 비영업용 승용자동차 취득세율
     */
    passengerRate: 0.07,

    /**
     * 전기자동차 취득세 감면
     * 2026-12-31까지 최대 140만원
     */
    electric: {
        reductionLimit: 1_400_000,
        expiresAt: "2026-12-31",
    },
} as const;


// ======================================================
// 2. 지역별 기본 공채 매입률
// ======================================================

export interface BondRateByDisplacement {
    under1600: number;
    under2000: number;
    over2000: number;
}

/**
 * 비영업용 일반 승용자동차 신규등록 기준
 *
 * under1600 : 1,600cc 미만
 * under2000 : 1,600cc 이상 ~ 2,000cc 미만
 * over2000  : 2,000cc 이상
 *
 * 0 = 매입 면제
 *
 * 주의:
 * 친환경차, 다목적형, 7~10인승 등
 * 별도 정책이 존재하는 경우 아래 예외 정책을 우선 적용한다.
 */
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


// ======================================================
// 3. 2026년 공채 예외 정책
// ======================================================

/**
 * 기본 공채 매입률보다 우선 적용되는
 * 2026년 한시/차종별 정책.
 *
 * 여기서는 "계산에 필요한 정책 데이터"만 저장하고,
 * 실제 판단은 calculateBondCost.ts에서 수행한다.
 */
export const BOND_EXEMPTIONS_2026 = {
    /**
     * 부산
     * 비사업용 자동차 신규등록 공채 매입 면제
     * 2026-12-31까지
     */
    busan: {
        allNewPassengerVehicles: true,
        expiresAt: "2026-12-31",
    },

    /**
     * 인천
     *
     * 2026년 신규등록 기준
     * - 1,600cc 이상 ~ 2,000cc 미만: 면제
     * - 2,000cc 이상 일반형: 기본 5%
     * - 2,000cc 이상 하이브리드: 면제
     * - 다목적형: 면제
     * - 전기자동차: 면제
     * - 7~10인승: 면제
     */
    incheon: {
        electric: true,
        multipurpose: true,
        sevenToTenSeat: true,
        hybridOver2000: true,
        expiresAt: "2026-12-31",
    },

    /**
     * 경기
     *
     * 2026-07-01부터
     * 1,600cc 초과 하이브리드는
     * 일반 내연기관 차량과 동일한 공채 매입률 적용.
     *
     * 1,600cc 이하는 계속 면제.
     */
    gyeonggi: {
        hybridGeneralRateOver1600: true,
        effectiveFrom: "2026-07-01",
    },

    /**
     * 경남
     * 차곡카 V2 신규등록 계산에서는 면제 처리
     */
    gyeongnam: {
        allNewPassengerVehicles: true,
    },
} as const;


// ======================================================
// 4. 공채 할인 정책
// ======================================================

/**
 * 차곡카에서는 공채를 장기간 보유하는 매입 방식이 아니라
 * 일반 소비자가 차량 등록 과정에서 많이 사용하는
 * 즉시매도(공채 할인) 기준 예상 부담액을 제공한다.
 *
 * 공채 매입액
 * × 기준 할인율
 * = 예상 공채 할인 비용
 *
 * 할인율은 시장 상황 및 등록 시점에 따라 변동되므로
 * BOND_RATES_2026에 고정하지 않는다.
 */
export const BOND_DISCOUNT_POLICY_2026 = {
    calculationMethod: "immediateSale",
} as const;