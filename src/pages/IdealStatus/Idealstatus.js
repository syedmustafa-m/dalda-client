import React, { useEffect, useState } from "react";
import "./Idealstatus.css";
import fam1 from "../../images/fam1.png";
import Popup from "../../Components/Popup";

import Navbar from "../../Components/Navbar/Navbar";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from "react-accessible-accordion";

// Demo styles, see 'Styles' section below for some notes on use.
import "react-accessible-accordion/dist/fancy-example.css";

export default function Idealstatus() {
    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [showDraftModal, setShowDraftModal] = useState(false);
    const [ideas, setIdeas] = useState([]);
    const [auth, setAuth] = useAuth();

    const [allUsers, setAllUsers] = useState([]);

    const navigate = useNavigate();

    //getting all Ideas by a single user
    const getAllIdeas = async () => {
        try {
            const { data } = await axios.get(
                `http://connect.daldafoods.com:75/api/ideas/idea-user/${auth.user.userid}`
            );
            setIdeas(data.ideas);
            console.log(data.ideas);
        } catch (error) {
            console.log("Somthing Went Wrong In getting Ideas");
        }
    };

    const getAllUserIdeas = async () => {
        try {
            const { data } = await axios.get(
                `http://connect.daldafoods.com:75/api/auth/users-managed/${parseInt(
                    auth.user.userid
                )}`
            );

            const users = data.users;

            // get all ideas for each user
            for (let i = 0; i < users.length; i++) {
                const { data } = await axios.get(
                    `http://connect.daldafoods.com:75/api/ideas/idea-user/${users[i].userid}`
                );
                users[i].ideas = data.ideas;
                // save all ideas in state
                // setAllUsers(users);
            }

            setAllUsers(users);
            console.log(users);

            // console.log(data.users
        } catch (error) {
            console.log("Somthing Went Wrong In getting Ideas");
        }
    };

    useEffect(() => {
        getAllIdeas();
        getAllUserIdeas();
    }, [allUsers]);

    const handleCloseSubmitModal = () => {
        setShowSubmitModal(false);
    };

    const handleCloseDraftModal = () => {
        setShowDraftModal(false);
    };

    const handleShowSubmitModal = () => {
        setShowSubmitModal(true);
    };

    const handleShowDraftModal = () => {
        setShowDraftModal(true);
    };

    const handleIdeaNavigate = (data) => {
        console.log(data);
        navigate(
            `/saving/${data._id}/${data.idea}/${data.implementation}/${data.resources}/${data.cost}/${data.planTime}/${data.file}`
        );
    };

    const handleApprove = (id) => {
        let data = JSON.stringify({
            status: "Approved",
        });

        let config = {
            method: "put",
            maxBodyLength: Infinity,
            url: `http://connect.daldafoods.com:75/api/ideas/update-status/${id}`,
            headers: {
                Authorization: auth.token,
                "Content-Type": "application/json",
            },
            data: data,
        };

        axios
            .request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const handleRejected = async (id) => {
        let data = JSON.stringify({
            status: "Rejected",
        });

        let config = {
            method: "put",
            maxBodyLength: Infinity,
            url: `http://connect.daldafoods.com:75/api/ideas/update-status/${id}`,
            headers: {
                Authorization: auth.token,
                "Content-Type": "application/json",
            },
            data: data,
        };

        axios
            .request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div>
            <div className="container">
                <Navbar />

                <Tabs>
                    <TabList>
                        <Tab>My Ideas</Tab>
                        <Tab>Team Member Ideas</Tab>
                    </TabList>

                    <TabPanel>
                        <div className="upperSection">
                            <h1>
                                Ideas <span>Status</span>
                            </h1>
                        </div>

                        <div className="status">
                            <div class="scroll">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Idea Title</th>
                                            <th>Idea Implementation</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ideas.length !== 0 ? (
                                            ideas.map((idea) => (
                                                <tr key={idea._id}>
                                                    <td>{idea.idea}</td>
                                                    <td>
                                                        {idea.implementation}
                                                    </td>
                                                    <td>
                                                        <button
                                                            id={
                                                                idea.ideaStatus ===
                                                                "Published"
                                                                    ? idea.status ===
                                                                      "Approved"
                                                                        ? "approved"
                                                                        : idea.status ===
                                                                          "Rejected"
                                                                        ? "rejected"
                                                                        : idea.status ===
                                                                          "Work in progress"
                                                                        ? "review"
                                                                        : "implemented"
                                                                    : "draft"
                                                            }
                                                            onClick={
                                                                idea.status ===
                                                                "Approved"
                                                                    ? handleShowDraftModal
                                                                    : idea.status ===
                                                                      "Rejected"
                                                                    ? handleShowSubmitModal
                                                                    : idea.ideaStatus ===
                                                                      "Draft"
                                                                    ? () =>
                                                                          handleIdeaNavigate(
                                                                              idea
                                                                          )
                                                                    : null
                                                            }
                                                        >
                                                            {idea.ideaStatus ===
                                                            "Published" ? (
                                                                idea.status
                                                            ) : (
                                                                <span>
                                                                    Draft
                                                                </span>
                                                            )}
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <h1>Loading...</h1>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            {/* add button *********** Section */}
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="upperSection">
                            <h1>
                                Ideas <span>Status</span>
                            </h1>
                        </div>

                        <div className="status">
                            <div
                                class="scroll"
                                style={{
                                    backgroundColor: "white",
                                    marginTop: "20px",
                                }}
                            >
                                <Accordion>
                                    {allUsers.length !== 0 ? (
                                        allUsers.map((idea) => (
                                            <AccordionItem>
                                                <AccordionItemHeading>
                                                    <AccordionItemButton>
                                                        {idea.username}
                                                    </AccordionItemButton>
                                                </AccordionItemHeading>
                                                <AccordionItemPanel>
                                                    {idea.ideas?.length !==
                                                    0 ? (
                                                        <>
                                                            <tr
                                                                style={{
                                                                    paddingBottom:
                                                                        "20px",
                                                                    fontWeight:
                                                                        "bold",
                                                                }}
                                                            >
                                                                <td>Idea</td>
                                                                <td>
                                                                    Implementation
                                                                    Plan
                                                                </td>
                                                                <td>Status</td>
                                                                <td>
                                                                    To Approve
                                                                </td>
                                                                <td>
                                                                    To Reject
                                                                </td>
                                                            </tr>
                                                            {idea.ideas?.map(
                                                                (idea) => (
                                                                    <tr
                                                                        key={
                                                                            idea._id
                                                                        }
                                                                    >
                                                                        <td>
                                                                            {
                                                                                idea.idea
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                idea.implementation
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            <button
                                                                                id={
                                                                                    idea.ideaStatus ===
                                                                                    "Published"
                                                                                        ? idea.status ===
                                                                                          "Approved"
                                                                                            ? "approved"
                                                                                            : idea.status ===
                                                                                              "Rejected"
                                                                                            ? "rejected"
                                                                                            : idea.status ===
                                                                                              "Work in progress"
                                                                                            ? "review"
                                                                                            : "implemented"
                                                                                        : "draft"
                                                                                }
                                                                                onClick={
                                                                                    idea.status ===
                                                                                    "Approved"
                                                                                        ? handleShowDraftModal
                                                                                        : idea.status ===
                                                                                          "Rejected"
                                                                                        ? handleShowSubmitModal
                                                                                        : idea.ideaStatus ===
                                                                                          "Draft"
                                                                                        ? () =>
                                                                                              handleIdeaNavigate(
                                                                                                  idea
                                                                                              )
                                                                                        : null
                                                                                }
                                                                            >
                                                                                {idea.ideaStatus ===
                                                                                "Published" ? (
                                                                                    idea.status
                                                                                ) : (
                                                                                    <span>
                                                                                        Draft
                                                                                    </span>
                                                                                )}
                                                                            </button>
                                                                        </td>
                                                                        <td>
                                                                            <button
                                                                                id="approved"
                                                                                onClick={() =>
                                                                                    handleApprove(
                                                                                        idea._id
                                                                                    )
                                                                                }
                                                                                style={{
                                                                                    backgroundColor:
                                                                                        idea.status ===
                                                                                            "Approved" &&
                                                                                        "grey",
                                                                                    cursor:
                                                                                        idea.status ===
                                                                                            "Approved" &&
                                                                                        "not-allowed",
                                                                                }}
                                                                                disabled={
                                                                                    idea.status ===
                                                                                    "Approved"
                                                                                        ? true
                                                                                        : false
                                                                                }
                                                                            >
                                                                                Approved
                                                                            </button>
                                                                        </td>
                                                                        <td>
                                                                            <button
                                                                                id="rejected"
                                                                                onClick={() =>
                                                                                    handleRejected(
                                                                                        idea._id
                                                                                    )
                                                                                }
                                                                                style={{
                                                                                    backgroundColor:
                                                                                        idea.status ===
                                                                                            "Rejected" &&
                                                                                        "grey",
                                                                                    cursor:
                                                                                        idea.status ===
                                                                                            "Rejected" &&
                                                                                        "not-allowed",
                                                                                }}
                                                                                disabled={
                                                                                    idea.status ===
                                                                                    "Rejected"
                                                                                        ? true
                                                                                        : false
                                                                                }
                                                                            >
                                                                                Reject
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            )}
                                                        </>
                                                    ) : (
                                                        <h2>No ideas posted</h2>
                                                    )}
                                                </AccordionItemPanel>
                                            </AccordionItem>
                                        ))
                                    ) : (
                                        <h1>Loading...</h1>
                                    )}
                                </Accordion>
                            </div>
                            {/* add button *********** Section */}
                        </div>
                    </TabPanel>
                </Tabs>
            </div>

            <div>
                {showDraftModal && (
                    <Popup
                        show={showDraftModal}
                        handleClose={handleCloseDraftModal}
                        title="Implementation Summary"
                        closeButtonLabel="Cancel"
                        primaryButtonLabel="Submit"
                    >
                        <p>Please provide evidence of Implementation</p>
                        <div class="attachment">
                            <a>
                                Add an attachment{" "}
                                <i
                                    class="fa fa-paperclip"
                                    aria-hidden="true"
                                ></i>
                            </a>
                        </div>

                        <textarea
                            type="text"
                            placeholder="Summary"
                            id="txtarea"
                        />
                    </Popup>
                )}
                <div>
                    <Popup
                        show={showSubmitModal}
                        handleClose={handleCloseSubmitModal}
                        title="Reasons for Rejection"
                        children="Thank You for using Dalda portal for cost-saving. Your application is in process and you will receive updates about your request on your registered email."
                        closeButtonLabel="Cancel"
                        primaryButtonLabel="Done"
                    >
                        <table>
                            <thead>
                                <tr>
                                    <th>Idea Number</th>
                                    <th>Description</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>xxxxx</td>
                                    <td>
                                        xxxx To try to create a paperless
                                        environment in my department.
                                    </td>
                                    <td>
                                        <button id="rejected">Rejected</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Popup>
                </div>
            </div>

            <div className="fam1">
                <img src={fam1} alt="family" />
            </div>
        </div>
    );
}
