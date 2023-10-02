import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"
function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true); // Set loading to true when navigating
    navigate("/datatable");
  };

  return (
    <div className="home-container">
      <h1 className="h1">BILLING APPLICATION</h1>
      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <button className="button-home" onClick={handleClick}>Get Started</button>
      )}
    </div>
  );
}

export default Home;
