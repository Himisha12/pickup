import React, { useState } from "react";
// import axios from "axios";
import { useAuth } from "../store/auth";
import "./Form.css";
import toast from "react-hot-toast";

const defaultQuoteFormData = {
    shipmentType: "",
    orderType: "",
    originPort: "",
    pickupTime: "",
    multipleLocation: "",
    accountManager: "",
    customerName: "",
    pickAddress: "",
    city: "",
    zipCode: "",
    contactPersonName: "",
    contactPersonNumber: "",
    scheduledPickupDate: "",
    expectedArrivalDate: "",
    dropContactPersonName: "",
    dropContactPersonNumber: "",
    box: "",
    weight: "",
    CBM: "",
    file: null,
}

function Form() {

  const [formData, setFormData] = useState(defaultQuoteFormData);
  
  const [userData,setUserData] = useState(true)
  // const [file, setFile] = useState(null);

  const {user} = useAuth();

  if(userData && user){
    setFormData({
      accountManager: user.username,
    })
    setUserData(false);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log("Selected file:", file);
    setFormData({
      ...formData,
      file: file,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch("http://localhost:5000/api/form/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if(response.ok){
        setFormData(defaultQuoteFormData);
        const data = await response.json();
        console.log(data);
        toast.success("Form submitted successfully" ,{ duration: 3000,})
      }
      console.log("Form data submitted:", formData);
    } catch (error) {
      toast.error("Form not submitted, there may be some issue , please check your input!" ,{ duration: 3000,});
      console.log(error)
    }
    
    // Handle form submission logic here (e.g., send the data to the server)
  };
  
  const [orderType, setOrderType] = useState("");
  const handleOrderTypeChange = (event) => {
    const { value } = event.target;
    setOrderType(value);
  };

  return (
    <div>
      <form className="quoteForm" onSubmit={handleSubmit} method="POST">
        <div className="section1">
          <p className="orderRequest">Order Request</p>
          <div className="shipmentCustomer">
            <div className="shipmentTypeDiv">
              <label>Shipment Type</label>
              <label className="label2">
                <input
                  type="radio"
                  name="shipmentType"
                  value="AIR"
                  checked={formData.shipmentType === "AIR"}
                  onChange={handleChange}
                />
                AIR
              </label>
              <label className="label2">
                <input
                  type="radio"
                  name="shipmentType"
                  value="OCEAN"
                  checked={formData.shipmentType === "OCEAN"}
                  onChange={handleChange}
                />
                OCEAN
              </label>
              <label className="label2">
                <input
                  type="radio"
                  name="shipmentType"
                  value="FEDEX"
                  checked={formData.shipmentType === "FEDEX"}
                  onChange={handleChange}
                />
                FEDEX
              </label>
            </div>
            <div className="customerNameDiv">
              <label>Customer Name</label>
              <input
                type="text"
                name="customerName"
                placeholder="Enter Customer Name"
                value={formData.customerName} 
                onChange={handleChange}
                required
                autoComplete="off"
              ></input>
            </div>
          </div>
          <div className="originOrder">
            <div className="orderTypeBox">
              <label name="orderType">Order Type</label>
              <label className="label2">
                <input
                  type="radio"
                  name="orderType"
                  value="Pickup"
                  checked={formData.orderType === "Pickup"}
                  onChange={(e) => {
                    handleChange(e);
                    handleOrderTypeChange(e);}}
                  required
                  autoComplete="off"
                ></input>
                Pickup
              </label>
              <label className="label2">
                <input
                  type="radio"
                  name="orderType"
                  value="Drop"
                  checked={formData.orderType === "Drop"}
                  onChange={(e) => {
                    handleChange(e);
                    handleOrderTypeChange(e);}}
                  required
                  autoComplete="off"
                />
                Drop
              </label>
            </div>
            <div className="originPortBox">
              <label>Origin Port</label>
              <select
                name="originPort"
                value={formData.originPort}
                onChange={handleChange}
                required
                autoComplete="off"
              >
                <option value="" className="selectGray" disabled selected>
                  Select Origin Port
                </option>
                <option value="Mahipalpur">Mahipalpur</option>
                <option value="Nhavashiva">Nhavashiva</option>
                <option value="Jaipur">Jaipur</option>
                <option value="China">China</option>
                <option value="Tuticorin">Tuticorin</option>
                <option value="France">France</option>
                <option value="ICD KANAKPURA">ICD KANAKPURA</option>
                <option value="JFK">JFK</option>
              </select>
            </div>
          </div>
        </div>

        {orderType === "Pickup" && (
        <div className="section2">
          <p className="orderRequest">Pickup Details</p>
          <div className="pickAddress_City">
            <div className="pickAddress">
              <label>Pick Address</label>
              <textarea
                rows={3}
                name='pickAddress' 
                placeholder='"Enter the Pick Address'
                value={formData.pickAddress} 
                onChange={handleChange}
                required
                autoComplete="off"
              ></textarea>
            </div>
            <div className="city">
              <label>City</label>
              <input
                type="text"
                name="city"
                placeholder="Enter City"
                value={formData.city} 
                onChange={handleChange}
                required
                autoComplete="off"
              ></input>
            </div>
          </div>
          <div className="zip_contact">
            <div className="zipCode">
              <label>Zip Code</label>
              <input
                type="text"
                name="zipCode"
                placeholder="Enter zip code"
                value={formData.zipCode} 
                onChange={handleChange} 
                required
                autoComplete="off"
              ></input>
            </div>
            <div className="contactPerson">
              <label>Contact Person Name</label>
              <input
                type="text"
                name="contactPersonName"
                placeholder="Enter Contact Person Name"
                value={formData.contactPersonName} 
                onChange={handleChange}
                required
                autoComplete="off"
              ></input>
            </div>
          </div>
          <div className="number_date">
            <div className="contactPersonNumber">
              <label>Contact Person Number</label>
              <input
                type="number"
                name="contactPersonNumber"
                placeholder="Enter Contact Person Number"
                value={formData.contactPersonNumber} 
                onChange={handleChange} 
                required
                autoComplete="off"
              ></input>
            </div>
            <div className="pickupDate">
              <label>Pick-up Scheduled Date</label>
              <input
                type="date"
                name="scheduledPickupDate"
                value={formData.scheduledPickupDate} 
                onChange={handleChange}
                required
                autoComplete="off"
              ></input>
            </div>
          </div>
          <div className="time_remark">
            <div className="pickupTime">
              <label>Pick-up Scheduled Time</label>
              <select
                name="pickupTime"
                value={formData.pickupTime} 
                onChange={handleChange}
                required
                autoComplete="off"
              >
                <option value="" className="selectGray" disabled selected>
                  Select Pick up Scheduled Time
                </option>
                <option value="10AM-12PM">10 AM - 12 PM</option>
                <option value="12PM-2PM">12 PM - 2 PM</option>
                <option value="2PM-4PM">2 PM - 4 PM</option>
                <option value="4PM-6PM">4 PM - 6 PM</option>
                <option value="6PM-8PM">6 PM - 8 PM</option>
                <option value="others">Others</option>
              </select>
            </div>
            <div className="remark">
              <label>Remark</label>
              <textarea rows={2} name='remark' placeholder="Enter Remark" value={formData.remark} onChange={handleChange}></textarea>
            </div>
          </div>
        </div>
      )}

      {orderType === "Drop" && (
        <div className="section3">
          <p className="orderRequest">Drop Details</p>
          <div className="date_name">
            <div className="expectedArrival">
              <label>Expected Arrival</label>
              <input
                type="date"
                name="expectedArrivalDate"
                value={formData.expectedArrivalDate} 
                onChange={handleChange}
                required
                autoComplete="off"
              ></input>
            </div>
            <div className="personName">
              <label>Contact Person Name</label>
              <input
                type="text"
                name="dropContactPersonName"
                placeholder="Enter Contact Person Name"
                value={formData.dropContactPersonName} 
                onChange={handleChange}
                required
                autoComplete="off"
              ></input>
            </div>
          </div>
          <div className="personNumber">
            <label>Contact Person Number</label>
            <input
              type="number"
              name="dropContactPersonNumber"
              placeholder="Enter Contact Person Number"
              value={formData.dropContactPersonNumber} 
              onChange={handleChange}
              required
              autoComplete="off"
            ></input>
          </div>
        </div>
      )}
        <div className="section4">
          <p className="orderRequest">Order Details</p>
          <div className="box_weight">
            <div className="box">
              <label>Box</label>
              <input
                type="text"
                name="box"
                placeholder="Enter Box"
                value={formData.box} 
                onChange={handleChange}
                required
                autoComplete="off"
              ></input>
            </div>
            <div className="weight">
              <label>Weight</label>
              <input
                type="text"
                name="weight"
                placeholder="Enter Weight"
                value={formData.weight} 
                onChange={handleChange}
                required
                autoComplete="off"
              ></input>
            </div>
          </div>
          <div className="CBM">
            <label>CBM</label>
            <input
              type="text"
              name="CBM"
              placeholder="Enter CBM"
              value={formData.CBM} 
                onChange={handleChange}
              required
              autoComplete="off"
            ></input>
          </div>
        </div>
        <div className="section5">
          <p className="orderRequest">Invoice Packing List</p>
          <div className="multiple_upload">
            <div className="multipleLocation">
              <label>Multiple Location</label>
              <select
                name="multipleLocation"
                value={formData.multipleLocation} 
                onChange={handleChange}
                required
                autoComplete="off"
              >
                <option value="" className="selectGray" disabled selected>
                  Select Multiple Location
                </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="uploadFile">
              <label htmlFor="spreadsheetUpload">
                Upload Invoice Packing List
              </label>
              <input
                type="file"
                id="spreadsheetUpload"
                name="file"
                accept=".xls,.xlsx,.csv"
                onChange={handleFileUpload}
                required
                autoComplete="off"
              />
            </div>
          </div>
          <div className="accountManager">
            <label>Account Manager</label>
            <input type="text" name="accountManager" value={formData.accountManager} onChange={handleChange} placeholder="Enter Account Manager" required autoComplete="off"></input>
            {/* <select
              name="accountManager"
              value={formData.accountManager} 
              onChange={handleChange} 
              className="selectGray"
              required
              autoComplete="off"
            >
              <option value="" disabled selected>
                Select Account Manager
              </option>
              <option value="Ashwin">Ashwin</option>
              <option value="Mohit">Mohit</option>
              <option value="Jitender">Jitender</option>
              <option value="Varchasva">Varchasva</option>
              <option value="Ashuthosh">Ashuthosh</option>
              <option value="Naresh">Naresh</option>
              <option value="Krishna">Krishna</option>
              <option value="Tushar">Tushar</option>
              <option value="Khushi">Khushi</option>
              <option value="Himadri">Himadri</option>
              <option value="Nisha">Nisha</option>
              <option value="Sohail">Sohail</option>
              <option value="Akshay_Agnihotri">Akshay Agnihotri</option>
              <option value="Rahul">Rahul</option>
            </select> */}
          </div>
        </div>
        <div>
          <button type="submit" className="qouteSubmit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
