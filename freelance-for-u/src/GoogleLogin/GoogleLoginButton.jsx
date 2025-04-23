import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/routesModel";

const GoogleLoginButton = () => {
  const navigate = useNavigate();

  const handleSuccess = async (response) => {
    try {
      const res = await axios.post(
        "http://localhost:5244/api/auth/google",
        { IdToken: response.credential }, // ✅ שליחה נכונה של הטוקן
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const token = res.data.token;
      localStorage.setItem("token", token);
      alert("Login successful!");
      navigate(ROUTES.ROOT);
    } catch (err) {
      console.error("Google login failed", err);
      alert("Google login failed");
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => {
        console.error("Google login failed");
        alert("Google login failed");
      }}
      useOneTap
    />
  );
};

export default GoogleLoginButton;
