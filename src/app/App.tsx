import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { CalculationPage } from "../pages";
import { AppLayout } from "../widgets/AppLayout";

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<CalculationPage />} />
      </Route>
    </Routes>
  );
};

export default App;
