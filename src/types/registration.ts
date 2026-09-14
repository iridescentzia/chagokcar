export type Region =
    | "seoul"
    | "busan"
    | "daegu"
    | "incheon"
    | "gwangju"
    | "daejeon"
    | "ulsan"
    | "sejong"
    | "gyeonggi"
    | "gangwon"
    | "chungbuk"
    | "chungnam"
    | "jeonbuk"
    | "jeonnam"
    | "gyeongbuk"
    | "gyeongnam"
    | "jeju";

export interface RegistrationCostResult {
    acquisitionTax: number;
    bondCost: number;
    registrationFee: number;
    totalAdditionalCost: number;
}