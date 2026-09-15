export type FuelType =
    | "gasoline"
    | "diesel"
    | "hybrid"
    | "electric";

export type BondCategory =

    | "general"
    | "multipurpose"
    | "sevenToTenSeat";

export interface Vehicle {
    id: string;
    name: string;
    price: number;
    image: string;

    fuelType: FuelType;
    displacement: number | null;
    powertrain: string;

    // 공채 계산용 차량 분류
    bondCategory: BondCategory;
}