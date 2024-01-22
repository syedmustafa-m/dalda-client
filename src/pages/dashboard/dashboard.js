import React, { useEffect, useState } from "react";
import person from "../../../src/images/person.png";
import "./dashboard.css";
import { Link } from "react-router-dom";

import Navbar from "../../Components/Navbar/Navbar";
import { useAuth } from "../../context/auth";
import axios from "axios";

export default function Dashboard() {
    const [auth, setAuth] = useAuth();
    const [users, setUsers] = useState([]);
    const [ideas, setIdeas] = useState([]);
    const [ideaStatusCounts, setIdeaStatusCounts] = useState({});
    const [show, setShow] = useState(false);

    useEffect(() => {
        try {
            if (auth?.user?.role) {
                setShow(true);
            } else {
                setShow(false);
            }
        } catch (error) {
            console.log(error);
        }
    }, []);
    //const auth= localStorage.getItem('auth')
    //console.log(parseInt(auth.user.userid))
    //getting all users managed by the signed in user
    const getAllUsers = async () => {
        try {
            const { data } = await axios.get(
                `http://10.0.0.200:75/api/auth/users-managed/${parseInt(auth.user.userid)}`
            );
            setUsers(data.users);

            // console.log(data.users
        } catch (error) {
            console.log("Somthing Went Wrong In getting Ideas");
        }
    };
    const fetchIdeaStatusCounts = async (userid) => {
        try {
            const { data } = await axios.get(
                `http://10.0.0.200:75/api/ideas/idea-status-count/${userid}`
            );
            console.log(data)
            setIdeaStatusCounts((prevCounts) => ({
                ...prevCounts,
                [userid]: {
                    ideasEntered: data.CountTotal,
                    ideasApproved: data.ApprovedTotal,
                    ideasRejected: data.RejectedTotal,
                    workInProgressEntered: data.WorkTotal,
                    implemented: data.ImplementedTotal,  
                },
            }));
        } catch (error) {
            console.log(
                "Something went wrong while fetching idea status counts:",
                error
            );
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    useEffect(() => {
        users.forEach((user) => {
            fetchIdeaStatusCounts(user.userid);
        });
    }, [users]);

    return (
        <div class="container">
            <Navbar />
            {/* Ideal *********** status  */}
            <div class="status" style={{ marginBottom: "20px" }}>
                <Link to="/idealstatus">
                    <button>Idea Status</button>
                </Link>
            </div>
            <div class="status">
                {show && (
                    <Link to="/allideas">
                        <button>All Ideas</button>
                    </Link>
                )}
            </div>

            {/* profile *********** Section */}
            <div class="upperSection">
                <img src={person} />
                <h1>
                    Welcome <span> {auth?.user?.username} </span>
                </h1>
            </div>

            {/* Table *********** Section */}
            <div class="scroll" style={{ height: "1000px" }}>
                <table>
                    <thead>
                        <tr>
                            <th>Your Teams Members </th>
                            <th> Designation</th>
                            <th> Ideas Entered</th>
                            <th>Ideas Approved</th>
                            <th>Ideas Rejected</th>
                            <th>Work In Progress Entered</th>
                            <th>Implemented</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users ? (
                            users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user.username}</td>
                                    <td>{user.designation}</td>
                                    <td>
                                        {
                                            ideaStatusCounts[user.userid]
                                                ?.ideasEntered
                                        }
                                    </td>
                                    <td>
                                        {
                                            ideaStatusCounts[user.userid]
                                                ?.ideasApproved
                                        }
                                    </td>
                                    <td>
                                        {
                                            ideaStatusCounts[user.userid]
                                                ?.ideasRejected
                                        }
                                    </td>
                                    <td>
                                        {
                                            ideaStatusCounts[user.userid]
                                                ?.workInProgressEntered
                                        }
                                    </td>
                                    <td>
                                        {
                                            ideaStatusCounts[user.userid]
                                                ?.implemented
                                        }
                                    </td>
                                </tr>
                            ))
                        ) : (
                            users.length === 0 ? (
                                <h1>No data</h1>
                            ) : (
                                <h1>Loading...</h1>
                            )
                        )}
                    </tbody>
                </table>
            </div>

            {/* add button *********** Section */}
            <div class="bottomPagination">
                {/*  <div class='arrows'>
        <a href='#'><i class="fa fa-long-arrow-left" aria-hidden="true"></i></a>
        <a href='#'><i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>
    </div> */}

                <Link to="/welcome">
                    <button>Click Here to add an idea</button>
                </Link>
            </div>
        </div>
    );
}
