import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Vehicle, PlanState } from "../types";

interface PlanContextType extends PlanState {
    setSelectedVehicle: (vehicle: Vehicle) => void;
    setTargetDownPayment: (amount: number) => void;
    setCurrentSavings: (amount: number) => void;
    setTargetMonths: (months: number) => void;
    resetPlan: () => void;
}

const initialState: PlanState = {
    selectedVehicle: null,
    targetDownPayment: 0,
    currentSavings: 0,
    targetMonths: 0,
};

const STORAGE_KEY = "chagokcar-plan";

const PlanContext = createContext<PlanContextType | undefined>(undefined);

function getInitialState(): PlanState {
    const savedPlan = localStorage.getItem(STORAGE_KEY);

    if (!savedPlan) {
        return initialState;
    }

    try {
        return JSON.parse(savedPlan) as PlanState;
    } catch {
        return initialState;
    }
}

export function PlanProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<PlanState>(getInitialState);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }, [state]);

    const setSelectedVehicle = (vehicle: Vehicle) =>
        setState((prev) => ({ ...prev, selectedVehicle: vehicle }));

    const setTargetDownPayment = (amount: number) =>
        setState((prev) => ({ ...prev, targetDownPayment: amount }));

    const setCurrentSavings = (amount: number) =>
        setState((prev) => ({ ...prev, currentSavings: amount }));

    const setTargetMonths = (months: number) =>
        setState((prev) => ({ ...prev, targetMonths: months }));

    const resetPlan = () => {
        setState(initialState);
    };

    return (
        <PlanContext.Provider
            value={{
                ...state,
                setSelectedVehicle,
                setTargetDownPayment,
                setCurrentSavings,
                setTargetMonths,
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
