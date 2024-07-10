import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../store/auth";
import '../styles.css';
import './Home.css';

function Home() {

  const {user} = useAuth();

  return (
    <div className="home-page">
    {user && <h2>Hello!&nbsp; {user.username}</h2>}
    {/* <h2>Hello!&nbsp; {user ? ` ${user.username}` : ``}</h2> */}
      <h1 >Welcome to Pickup Request</h1>
      <p>Get a quote for your pickup needs</p>
      
      <Link to="/form">
        <button className="order-quote-btn">Order Quote</button>
      </Link>
    </div>
  );
}

export default Home;