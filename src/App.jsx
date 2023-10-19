import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";
import DefaultLayout from "./Layout/DefaultLayout/DefaultLayout";
import AddAccount from "./Pages/AddAccount/AddAccount";
import Stock from "./Pages/Stock/Stock";
import Dispense from "./Pages/Stock/Dispense/Dispense";
import NewOrder from "./Pages/Stock/NewOrder/NewOrder";
import Medicine from "./Pages/Stock/Medicine/Medicine";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Page404 from "./Pages/Page404/Page404";
import AddMedicine from "./Pages/Stock/Medicine/AddMedicine/AddMedicine";

function App() {
  const {user} = useContext(AuthContext)
  return (
    <>
    <Routes>
      <Route path='/login' element={!user ? <Login /> : <Navigate to='/'/> } />
      <Route path='/' element={user ? <DefaultLayout /> : <Navigate to='/login' />}>
        <Route index element={user ? <Dashboard /> : <Navigate to='/login' /> } />
        <Route path='stock' element={user ? <Dashboard /> : <Navigate to='/login' /> } />
        <Route path='patients' element={user ? <Dashboard /> : <Navigate to='/login' /> } />
        <Route path='reports' element={user ? <Dashboard /> : <Navigate to='/login' /> } />
        <Route path='add-new-account' element={user ? <AddAccount /> : <Navigate to='/login' /> } />
        <Route path='*' element={user ? <Page404/> : <Navigate to='/login' /> } />
      </Route>
      <Route path='/stock' element={user ? <DefaultLayout /> : <Navigate to='/login' />}>
        <Route index element={user ? <Stock /> : <Navigate to='/login' />} />
        <Route path='medicine-dispense' element={user ? <Dispense /> : <Navigate to='/login' />}/>
        <Route path='new-order' element={user ? <NewOrder /> : <Navigate to='/login' />} />
        </Route>
        <Route path='/stock/medicines' element={user ? <DefaultLayout /> : <Navigate to='/login' />}>
          <Route index element={user ? <Medicine /> : <Navigate to='/login' />} />
          <Route path='add-medicine' element={user ? <AddMedicine /> : <Navigate to='/login' />} />
        </Route>
    </Routes>
    </>
  );
}

export default App;
