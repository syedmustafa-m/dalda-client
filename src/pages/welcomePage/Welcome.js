import React, { useState } from "react";
import "./welcome.css";
import roundImg from "../../images/element.png";
import fam from "../../images/image8.png";
import Navbar from "../../Components/Navbar/Navbar";
import { Link } from "react-router-dom";

export default function Welcome() {
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);

  const handleCheckboxChange = (event) => {
    const { id } = event.target;
    setSelectedCheckbox(id);
  };

  return (
    <div className="container">
      <Navbar />
      <div className="upperSection">
        <h1>
          Welcome to the portal of <br /> <span>DFL cost saving</span>
        </h1>
      </div>

      <div className="checkBoxSection">
        <p>Please select one of the options</p>
        <div className="checkBoxSectionInner">
          <label htmlFor="newIdeaCheckbox">Add a new idea</label>
          <input
            type="checkbox"
            id="newIdeaCheckbox"
            name="ideaCheckbox"
            checked={selectedCheckbox === "newIdeaCheckbox"}
            onChange={handleCheckboxChange}
          />
        </div>

        <div className="checkBoxSectionInner">
          <label htmlFor="statusCheckbox">Check Status</label>
          <input
            type="checkbox"
            id="statusCheckbox"
            name="ideaCheckbox1"
            checked={selectedCheckbox === "statusCheckbox"}
            onChange={handleCheckboxChange}
          />
        </div>
      </div>

      <div className="nxt">
        <Link
          to={
            selectedCheckbox === "newIdeaCheckbox" ? "/depart" : "/idealstatus"
          }
        >
          <button>Next</button>
        </Link>{" "}
        <br />
      </div>

      <div className="round">
        <img src={roundImg} alt="Round" />
      </div>

      <img src={fam} id="fam" alt="Family" />
    </div>
  );
}
