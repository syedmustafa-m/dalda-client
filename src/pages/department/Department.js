import React, { useEffect, useState } from 'react'

import { Link,useNavigate   } from 'react-router-dom'
//styling
import './department.css'

import depart from '../../Components/Data/departments.json';
import locate from '../../Components/Data/locations.json';

//import images in here
import roundImg from '../../images/element.png'
import fam from '../../images/image8.png' 

import Navbar from '../../Components/Navbar/Navbar'

export default function Department() {
    const navigate = useNavigate();
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const handleNextClick = () => {
        if (selectedDepartment && selectedLocation) {
          navigate(`/saving?department=${selectedDepartment}&location=${selectedLocation}`);
        } else {
          // Display an error message or handle the case when both department and location are not selected
        }
      };
  return (
    <div class='container'>

        <Navbar />

        <div class='upperSection'>
            <h1>Portal For <br/> <span>Cost Savings</span></h1>
        </div>
        <div class='checkBoxSection'>
            
            <p>Please select one of the option</p>
            
            <div class='checkBoxSectionInner1'>
                <select id="departmentDropdown" onChange={(e) => setSelectedDepartment(e.target.value)}>
                <option value="" disabled selected hidden>Department</option>
                    {depart.departments.map((depart) => (
                        <option value={depart}>{depart}</option>
                    ))}
                </select>
            </div>
            
            <div class='checkBoxSectionInner1'>
                <select id="locationDropdown" onChange={(e) => setSelectedLocation(e.target.value)}>
                <option value="" disabled selected hidden>Location</option>
                {locate.locations.map((locate) => (
                        <option value={locate}>{locate}</option>
                    ))}
                </select>
            </div>

            <div class='nxt'>
            <button onClick={handleNextClick}>Next</button>
            </div>
        </div>

        <div class='round'>
            <img src={roundImg} />
        </div>

        <img src={fam} id='fam' />
      </div>
  )
}
