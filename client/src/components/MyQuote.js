import React, { useEffect, useState } from 'react';
import toast from "react-hot-toast";
import './MyQuote.css'

const MyQuote = () => {
    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showPickupTable, setShowPickupTable] = useState(true); // State to manage which table to show

    useEffect(() => {
        const fetchQuotes = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/form/quotes");
                const data = await response.json();
                setQuotes(data);
                setLoading(false);
            } catch (error) {
                toast.error("Failed to fetch quotes", { duration: 3000 });
                console.log(error);
                setLoading(false);
            }
        };

        fetchQuotes();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const pickupQuotes = quotes.filter(quote => quote.orderType === "Pickup");
    const dropQuotes = quotes.filter(quote => quote.orderType === "Drop");

    return (
        <div>
            <h1>My Quotes</h1>
            
            <div className='myquote'>
                <button onClick={() => setShowPickupTable(true)}>Show Pickup Quotes</button>
                <button onClick={() => setShowPickupTable(false)}>Show Drop Quotes</button>
            </div>

            {showPickupTable ? (
                <div>
                    <h2 >Pickup Quotes</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Shipment Type</th>
                                <th>Order Type</th>
                                <th>Origin Port</th>
                                <th>Pickup Time</th>
                                <th>Account Manager</th>
                                <th>Customer Name</th>
                                <th>Pick Address</th>
                                <th>City</th>
                                <th>Zip Code</th>
                                <th>Contact Person Name</th>
                                <th>Contact Person Number</th>
                                <th>Scheduled Pickup Date</th>
                                <th>Expected Arrival Date</th>
                                <th>Drop Contact Person Name</th>
                                <th>Drop Contact Person Number</th>
                                <th>Box</th>
                                <th>Weight</th>
                                <th>CBM</th>
                                <th>Invoice Packing List</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pickupQuotes.map(quote => (
                                <tr key={quote._id}>
                                    <td>{quote.shipmentType}</td>
                                    <td>{quote.orderType}</td>
                                    <td>{quote.originPort}</td>
                                    <td>{quote.pickupTime}</td>
                                    <td>{quote.accountManager}</td>
                                    <td>{quote.customerName}</td>
                                    <td>{quote.pickAddress}</td>
                                    <td>{quote.city}</td>
                                    <td>{quote.zipCode}</td>
                                    <td>{quote.contactPersonName}</td>
                                    <td>{quote.contactPersonNumber}</td>
                                    <td>{new Date(quote.scheduledPickupDate).toLocaleDateString()}</td>
                                    <td>{new Date(quote.expectedArrivalDate).toLocaleDateString()}</td>
                                    <td>{quote.dropContactPersonName}</td>
                                    <td>{quote.dropContactPersonNumber}</td>
                                    <td>{quote.box}</td>
                                    <td>{quote.weight}</td>
                                    <td>{quote.CBM}</td>
                                    <td>{quote.file ? (
                                    <a href={quote.file} target="_blank" rel="noopener noreferrer">Download File</a>
                                ) : "N/A"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
              <div>
                <h2 >Drop Quotes</h2>
                <div className='droptable'>
                    
                    <table>
                        <thead>
                            <tr>
                                <th>Shipment Type</th>
                                <th>Order Type</th>
                                <th>Origin Port</th>
                                <th>Account Manager</th>
                                <th>Customer Name</th>
                                <th>Expected Arrival Date</th>
                                <th>Drop Contact Person Name</th>
                                <th>Drop Contact Person Number</th>
                                <th>Box</th>
                                <th>Weight</th>
                                <th>CBM</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dropQuotes.map(quote => (
                                <tr key={quote._id}>
                                    <td>{quote.shipmentType}</td>
                                    <td>{quote.orderType}</td>
                                    <td>{quote.originPort}</td>
                                    <td>{quote.accountManager}</td>
                                    <td>{quote.customerName}</td>
                                    <td>{new Date(quote.expectedArrivalDate).toLocaleDateString()}</td>
                                    <td>{quote.dropContactPersonName}</td>
                                    <td>{quote.dropContactPersonNumber}</td>
                                    <td>{quote.box}</td>
                                    <td>{quote.weight}</td>
                                    <td>{quote.CBM}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
              </div>
            )}
        </div>
    );
};

export default MyQuote;
