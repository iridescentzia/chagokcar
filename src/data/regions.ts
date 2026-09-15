import type { Region } from "../types/registration";

export interface RegionOption {
    id: Region;
    name: string;
}

export const REGIONS: RegionOption[] = [
    { id: "seoul", name: "서울" },
    { id: "busan", name: "부산" },
    { id: "daegu", name: "대구" },
    { id: "incheon", name: "인천" },
    { id: "gwangju", name: "광주" },
    { id: "daejeon", name: "대전" },
    { id: "ulsan", name: "울산" },
    { id: "sejong", name: "세종" },
    { id: "gyeonggi", name: "경기" },
    { id: "gangwon", name: "강원특별자치도" },
    { id: "chungbuk", name: "충북" },
    { id: "chungnam", name: "충남" },
    { id: "jeonbuk", name: "전북특별자치도" },
    { id: "jeonnam", name: "전남" },
    { id: "gyeongbuk", name: "경북" },
    { id: "gyeongnam", name: "경남" },
    { id: "jeju", name: "제주특별자치도" },
];