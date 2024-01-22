import React, { useEffect, useState, useSyncExternalStore } from "react";
import Popup from "../../Components/Popup";
import "./Saving.css";
import submit from "../../images/submit.png";
import draft from "../../images/draft.png";
import Navbar from "../../Components/Navbar/Navbar";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { useNavigate, useLocation, useParams } from "react-router-dom";

export default function Saving() {
  const savedId = useParams().id;
  const savedIdea = useParams().idea;
  const savedPlan = useParams().plan;
  const savedResources = useParams().resources;
  const savedSavings = useParams().savings;
  const savedplanTime = useParams().planTime;
  const savedfilename = useParams().file;
  const [id, setId] = useState();
  const [idea, setIdea] = useState(savedIdea);
  const [plan, setPlan] = useState(savedPlan);
  const [resources, setResources] = useState(savedResources);
  const [savings, setSavings] = useState(savedSavings);
  const [auth, setAuth] = useAuth();
  const [isEditingDraft, setIsEditingDraft] = useState(false);

  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showDraftModal, setShowDraftModal] = useState(false);
  const [selectedCheckbox, setSelectedCheckbox] = useState(savedplanTime);
  const [selectedFile, setSelectedFile] = useState();
  const locationObj = useLocation();
  const searchParams = new URLSearchParams(locationObj.search);
  const department = searchParams.get("department");
  const location = searchParams.get("location");

  const handleFileRemove = () => {
    setSelectedFile(null);
  };

  const handleCloseSubmitModal = () => {
    setShowSubmitModal(false);
  };

  const handleCloseDraftModal = () => {
    setShowDraftModal(false);
  };

  const handleShowDraftModal = () => {
    setShowDraftModal(true);
  };

  const handleCheckboxChange = (event) => {
    const { id } = event.target;
    setSelectedCheckbox(id);
  };


  console.log('selectedFile',selectedFile);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    console.log(file);
  };

  // handling form submit

  const navigate = useNavigate();

  useEffect(() => {
    if (idea || plan || resources || savings || selectedFile) {
      setIsEditingDraft(true);
    }
    // handleFile();
    console.log(idea, plan, resources, savings, isEditingDraft, selectedFile);
  }, [savedIdea, savedPlan, savedResources, savedSavings]);

  console.log(isEditingDraft);

  const handleDraft = async (e) => {
    e.preventDefault();

    try {
      setShowDraftModal(true);
      const ideaData = new FormData();

      ideaData.append("idea", idea);
      ideaData.append("implementation", plan);
      ideaData.append("resources", resources);
      ideaData.append("user", auth.user._id);
      ideaData.append("cost", savings);
      ideaData.append("ideaStatus", "Draft");
      ideaData.append("planTime", selectedCheckbox);
      ideaData.append("department", department);
      ideaData.append("location", location);
      ideaData.append("file", selectedFile);

      const ideaData1 = new FormData();

      ideaData1.append("idea", idea);
      ideaData1.append("implementation", plan);
      ideaData1.append("resources", resources);
      ideaData1.append("ideaStatus", "Draft");
      ideaData1.append("cost", savings);
      ideaData1.append("planTime", selectedCheckbox);
      if (selectedFile) {
        ideaData1.append("file", selectedFile);
      }

      if (isEditingDraft) {
        console.log(isEditingDraft, savedId);

        var { data } = axios.put(
          `http://connect.daldafoods.com:75/api/ideas/update-idea/${savedId}`,
          ideaData1
        );
      } else {
        var { data } = axios.post(
          "http://connect.daldafoods.com:75/api/ideas/create-idea",
          ideaData
        );
      }

     navigate("/idealstatus");
    } catch (error) {
      console.log("Something is wrong in creating Ideas");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const ideaData = new FormData();

      ideaData.append("idea", idea);
      ideaData.append("implementation", plan);
      ideaData.append("resources", resources);
      ideaData.append("user", auth.user._id);
      ideaData.append("cost", savings);
      ideaData.append("planTime", selectedCheckbox);
      ideaData.append("department", department);
      ideaData.append("location", location);
      ideaData.append("file", selectedFile);

      const ideaData1 = new FormData();

      ideaData1.append("idea", idea);
      ideaData1.append("implementation", plan);
      ideaData1.append("resources", resources);
      ideaData1.append("ideaStatus", "Published");
      ideaData1.append("cost", savings);
      ideaData1.append("planTime", selectedCheckbox);
      if (savedfilename === "undefined" || savedfilename === null) {
        ideaData1.append("file", selectedFile);
      }

      if (isEditingDraft) {
        console.log(isEditingDraft, savedId);
        var { data } = axios.put(
          `http://connect.daldafoods.com:75/api/ideas/update-idea/${savedId}`,
          ideaData1
        );
      } else {
        var { data } = axios.post(
          "http://connect.daldafoods.com:75/api/ideas/create-idea",
          ideaData
        );
      }

      if (data?.success) {
        console.log(data?.message);
      } else {
        console.log("Idea Posted Successfully");
        navigate("/idealstatus");
      }
    } catch (error) {
      console.log("Something is wrong in creating Ideas");
    }
  };

  return (
    <div className="container">
      <Navbar />
      <div className="upperSection">
        <h1>
          Portal For
          <br /> <span>Cost Savings Plan</span>
        </h1>
      </div>
      <div className="main">
        <h1>Idea</h1>
        <textarea
          onChange={(e) => setIdea(e.target.value)}
          value={idea}
          placeholder="For Instance: To try to create a paperless environment in my Dept."
        />

        <h1>Implementation Plan</h1>
        <textarea
          onChange={(e) => setPlan(e.target.value)}
          value={plan}
          placeholder="For Instance: To maintain softcopy of every document including booklets"
        />

        <h1>Resources Required</h1>
        <textarea
          onChange={(e) => setResources(e.target.value)}
          value={resources}
          placeholder="Need support of team members and brief session with the team to highlight the importance"
        />

        <textarea
          onChange={(e) => setSavings(e.target.value)}
          value={savings}
          placeholder="Estimated Savings in PKR"
          className="estimate"
        />

        <div className="checkbox">
          <div className="checkboxInner">
            <label htmlFor="One Time">One Time</label>
            <input
              type="checkbox"
              id="One Time"
              name="myCheckbox"
              checked={selectedCheckbox === "One Time"}
              onChange={handleCheckboxChange}
            />
          </div>
          <div className="checkboxInner">
            <label htmlFor="Recurring">Recurring</label>
            <input
              type="checkbox"
              id="Recurring"
              name="myCheckbox"
              checked={selectedCheckbox === "Recurring"}
              onChange={handleCheckboxChange}
            />
          </div>
        </div>

        <div className="attachment">
          <label htmlFor="attachmentInput">
            Add an attachment{" "}
            <i className="fa fa-paperclip" aria-hidden="true"></i>
          </label>
          <input
            id="attachmentInput"
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          {selectedFile && (
            <div className="file">
              <p>{selectedFile.name}</p>
              <i
                className="fa fa-times"
                aria-hidden="true"
                onClick={handleFileRemove}
              ></i>
            </div>
          )}
        </div>

        <div className="btn_action">
          <button onClick={handleSubmit} className="submit">
            Submit
          </button>

          <div>
            <Popup
              show={showSubmitModal}
              handleClose={handleCloseSubmitModal}
              title="Successfully Submit"
              children="Thank You for using Dalda portal for cost-saving. Your application is in process and you will receive updates about your request on your registered email."
              closeButtonLabel="Cancel"
              primaryButtonLabel="Done"
              image={submit}
            />
          </div>

          <button onClick={handleDraft} className="draft">
            Draft
          </button>
          <div>
            <Popup
              show={showDraftModal}
              handleClose={handleCloseDraftModal}
              title="Your Idea has been saved as a draft"
              children="Your Idea has been saved as a draft"
              closeButtonLabel="Cancel"
              primaryButtonLabel="Done"
              image={draft}
            />
          </div>

          <button className="cancel">Cancel</button>
        </div>
      </div>
    </div>
  );
}
