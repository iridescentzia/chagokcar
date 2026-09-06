import { BrowserRouter, Routes, Route } from "react-router-dom";
import Splash from "./pages/Splash";
import Onboarding from "./pages/Onboarding";
import VehicleSelect from "./pages/VehicleSelect";
import VehicleSearch from "./pages/VehicleSearch";
import VehicleDetail from "./pages/VehicleDetail";
import GoalSetting from "./pages/GoalSetting";
import MonthlyPlan from "./pages/MonthlyPlan";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/vehicle-select" element={<VehicleSelect />} />
          <Route path="/vehicle-search" element={<VehicleSearch />} />
          <Route path="/vehicle-detail" element={<VehicleDetail />} />
          <Route path="/goal-setting" element={<GoalSetting />} />
          <Route path="/monthly-plan" element={<MonthlyPlan />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
