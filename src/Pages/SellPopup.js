import React, { useState } from "react";
import {useSelector} from "react-redux"; 
import {URL} from "../constants/actionTypes.js"
import "./SellPopup.css";
import axios from 'axios';
const SellPopup = ({ isOpen, onClose }) => {
    // const [rollNo, setRollNo] = useState('');
    const [category, setCategory] = useState('');
    const [itemName, setItemName] = useState('');
    const [image, setImage] = useState('');
    const [cost, setCost] =useState("");
    const [registered, setRegistered] = useState(false);
    var roll_no=useSelector((state) => state.userHandler.roll_no);
    console.log(roll_no,"roll dfs");
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const fetchData = async()=>{
            try{
                console.log(roll_no,"roll number")
                var sellItemBody={
                    roll_number: roll_no,
                    category:category,
                    item_name:itemName,
                    cost: cost,
                    images:image
                };
                
                const response = await axios.post(`${URL}/sellitem`, sellItemBody)
                onClose=false;
                setRegistered(true);
            }
            catch(error){
                console.error('Error fetching data:', error);
        
               }        
        }
       fetchData();
    };

    return (
        <div className={`sell-popup ${isOpen ? "open" : ""}`}>
            <div className="sell-popup-content">
                <span className="sell-popup-close" onClick={onClose}>
                    &times;
                </span>
                <form >
                    {/* <label>
                        Roll No:
                        <input type="text" value={rollNo} onChange={(e) => setRollNo(e.target.value)} />
                    </label>
                    <br /> */}
                    <label>
                        Category:
                        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
                    </label>
                    <br />
                    <label>
                        Item Name:
                        <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} />
                    </label>
                    <br />
                    <label>
                        Image:
                        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
                    </label>
                    <br />
                    <label>
                        Cost:
                        <input type="text" value={cost} onChange={(e) => setCost(e.target.value)} />
                    </label>
                    <br />
                    <button type="submit" onClick={handleFormSubmit} >Submit</button>
                </form>
            </div>
        </div>
    );
};

export default SellPopup;
