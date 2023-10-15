import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminIndexScreen from "./screens/admin/IndexScreen";
import AdminDashboardIndexScreen from "./screens/admin/dashboard/IndexScreen";
import AdminAdminIndexScreen from "./screens/admin/admin/IndexScreen";
import AdminAdminCreateScreen from "./screens/admin/admin/CreateScreen";
import AdminAdminViewScreen from "./screens/admin/admin/ViewScreen";
import AdminAdminUpdateScreen from "./screens/admin/admin/UpdateScreen";
import AdminAdminResetPasswordScreen from "./screens/admin/admin/ResetPasswordScreen";
import AdminAdminRemoveScreen from "./screens/admin/admin/RemoveScreen";
import AdminCompanyIndexScreen from "./screens/admin/company/IndexScreen";
import AdminCompanyViewScreen from "./screens/admin/company/ViewScreen";
import AdminCompanyUpdateScreen from "./screens/admin/company/UpdateScreen";
import AdminCompanyResetPasswordScreen from "./screens/admin/company/ResetPasswordScreen";
import AdminCompanyRemoveScreen from "./screens/admin/company/RemoveScreen";

import CompanyIndexScreen from "./screens/company/IndexScreen";
import CompanyRegisterScreen from "./screens/company/RegisterScreen";
import CompanyDashboardIndexScreen from "./screens/company/dashboard/IndexScreen";
import CompanyJobPostIndexScreen from "./screens/company/job-post/IndexScreen";
import CompanyJobPostCreateScreen from "./screens/company/job-post/CreateScreen";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Outlet />}>
        <Route path="admin">
          <Route index element={<AdminIndexScreen />} />
          <Route path="dashboard" element={<AdminDashboardIndexScreen />} />
          <Route path="applications">
            <Route index element={null} />
            <Route path="application-view/:id" element={null} />
            <Route path="application-remove/:id" element={null} />
            <Route path="application-logs/:id" element={null} />
          </Route>
          <Route path="companies">
            <Route index element={<AdminCompanyIndexScreen />} />
            <Route path="view/:id" element={<AdminCompanyViewScreen />} />
            <Route path="update/:id" element={<AdminCompanyUpdateScreen />} />
            <Route
              path="reset-password/:id"
              element={<AdminCompanyResetPasswordScreen />}
            />
            <Route path="remove/:id" element={<AdminCompanyRemoveScreen />} />
            <Route path="logs/:id" element={null} />
          </Route>
          <Route path="students">
            <Route index element={null} />
            <Route path="view/:id" element={null} />
            <Route path="update/:id" element={null} />
            <Route path="reset-password/:id" element={null} />
            <Route path="remove/:id" element={null} />
            <Route path="logs/:id" element={null} />
          </Route>
          <Route path="admin">
            <Route index element={<AdminAdminIndexScreen />} />
            <Route path="create" element={<AdminAdminCreateScreen />} />
            <Route path="view/:id" element={<AdminAdminViewScreen />} />
            <Route path="update/:id" element={<AdminAdminUpdateScreen />} />
            <Route
              path="reset-password/:id"
              element={<AdminAdminResetPasswordScreen />}
            />
            <Route path="remove/:id" element={<AdminAdminRemoveScreen />} />
            <Route path="logs/:id" element={null} />
          </Route>
          <Route path="profile" element={null} />
        </Route>
        <Route path="company">
          <Route index element={<CompanyIndexScreen />} />
          <Route path="register" element={<CompanyRegisterScreen />} />
          <Route path="dashboard" element={<CompanyDashboardIndexScreen />} />
          <Route path="job-posts">
            <Route index element={<CompanyJobPostIndexScreen />} />
            <Route path="create" element={<CompanyJobPostCreateScreen />} />
            <Route path="view/:id" element={null} />
          </Route>
          <Route path="students">
            <Route index element={null} />
            <Route path="student-view/:id" element={null} />
          </Route>
          <Route path="profile" element={null} />
        </Route>
        <Route index element={null} />
        <Route path="home" element={null} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default App;
