import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/routesModel";
import { Box } from "@mui/material";

const GoogleLoginButton = () => {
  const navigate = useNavigate();

  const handleSuccess = async (response) => {
    try {
      const res = await axios.post(
        "https://localhost:7012/api/auth/google",
        { IdToken: response.credential },
        { headers: { "Content-Type": "application/json" } }
      );
      const token = res.data.token;
      localStorage.setItem("token", token);

      alert("Login successful!");
      navigate(ROUTES.ROOT);
    } catch (err) {
      alert("Google login failed");
    }
  };

  return (
    <Box
      sx={{
        p: "2px",
        borderRadius: 999,
        background:
          "linear-gradient(90deg, rgba(96,165,250,.9), rgba(167,139,250,.9), rgba(34,211,238,.9))",
        boxShadow: "0 12px 30px rgba(2,6,23,0.18)",
      }}
    >
      <Box
        sx={{
          px: 1.5,
          py: 1,
          borderRadius: 999,
          background:
            "linear-gradient(180deg, rgba(255,255,255,.95), rgba(255,255,255,.85))",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => {
            console.error("Google login failed");
            alert("Google login failed");
          }}
          theme="outline"
          shape="pill"
          size="large"
          text="continue_with"
          logo_alignment="center"
          width="280"
          useOneTap
        />
      </Box>
    </Box>
  );
};

export default GoogleLoginButton;
