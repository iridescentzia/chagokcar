import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { vehicles } from "../data/vehicles";
import type { Vehicle } from "../types";

export default function VehicleSearch() {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");

    const filtered: Vehicle[] = keyword.trim()
        ? vehicles.filter((v) =>
            v.name.toLowerCase().includes(keyword.trim().toLowerCase())
        )
        : vehicles;

    const handleSelect = (vehicle: Vehicle) => {
        navigate(`/vehicles/${vehicle.id}`);
    };

    return (
        <div style={{ padding: 24 }}>
            <h1>원하는 차량을 검색해보세요.</h1>

            <input
                type="text"
                placeholder="차량명을 검색해주세요"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                style={{ width: "100%", padding: 12, marginBottom: 16 }}
            />

            {keyword.trim() && filtered.length === 0 ? (
                <p>검색 결과가 없어요. 다른 차량명으로 검색해보세요.</p>
            ) : (
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {filtered.map((vehicle) => (
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
            )}
        </div>
    );
}