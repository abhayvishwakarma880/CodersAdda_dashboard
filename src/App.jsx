
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { DataProvider } from "./context/DataContext";
import Dashboard from "./dashboard/Dashboard";
import Home from "./pages/Home";
import Login from "./Login";
import Category from "./pages/Category";
import Courses from "./pages/Courses";
import AddCourse from "./pages/AddCourse";
import EditCourse from "./pages/EditCourse";
import ViewCourse from "./pages/ViewCourse";
import Users from "./pages/Users";
import ViewUser from "./pages/ViewUser";
import EditUser from "./pages/EditUser";

const App = () => {
  return (
    <ThemeProvider>
      <DataProvider>
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<Home />} />
              <Route path="home" element={<Home />} />
              <Route path="users" element={<Users />} />
              <Route path="users/view/:id" element={<ViewUser />} />
              <Route path="users/edit/:id" element={<EditUser />} />
              <Route path="category" element={<Category />} />
              <Route path="courses" element={<Courses />} />
              <Route path="courses/add" element={<AddCourse />} />
              <Route path="courses/edit/:id" element={<EditCourse />} />
              <Route path="courses/view/:id" element={<ViewCourse />} />
            </Route>
          </Routes>
        </div>
      </DataProvider>
    </ThemeProvider>
  );
};

export default App;
