import type { Vehicle } from "../types/vehicle";
import type { Region } from "../types/registration";
import { calculateAcquisitionTax } from "./calculateAcquisitionTax";
import { calculateBondCost } from "./calculateBondCost";

interface CalculatePurchaseCostParams {
    expectedPurchasePrice: number;
    vehicle: Vehicle;
    region: Region;
    bondDiscountRate: number;
}

export interface PurchaseCostResult {
    acquisitionTax: number;
    bondCost: number;
    totalAdditionalCost: number;
    totalPurchaseCost: number;
}

export const calculatePurchaseCost = ({
                                          expectedPurchasePrice,
                                          vehicle,
                                          region,
                                          bondDiscountRate,
                                      }: CalculatePurchaseCostParams): PurchaseCostResult => {
    if (expectedPurchasePrice <= 0) {
        return {
            acquisitionTax: 0,
            bondCost: 0,
            totalAdditionalCost: 0,
            totalPurchaseCost: 0,
        };
    }

    const acquisitionTax = calculateAcquisitionTax({
        expectedPurchasePrice,
        fuelType: vehicle.fuelType,
    });

    const bondCost = calculateBondCost({
        expectedPurchasePrice,
        region,
        fuelType: vehicle.fuelType,
        displacement: vehicle.displacement,
        bondCategory: vehicle.bondCategory,
        discountRate: bondDiscountRate,
    });

    const totalAdditionalCost =
        acquisitionTax + bondCost;

    const totalPurchaseCost =
        expectedPurchasePrice + totalAdditionalCost;

    return {
        acquisitionTax,
        bondCost,
        totalAdditionalCost,
        totalPurchaseCost,
    };
};