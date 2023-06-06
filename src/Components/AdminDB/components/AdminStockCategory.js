import React, { useState, useEffect} from 'react'
import { db } from '../../../FirebaseConfigs/firebaseConfig';
import { collection, getDoc, doc, getDocs, query, where } from 'firebase/firestore'
import AdminTransferscard from './AdminTransferscard';
import styled from "styled-components";
import { HiArrowNarrowRight } from "react-icons/hi";
import avatarImage from "../assets/avatarImage.jpeg";
import { cardStyles } from "./AdminReusableStyles";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { Tooltip } from 'react-bootstrap';


/*export default function Transfers() {
  const transactions = [
    {
      image: avatarImage,
      name: "From Kishan Sheth",
      time: "Today, 16:36",
      amount: "+$50",
    },
    {
      image: avatarImage,
      name: "To Lauras Santos",
      time: "Today, 08:49",
      amount: "-$25",
    },
    {
      image: avatarImage,
      name: "From Jadon S.",
      time: "Yesterday, 14:36",
      amount: "+$150",
    },
  ];
  return (
    <Section>
      <div className="title">
        <h2>Your Transfers</h2>
      </div>
      <div className="transactions">
        {transactions.map((transaction) => {
          return (
            <div className="transaction">
              <div className="transaction__title">
                <div className="transaction__title__image">
                  <img src={transaction.image} alt="" />
                </div>
                <div className="transaction__title__details">
                  <h3>{transaction.name}</h3>
                  <h5>{transaction.time}</h5>
                </div>
              </div>
              <div className="transaction__amount">
                <span>{transaction.amount}</span>
              </div>
            </div>
          );
        })}
      </div>
      <a className="view" href="#">
        View all <HiArrowNarrowRight />
      </a>
    </Section>
  );
      }*/
  const AdminStockCategory= () => {

    const [users, setUsers] = useState([]);
    useEffect(() => {
        const getUsers = () => {

            const usersArray = [];
            
            //console.log(props)

            getDocs(collection(db, "users")).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // console.log(doc.id, " => ", doc.data());
                    usersArray.push({ ...doc.data(), id: doc.id })
                });
                setUsers(usersArray)
                // console.log('done')
            }).catch('Error error error')
        }

        getUsers();
    }, [])
    const [overallstock, setOverAllStock] = useState('');
    function GetOverAllStock() {
      // const productCollectionRef = collection(db, `products-${type.toUpperCase()}`);
  
      useEffect(() => {
        const getOverAllStock = async () => {
          
          const docRef = doc(db, "All-Added-Product", "products");
          const docSnap = await getDoc(docRef);
          
          setOverAllStock(docSnap.data());
        };
        getOverAllStock();
      }, [])
      return overallstock
    }
    GetOverAllStock();
    const overstock = GetOverAllStock();
    
    const [dataforstock, setdataforstock] = useState([]);
    
      const getdataforstock = async () => {
        const dataforstockArray = [];
        // console.log(path)
        getDocs(collection(db,"All-Added-Product", "products","allproduct")).then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // console.log(doc.id, " => ", doc.data());
            dataforstockArray.push({ ...doc.data(), id: doc.id })
          });
          setdataforstock(dataforstockArray)
          // console.log('done')
        }).catch('Error error error')
    
      }
      getdataforstock()
      
  if(dataforstock.length) {
    var overstockresin = overstock.RESIN;
    var overstockfigmas = overstock.FIGMAS;
    var overstocknendoroid = overstock.NENDOROID;
    var overstockscales = overstock.SCALES;
    var overstockother = overstock.OTHER;
    var buyerresin = overstock.RESINnumberofbuyer;
    var buyerfigmas = overstock.FIGMASnumberofbuyer;
    var buyernendoroid = overstock.NENDOROIDnumberofbuyer;
    var buyerscales = overstock.SCALESnumberofbuyer;
    var buyerother = overstock.OTHERnumberofbuyer;
  }
  const data1 = [
    {
      name: 'Resin',
      uv: overstockresin,
    },
    {
      name: 'Figmas',
      uv: overstockfigmas,
    },
    {
      name: 'Nendoroid',
      uv: overstocknendoroid,
    },
    {
      name: 'Scales',
      uv: overstockscales,
    },
    {
      name: 'Other',
      uv: overstockother,
    }
  ];
  const data1novalue = [
    {
      name: 'Resin',
      uv: 0,
    },
    {
      name: 'Figmas',
      uv: 0,
    },
    {
      name: 'Nendoroid',
      uv: 0,
    },
    {
      name: 'Scales',
      uv: 0,
    },
    {
      name: 'Other',
      uv: 0,
    }
  ];
  return (
    <Section>
    <div>
        <div>
            <div className="title">
              <h2>Category Stock Chart</h2></div>
            <div className="transactions">
            {dataforstock.length > 0 ?
        
        <div className='areachartsize' >
       <ResponsiveContainer>
      
         <AreaChart 
           data={data1}
           margin={{
             top: 10,
             right: 30,
             left: -30,
             bottom: 10,
             
           }}
           
         >
           <CartesianGrid strokeDasharray="3 3"/>
           <XAxis dataKey="name" />
           <YAxis />
           <Tooltip />
           <Area type="monotone" dataKey="uv" stroke="#FF0000" fill="#de4545" />
         </AreaChart>
        
       </ResponsiveContainer>
     </div>
       
     
     :
     <div className='areachartsize' >
     <ResponsiveContainer>
    
       <AreaChart 
         data={data1novalue}
         margin={{
           top: 10,
           right: 30,
           left: -30,
           bottom: 10,
           
         }}
         
       >
         <CartesianGrid strokeDasharray="3 3"/>
         <XAxis dataKey="name" />
         <YAxis />
         <Tooltip />
         <Area type="monotone" dataKey="uv" stroke="#FF0000" fill="#de4545" />
       </AreaChart>
      
     </ResponsiveContainer>
    </div>
      
   }
            </div>
      </div>
        
    </div>
    </Section>
  )
}

export default AdminStockCategory



const Section = styled.section`
  ${cardStyles};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .title {
    h2 {
      color: #ffc107;
      font-family: "Permanent Marker", cursive;
      letter-spacing: 0.3rem;
    }
  }
  .transactions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
    .transaction {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      &__title {
        display: flex;
        gap: 1rem;
        &__image {
          img {
            height: 2.5rem;
            border-radius: 3rem;
          }
          button {
            transition: 0.3s ease-in-out;
      font-size: 1.4rem;
      background-color: transparent;
          }
          &:hover {
            transform: translateX(0.5rem);
          }
        }
        &__details {
        }
      }
      &__amount {
        background-color: #d7e41e1d;
        padding: 0.2rem 0.5rem;
        width: 4rem;
        border-radius: 1rem;
        text-align: center;
        transition: 0.3s ease-in-out;
        &:hover {
          background-color: #ffc107;
          span {
            color: black;
          }
        }
        span {
          color: #ffc107;
        }
      }
    }
  }
  .view {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    text-decoration: none;
    color: #ffc107;
    font-weight: bold;
    margin-top: 1rem;
    gap: 0.5rem;
    svg {
      transition: 0.3s ease-in-out;
      font-size: 1.4rem;
    }
    &:hover {
      svg {
        transform: translateX(0.5rem);
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 375px) {
    .transactions {
      .transaction {
        flex-direction: column;
        align-items: center;
        gap: 1rem;
      }
    }
  }
`;
