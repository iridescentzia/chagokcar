import {BrowserRouter, Routes, Route} from "react-router-dom";
import Splash from "./pages/Splash";
import Onboarding from "./pages/Onboarding";
import VehicleSelect from "./pages/VehicleSelect";
import VehicleSearch from "./pages/VehicleSearch";
import VehicleDetail from "./pages/VehicleDetail";
import Complete from "./pages/Complete"
import PurchasePrice from "./pages/PurchasePrice";
import DownPayment from "./pages/DownPayment";
import PlanMethod from "./pages/PlanMethod.tsx"
import PlanResult from "./pages/PlanResult.tsx"
import PurchaseCost from "./pages/PurchaseCost.tsx"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Splash/>}/>
                <Route path="/onboarding" element={<Onboarding/>}/>
                <Route path="/vehicle-select" element={<VehicleSelect/>}/>
                <Route path="/vehicle-search" element={<VehicleSearch/>}/>
                <Route path="/vehicles/:id" element={<VehicleDetail/>}/>
                <Route path="/complete" element={<Complete/>}/>
                <Route path="/purchase-price" element={<PurchasePrice/>}/>
                <Route path="/down-payment" element={<DownPayment/>}/>
                <Route path="/plan-method" element={<PlanMethod/>}/>
                <Route path="/plan-result" element={<PlanResult/>}/>
                <Route path="/purchase-cost" element={<PurchaseCost/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
