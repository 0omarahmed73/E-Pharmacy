import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";
import DefaultLayout from "./Layout/DefaultLayout/DefaultLayout";
import AddAccount from "./Pages/AddAccount/AddAccount";
import Stock from "./Pages/Stock/Stock";
import Dispense from "./Pages/Stock/Dispense/Dispense";

function App() {
  return (
    <>
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<DefaultLayout />}>
        <Route index element={<Dashboard />} />
        <Route path='stock' element={<Dashboard />} />
        <Route path='patients' element={<Dashboard />} />
        <Route path='reports' element={<Dashboard />} />
        <Route path='add-new-account' element={<AddAccount />} />
      </Route>
      <Route path='/stock' element={<DefaultLayout />}>
        <Route index element={<Stock />} />
        <Route path='medicine-dispense' element={<Dispense />} />
        </Route>
    </Routes>
    </>
  );
}

export default App;
