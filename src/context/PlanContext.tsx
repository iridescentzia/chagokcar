import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import type { ReactNode } from "react";
import type { Vehicle } from "../types/vehicle";
import type {
    PlanMethod,
    PlanState,
} from "../types/plan";
import type { Region } from "../types/registration";

interface PlanContextType extends PlanState {
    setSelectedVehicle: (vehicle: Vehicle) => void;
    setVehicleAndReset: (vehicle: Vehicle) => void;
    setExpectedPurchasePrice: (price: number) => void;
    setRegistrationRegion: (region: Region | null) => void;
    setTargetDownPayment: (amount: number) => void;
    setCurrentSavings: (amount: number) => void;
    setPlanMethod: (method: PlanMethod | null) => void;
    setTargetMonths: (months: number) => void;
    setMonthlySavings: (amount: number) => void;
    resetPlan: () => void;
}

const initialState: PlanState = {
    selectedVehicle: null,
    expectedPurchasePrice: 0,
    registrationRegion: null,
    targetDownPayment: 0,
    currentSavings: 0,
    planMethod: null,
    targetMonths: 0,
    monthlySavings: 0,
};

const STORAGE_KEY = "chagokcar-plan-v2";

const PlanContext =
    createContext<PlanContextType | undefined>(undefined);

function getInitialState(): PlanState {
    const savedPlan = localStorage.getItem(STORAGE_KEY);

    if (!savedPlan) {
        return initialState;
    }

    try {
        const parsed = JSON.parse(savedPlan) as Partial<PlanState>;

        return {
            ...initialState,
            ...parsed,
        };
    } catch {
        return initialState;
    }
}

export function PlanProvider({
                                 children,
                             }: {
    children: ReactNode;
}) {
    const [state, setState] =
        useState<PlanState>(getInitialState);

    useEffect(() => {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(state)
        );
    }, [state]);

    const setSelectedVehicle = (vehicle: Vehicle) =>
        setState((prev) => ({
            ...prev,
            selectedVehicle: vehicle,
        }));

    const setVehicleAndReset = (vehicle: Vehicle) =>
        setState((prev) => {
            if (prev.selectedVehicle?.id === vehicle.id) {
                return {
                    ...prev,
                    selectedVehicle: vehicle,
                };
            }

            return {
                ...initialState,
                selectedVehicle: vehicle,
                expectedPurchasePrice: vehicle.price,
            };
        });

    const setExpectedPurchasePrice = (price: number) =>
        setState((prev) => ({
            ...prev,
            expectedPurchasePrice: price,
        }));

    const setRegistrationRegion = (
        region: Region | null
    ) =>
        setState((prev) => ({
            ...prev,
            registrationRegion: region,
        }));

    const setTargetDownPayment = (amount: number) =>
        setState((prev) => ({
            ...prev,
            targetDownPayment: amount,
        }));

    const setCurrentSavings = (amount: number) =>
        setState((prev) => ({
            ...prev,
            currentSavings: amount,
        }));

    const setPlanMethod = (
        method: PlanMethod | null
    ) =>
        setState((prev) => ({
            ...prev,
            planMethod: method,
        }));

    const setTargetMonths = (months: number) =>
        setState((prev) => ({
            ...prev,
            targetMonths: months,
        }));

    const setMonthlySavings = (amount: number) =>
        setState((prev) => ({
            ...prev,
            monthlySavings: amount,
        }));

    const resetPlan = () => {
        setState(initialState);
    };

    return (
        <PlanContext.Provider
            value={{
                ...state,
                setSelectedVehicle,
                setVehicleAndReset,
                setExpectedPurchasePrice,
                setRegistrationRegion,
                setTargetDownPayment,
                setCurrentSavings,
                setPlanMethod,
                setTargetMonths,
                setMonthlySavings,
                resetPlan,
            }}
        >
            {children}
        </PlanContext.Provider>
    );
}

export function usePlan() {
    const context = useContext(PlanContext);

    if (!context) {
        throw new Error(
            "usePlan은 PlanProvider 내부에서만 사용할 수 있습니다."
        );
    }

    return context;
}