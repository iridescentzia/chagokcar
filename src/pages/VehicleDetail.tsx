import {useParams, useNavigate} from "react-router-dom";
import {vehicles} from "../data/vehicles";
import {usePlan} from "../context/PlanContext";
import Header from "../components/Header";
import Button from "../components/Button";
import ImageBox from "../components/ImageBox";
import PageLayout from "../components/PageLayout";
import {formatToManwon} from "../utils/format";

export default function VehicleDetail() {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const {setVehicleAndReset} = usePlan();

    const vehicle = vehicles.find((v) => v.id === id);

    if (!vehicle) {
        return (
            <PageLayout>
                <Header/>
                <p className="page-description">차량 정보를 찾을 수 없어요.</p>
            </PageLayout>
        );
    }

    const handleConfirm = () => {
        setVehicleAndReset(vehicle);
        navigate("/purchase-price");
    };

    return (
        <PageLayout>
            <Header/>
            <h1 className="page-title">차량 상세</h1>
            <p className="page-description">선택한 차량 정보를 확인해보세요.</p>

            <ImageBox>
                <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="vehicle-detail-image"
                />
                <h2 className="vehicle-detail-name">{vehicle.name}</h2>
                <div className="vehicle-detail-divider"/>
                <div className="vehicle-detail-price-row">
                    <span className="vehicle-detail-price-label">기준 차량 가격</span>
                    <span className="vehicle-detail-price-value">
            {formatToManwon(vehicle.price)}
          </span>
                </div>
            </ImageBox>

            <p className="vehicle-detail-notice">
                <span className="vehicle-detail-notice-emphasis">
                 현재 기준 차량 가격이에요.
                </span>
                <br/>
                트림·옵션 등에 따라 실제 구매 가격은 달라질 수 있어요.
            </p>

            <Button onClick={handleConfirm}>이 차량으로 계획 세우기</Button>
        </PageLayout>
    );
}