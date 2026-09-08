import { useParams, useNavigate } from "react-router-dom";
import { vehicles } from "../data/vehicles";
import { usePlan } from "../context/PlanContext";
import { useEffect } from "react";

export default function VehicleDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { setSelectedVehicle } = usePlan();

    const vehicle = vehicles.find((v) => v.id === id);

    useEffect(() => {
        if (vehicle) {
            setSelectedVehicle(vehicle);
        }
    }, [vehicle]);

    if (!vehicle) {
        return <div style={{ padding: 24 }}>차량 정보를 찾을 수 없어요.</div>;
    }

    return (
        <div style={{ padding: 24 }}>
            <h1>차량 상세</h1>
            <img src={vehicle.image} alt={vehicle.name} width={200} />
            <h2>{vehicle.name}</h2>
            <p>기준 차량 가격: {vehicle.price.toLocaleString()}원</p>
            <button onClick={() => navigate("/goal-setting")}>
                이 차량으로 계획 세우기
            </button>
        </div>
    );
}