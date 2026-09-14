export type FuelType =
    | "gasoline"
    | "diesel"
    | "hybrid"
    | "electric";

export interface Vehicle {
    id: string;
    name: string;
    price: number;
    image: string;

    fuelType: FuelType;
    displacement: number | null;
    powertrain: string;
}