import { useNavigate } from "react-router-dom";
import { vehicles } from "../data/vehicles";
import { usePlan } from "../context/PlanContext";
import type { Vehicle } from "../types";

export default function VehicleSelect() {
    const navigate = useNavigate();
    const { setSelectedVehicle } = usePlan();

    const handleSelect = (vehicle: Vehicle) => {
        setSelectedVehicle(vehicle);
        navigate(`/vehicles/${vehicle.id}`);
    };

    return (
        <div style={{ padding: 24 }}>
            <h1>어떤 차량을 목표로 할까요?</h1>

            <button onClick={() => navigate("/vehicle-search")}>
                차량명을 검색해보세요
            </button>

            <ul style={{ listStyle: "none", padding: 0 }}>
                {vehicles.map((vehicle) => (
                    <li
                        key={vehicle.id}
                        onClick={() => handleSelect(vehicle)}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            padding: 12,
                            borderBottom: "1px solid #eee",
                            cursor: "pointer",
                        }}
                    >
                        <img
                            src={vehicle.image}
                            alt={vehicle.name}
                            width={48}
                            height={48}
                            style={{ objectFit: "contain" }}
                        />
                        <div>
                            <div>{vehicle.name}</div>
                            <div>{vehicle.price.toLocaleString()}원</div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}