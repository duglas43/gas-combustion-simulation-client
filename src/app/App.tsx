import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { MainPage } from "../pages";
import { AppLayout } from "../widgets/app-layout";

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<MainPage />} />
      </Route>
    </Routes>
  );
};

export default App;
