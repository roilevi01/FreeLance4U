import React from "react";
import NavBar from "../../../../Header/NavBar";
import FooterBar from "../../../../Footer/FooterBar";
import "../Styles/AboutUs.css";
import GridComponent from "./GridComponent";

export default function AboutUsPage() {
  return (
    <>
      <NavBar />
      <div className="about-us-page">
        <h1 className="page-title">About Us</h1>
        <GridComponent />
        <FooterBar />
      </div>
    </>
  );
}
