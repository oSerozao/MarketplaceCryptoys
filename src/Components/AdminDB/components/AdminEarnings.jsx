import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AreaChart, Area, Tooltip, ResponsiveContainer, XAxis } from "recharts";
import { cardStyles } from "./AdminReusableStyles";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../../FirebaseConfigs/firebaseConfig";

export default function Earnings() {
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
  const data = [
    { 
      label: 'Resin',
      data: buyerresin 
    },
    {
      label: 'Figmas',
      data: buyerfigmas,
    },
    {
      label: 'Nendoroid',
      data: buyernendoroid,
    },
    {
      label: 'Scales',
      data: buyerscales,
    },
    {
      label: 'Other',
      data: buyerother,
    },
    
  ];
    const dataasd = [
      { name: 'Resin', value: buyerresin, fill: '#0088FE' },//blue
      { name: 'Figmas', value: buyerfigmas, fill: '#00C49F'},//light green
      { name: 'Nendoroid', value: buyernendoroid, fill: '#FFBB28'},//yellow
      { name: 'Scales', value: buyerscales, fill: '#FF8042'},//orange
      { name: 'Other', value: buyerother, fill: '#ff4242'},//red
    ];
    const datanovalue = [
        { name: 'Resin', value: 0, fill: '#0088FE' },
        { name: 'Figmas', value: 0, fill: '#00C49F'},
        { name: 'Nendoroid', value: 0, fill: '#FFBB28'},
        { name: 'Scales', value: 0, fill: '#FF8042'},
        { name: 'Other', value: 0, fill: '#ff4242'},
      ];

  return (
    <Section>
      <div className="top">
        <div className="info">
          <h5>Number of Buyer in Each Type</h5>
          <h1>Buyer Preferences</h1>
          <div className="growth">
            <span></span>
          </div>
        </div>
      </div>
      <div className="chart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={data}
            margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
          >
            <Tooltip cursor={false} />
            <XAxis dataKey="label" show={false} enabled={true}/>
            <Area
              animationBegin={800}
              animationDuration={2000}
              type="monotone"
              dataKey="data"
              stroke="#ffc107"
              fill="#8068233e"
              strokeWidth={4}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Section>
  );
}
const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 20rem;
  ${cardStyles}
  padding: 2rem 0 0 0;
  .top {
    .info {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.2rem;
      h1 {
        font-size: 2rem;
      }
      .growth {
        background-color: #d7e41e1d;
        padding: 0.5rem;
        border-radius: 1rem;
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
  .chart {
    height: 70%;
    .recharts-default-tooltip {
      background-color: black !important;
      border-color: black !important;
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
  }
`;
