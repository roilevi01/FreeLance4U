import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import HomePage from "./components/pages/HomePage";
import ROUTES from "./routes/routesModel";
import Freelance4U from "./Freelance4U";
import ContactPage from "./components/pages/ContactPage";
import UserProfile from "./Users/components/UserProfile";
import JobCardStructure from "./components/pages/Cards/JobCardStructure";
import AdminBusinessCardsPage from "./components/pages/Cards/AdminBusinessCardsPage";
import CreateBusinessCardPage from "./components/pages/Cards/CreateBusinessCardPage";
import UserBusinessCardsPage from "./components/pages/Cards/UserBusinessCardsPage";
import EditCardPage from "./components/pages/Cards/EditCardPage";
import AboutUsPage from "./components/pages/PageAboutUs/components/AboutUsPage";
import AdminUserPage from "./Users/components/AdminUserPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.SIGNUP} element={<RegisterPage />} />

        <Route path={ROUTES.SIGNUP} element={<RegisterPage />} />

        <Route path={ROUTES.ROOT} element={<Freelance4U />} />
        <Route path={ROUTES.CONNECT} element={<ContactPage />} />
        <Route path={ROUTES.ABOUT} element={<AboutUsPage />} />
        <Route path={ROUTES.USER_PROFILE} element={<UserProfile />} />
        <Route path={ROUTES.JOBS} element={<JobCardStructure />} />
        <Route
          path={ROUTES.MANAGE_CARDS}
          element={<AdminBusinessCardsPage />}
        />
        <Route path={ROUTES.CREATE_CARD} element={<CreateBusinessCardPage />} />
        <Route path={ROUTES.USER_CARDS} element={<UserBusinessCardsPage />} />
        <Route path="/edit/:id" element={<EditCardPage />} />
        <Route path="/admin/users" element={<AdminUserPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
