import { Route, Routes } from "react-router-dom";
import LoginPage from "../../Users/LoginPage";
import ContactPage from "../../components/pages/ContactPage";

export default function Router() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/about" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}
