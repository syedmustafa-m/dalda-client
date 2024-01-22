import React, { useEffect, useState } from "react";
import policyIcon from "../../images/PrivacyPolicy.png";
import Chart from "../../Components/Chart/Chart";
//images
import fam from "../../images/image8.png";

import "./DashboardSav.css";

import Navbar from "../../Components/Navbar/Navbar";
import { useAuth } from "../../context/auth";
import axios from "axios";
import chart from "../../Components/Chart/Chart";
//import ChartComponent from '../../Components/Chart/Chart';

export default function DashboardSave() {
  const [auth, setAuth] = useAuth();
  const [users, setUsers] = useState([]);
  const [ideaStatusCounts, setIdeaStatusCounts] = useState({});

  const [chartData, setChartData] = useState(null);
  const userid = auth?.user?.userid;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://connect.daldafoods.com:75/api/ideas/idea-status-count/${userid}`
        );
        setChartData(response.data);
      } catch (error) {
        console.error("Error fetching API data:", error);
      }
    };

    fetchData();
  }, [userid]);

  //const auth= localStorage.getItem('auth')
  //console.log(parseInt(auth.user.userid))
  //getting all users managed by the signed in user
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(
        `http://connect.daldafoods.com:75/api/auth/users-managed/${parseInt(auth.user.userid)}`
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
        `http://connect.daldafoods.com:75/api/ideas/idea-status-count/${userid}`
      );
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
      <div class="dashbrd">
        <div class="dashbrdInner">
          <div>
            <h1>Dashboard</h1>
            {/* <p>Please select option from dropbox</p> */}
          </div>
          <div>
            <img src={policyIcon} />
          </div>
        </div>
        <div class="checkBoxSectionInner1">
          {/* <select id="valueDropdown">
                    <option value="" selected disabled hidden>Please Select</option>
                    <option value="apple">0</option>
                    <option value="banana">0</option>
                    <option value="orange">0</option>
                    <option value="grape">0</option>
                </select> */}
          {chartData && <Chart type="bar" width="500" data={chartData} />}
        </div>
      </div>
      <div class="Detailing">
        <p>Ideas Entered</p>
        <p>Ideas Approved</p>
        <p>Ideas Rejected</p>
        <p>Work In Progress</p>
        <p>Ideas Implemented</p>
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
            {
              users.length !== 0 ? (
                users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.username}</td>
                    <td>{user.designation}</td>
                    <td>{ideaStatusCounts[user.userid]?.ideasEntered}</td>
                    <td>{ideaStatusCounts[user.userid]?.ideasApproved}</td>
                    <td>{ideaStatusCounts[user.userid]?.ideasRejected}</td>
                    <td>
                      {ideaStatusCounts[user.userid]?.workInProgressEntered}
                    </td>
                    <td>{ideaStatusCounts[user.userid]?.implemented}</td>
                  </tr>
                ))
              ) : <h1>Loading...</h1>
            }
          </tbody>
        </table>
      </div>
      {/* add button *********** Section */}

      <div class="btmImg">
        <img src={fam} />
      </div>
    </div>
  );
}
