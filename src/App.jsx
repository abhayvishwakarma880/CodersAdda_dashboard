import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { DataProvider } from "./context/DataContext";
import Dashboard from "./dashboard/Dashboard";
import Home from "./pages/Home";
import Login from "./Login";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppRoute } from "./routes/AppRoute";

const App = () => {
  return (
    <ThemeProvider>
      <DataProvider>
        <>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<Home />} />
              <Route path="home" element={<Home />} />
              {AppRoute.map((l,i)=>{
                const Com = l.component;
                return <Route path={l.path} element={<Com />} />
              })}
            </Route>
          </Routes>
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />
        </>
      </DataProvider>
    </ThemeProvider>
  );
};

export default App;
