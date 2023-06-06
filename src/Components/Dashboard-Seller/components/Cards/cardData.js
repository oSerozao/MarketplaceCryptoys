import React from 'react'

const cardData = () => {
  return (
    <div>cardData</div>
  )
}

export default cardData
/*import React, { useEffect, useState } from 'react'
import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  UilShoppingCartAlt,
  UilPricetagAlt,
  UilUserSquare,
  UilSignOutAlt,
} from "@iconscout/react-unicons";

// Analytics Cards imports
import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../../../../FirebaseConfigs/firebaseConfig';

export const cardData = () => {
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
    
  return (
    [
      {
        title: "Sales",
        color: {
          backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
          boxShadow: "0px 10px 20px 0px #e0c6f5",
        },
        barValue: 70,
        value: "50",//`${loggeduser[0].usersale}`,
        png: UilUsdSquare,
        series: [
          {
            name: "Sales",
            data: [31, 40, 28, 51, 42, 109, 100],
          },
        ],
      },
      {
        title: "Expenses",
        color: {
          backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
          boxShadow: "0px 10px 20px 0px #FDC0C7",
        },
        barValue: 80,
        value: "50",//`${loggeduser[0].usersale}`,
        png: UilMoneyWithdrawal,
        series: [
          {
            name: "Expenses",
            data: [10, 100, 50, 70, 80, 30, 40],
          },
        ],
      },
      {
        title: "Losses",
        color: {
          backGround:
            "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
          boxShadow: "0px 10px 20px 0px #F9D59B",
        },
        barValue: 60,
        value: "50",//`${losses}`,
        png: UilClipboardAlt,
        series: [
          {
            name: "Losses",
            data: [10, 25, 15, 30, 12, 15, 20],
          },
        ],
      },
    ]
  )
}*/
