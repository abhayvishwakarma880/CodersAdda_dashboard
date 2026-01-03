import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { DataProvider } from "./context/DataContext";
import { WebsiteDataProvider } from "./context/WebsiteDataContext";
import Dashboard from "./dashboard/Dashboard";
import Home from "./pages/Home";
import Login from "./Login";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppRoute } from "./routes/AppRoute";
import ScrollToTop from "./ScrollToTop";
import InstructorLogin from "./instructors/InstructorLogin";
import InstructorDashboard from "./instructors/layouts/InstructorDashboard";
import { InstructorRoute } from "./instructors/routes/InstructorRoute";

const App = () => {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <DataProvider>
        <WebsiteDataProvider>
          <>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />}>
                <Route index element={<Home />} />
                <Route path="home" element={<Home />} />
                {AppRoute.map((l,i)=>{
                  const Com = l.component;
                  return <Route key={i} path={l.path} element={<Com />} />
                })}
              </Route>

              <Route path="/instructor-login" element={<InstructorLogin />} />
              <Route path="/instructor-dashboard" element={<InstructorDashboard />}>
                {InstructorRoute.map((l,i)=>{
                  const Com = l.component;
                  return <Route key={i} path={l.path} element={<Com />} />
                })}
              </Route>
            </Routes>
            <ToastContainer position="top-center" autoClose={1000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />
          </>
        </WebsiteDataProvider>
      </DataProvider>
    </ThemeProvider>
  );
};

export default App;
