import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <GoogleOAuthProvider clientId="441588337833-vkoqa5kkap9thi0iu9dadl059bojqq42.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
