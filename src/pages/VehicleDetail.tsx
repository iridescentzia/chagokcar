import { useParams, useNavigate } from "react-router-dom";
import { vehicles } from "../data/vehicles";
import { usePlan } from "../context/PlanContext";

export default function VehicleDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { setVehicleAndReset } = usePlan();

    const vehicle = vehicles.find((v) => v.id === id);

    if (!vehicle) {
        return (
            <div style={{ padding: 24 }}>
                차량 정보를 찾을 수 없어요.
            </div>
        );
    }

    const handleConfirm = () => {
        setVehicleAndReset(vehicle);
        navigate("/goal-setting");
    };

    return (
        <div style={{ padding: 24 }}>
            <h1>차량 상세</h1>

            <img
                src={vehicle.image}
                alt={vehicle.name}
                width={200}
            />

            <h2>{vehicle.name}</h2>

            <p>
                기준 차량 가격: {vehicle.price.toLocaleString()}원
            </p>

            <button onClick={handleConfirm}>
                이 차량으로 계획 세우기
            </button>
        </div>
    );
}