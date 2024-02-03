import React, { useEffect, useState } from "react";
import "./Amenities.css";
import Utilities from "./Utilities";
import TopHeader from "./TopHeader";
import SellPopup from "./SellPopup";

const Amenities = () => {
  const [selectedTab, setSelectedTab] = useState(""); // Set "Cycles" as the default tab
  const [isSellPopupOpen, setSellPopupOpen] = useState(false);

  useEffect(() => {
    // This code will run when the component mounts
    setSelectedTab('cycles');
    // <Utilities category={selectedTab} />
  }, []);

  const openSellPopup = () => {
    setSellPopupOpen(true);
  };

  const closeSellPopup = () => {
    setSellPopupOpen(false); 
  };

  return (
    <div className="amenities-container">
      <header className="App-header">
        <TopHeader />
      </header>
      <div className="amenities-content-container">
        <div className="amenities-tabs">
          <button
            className={`amenities-tab ${selectedTab === "cycles" ? "active" : "default"}`}
            onClick={() => setSelectedTab("cycles")}
            style={{ color: "black" }}
          >
            Cycles
          </button>
          <button
            className={`amenities-tab ${selectedTab === "mattresses" ? "active" : ""}`}
            onClick={() => setSelectedTab("mattresses")}
            style={{ color: "black" }}
          >
            Mattresses
          </button>
          <button
            className={`amenities-tab ${selectedTab === "electronics" ? "active" : ""}`}
            onClick={() => setSelectedTab("electronics")}
            style={{ color: "black" }}
          >
            Electronics
          </button>
          <button
            className={`amenities-tab ${selectedTab === "Others" ? "active" : ""}`}
            onClick={() => setSelectedTab("Others")}
            style={{ color: "black" }}
          >
            Others
          </button>

          <div className="sell-button">
            <button onClick={openSellPopup} style={{ color: "white", borderRadius: "25px", fontWeight: "bold" }}>
              SELL
            </button>
          </div>
        </div>
        <div className="amenities-content">
          <Utilities category={selectedTab} />
        </div>
      </div>

      {/* Sell Popup */}
      <SellPopup isOpen={isSellPopupOpen} onClose={closeSellPopup} />
    </div>
  );
};

export default Amenities;
