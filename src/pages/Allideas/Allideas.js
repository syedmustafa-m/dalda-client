import React, { useEffect, useState } from 'react';
import '../IdealStatus/Idealstatus.css';
import fam1 from '../../images/fam1.png';
import Popup from '../../Components/Popup';

import Navbar from '../../Components/Navbar/Navbar'
import axios from 'axios';
import { useAuth } from '../../context/auth';
import { Link } from 'react-router-dom';



export default function Allideas() {
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showDraftModal, setShowDraftModal] = useState(false);
  const [ideas,setIdeas]=useState([])
  const [auth,setAuth]=useAuth();

  //getting all Ideas by a single user
const getAllIdeas=async()=>{
  try {
    const {data}=await axios.get(`http://10.0.0.200:75/api/ideas/get-idea`);
    setIdeas(data.ideas);

  } catch (error) {
    console.log("Somthing Went Wrong In getting Ideas")
  }

}
const handleApprove= (id)=>{
    let data = JSON.stringify({
      "status": "Approved"
    });
    
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `http://10.0.0.200:75/api/ideas/update-status/${id}`,
      headers: { 
        'Authorization': auth.token, 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
    
  

}
const handleRejected=async (id)=>{
  let data = JSON.stringify({
    "status": "Rejected"
  });
  
  let config = {
    method: 'put',
    maxBodyLength: Infinity,
    url: `http://10.0.0.200:75/api/ideas/update-status/${id}`,
    headers: { 
      'Authorization': auth.token, 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });
  
}

useEffect(()=>{
  getAllIdeas();
},[]);

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



  return (
    <div>
      <div className='container'>
      <Navbar />
        <div className='upperSection'>
          <h1>
            All <span>Ideas</span>
          </h1>
        </div>

        <div className="status">
          <div class='scroll'>
              <table>
                <thead>
                  <tr>
                    <th>Idea Title</th>
                    <th>Idea Implementation</th>
                    <th>Status</th>
                    <th>To Approve</th>
                    <th>To Reject</th>
                  </tr>
                </thead>
                <tbody>
                      {ideas.map((idea) => (
                      <tr key={idea._id}>
                      <td>{idea.idea}</td>
                      <td>{idea.implementation}</td>
                      <td>
                      <button id={ idea.status === "Approved"
                                ? "approved"
                                 : idea.status === "Rejected"
                                 ? "rejected"
                                  : idea.status === "Work in progress"
                              ? "review"
                              : "implemented"
                                       }
                             onClick={idea.status === "Approved"? handleShowDraftModal: handleShowSubmitModal}>
                             {idea.status}
                            </button>
                  
                     </td>
                     <td>
                     <Link to ="/">  <button id="approved" onClick={()=>handleApprove(idea._id)}>Approved</button></Link>
                     </td>
                     <td>
                       <Link to ="/"> <button id="rejected" onClick={()=>handleRejected(idea._id)}>Reject</button></Link>
                     </td>
                    </tr>
                    ))}
                  </tbody>

              </table>
          </div>
          {/* add button *********** Section */}
      
        </div>

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
            <div class='attachment'>
              <a>Add an attachment <i class="fa fa-paperclip" aria-hidden="true"></i></a>
            </div>

          <textarea type="text" placeholder="Summary" id='txtarea' />
        
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
                <td>xxxx To try to create a paperless environment in my department.</td>
                <td>
                <button id='rejected'>Rejected</button>
                </td>
              </tr>
              </tbody>
              </table>
            </Popup>
          </div>


      </div>

      <div className='fam1'>
        <img src={fam1} alt="family" />
      </div>

    </div>
  );
}
