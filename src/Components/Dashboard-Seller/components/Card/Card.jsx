import React, { useEffect, useState } from "react";
import "./Card.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion, LayoutGroup } from "framer-motion";
import { UilTimes } from "@iconscout/react-unicons";
import Chart from "react-apexcharts";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "../../../../FirebaseConfigs/firebaseConfig";
import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  UilShoppingCartAlt,
  UilPricetagAlt,
  UilUserSquare,
  UilSignOutAlt,
  UilCoins
} from "@iconscout/react-unicons";

// Analytics Cards imports
import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";
// parent Card

const Card = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <LayoutGroup>
      
        <CompactCard param setExpanded={() => setExpanded(true)} />
      
    </LayoutGroup>
  );
};

// Compact Card
function CompactCard() {
  
  function GetCurrentUser () {
    const[user,setUser] = useState ('')
    const usersCollectionRef = collection(db, "users")

    useEffect(() => {
      auth.onAuthStateChanged(userlogged=>{
        if(userlogged){
          // console.log(userlogged.email)
          const getUsers = async () => {
            const q = query(collection(db, "users"),where("uid","==",userlogged.uid))
            // console.log(q)
          const data = await getDocs(q);
          setUser(data.docs.map((doc) =>({...doc.data(),id:doc.id})))
          }
          getUsers();
        }
        else{
          setUser(null);
        }
      })
    },[])
    return user
}
const loggeduser = GetCurrentUser();


//console.log(loggeduser)
  return (
    <div >
      {loggeduser ? 
      <div className="Cards">
        <div className="parentContainer" >
      <motion.div
      className="CompactCard"
      style={{
        backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
        boxShadow: "0px 10px 20px 0px #8c00ff",
      }}
    >
      <div className="radialBar">
        <CircularProgressbar
          value={loggeduser[0].usersale/loggeduser[0].expenses}
          text={`${(loggeduser[0].usersale/loggeduser[0].expenses).toFixed(2)}%`}
        />
        <span>Sales</span>
      </div>
      <div className="detail">
        <UilCoins/>
        <span>₱ {loggeduser[0].usersale}.00</span>
        
      </div>
    </motion.div>
    </div>
    <div className="parentContainer2">
      <motion.div
      className="CompactCard"
      style={{
        backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
        boxShadow: "0px 10px 20px 0px #ff001e",
      }}
    >
      <div className="radialBar">
        <CircularProgressbar
          value={100 - loggeduser[0].usersale/loggeduser[0].expenses}
          text={`${100-(loggeduser[0].usersale/loggeduser[0].expenses).toFixed(2)}%`}
        />
        <span>Capital</span>
      </div>
      <div className="detail">
        <UilMoneyWithdrawal/>
        <span>₱ {loggeduser[0].expenses}.00</span>
        
      </div>
    </motion.div>
    </div>
    <div className="parentContainer3">
      <motion.div
      className="CompactCard"
      style={{
        backGround: "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
        boxShadow: "0px 10px 20px 0px #ff9d00",
      }}
    >
      <div className="radialBar">
        <CircularProgressbar
          value={loggeduser[0].usersale/loggeduser[0].expenses}
          text={`${(loggeduser[0].usersale/loggeduser[0].expenses).toFixed(2)}%`}
        />
        <span>ROI</span>
      </div>
      <div className="detail">
        <UilClipboardAlt/>
        <span>₱ {loggeduser[0].expenses}.00</span>
        <span>₱ {loggeduser[0].usersale}.00</span>
      </div>
    </motion.div>
    </div>
    </div>
    
    
    :
    <></>}
    </div>
  );
}

// Expanded Card

export default Card;
