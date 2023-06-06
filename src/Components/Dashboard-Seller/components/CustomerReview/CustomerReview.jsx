import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { db } from "../../../../FirebaseConfigs/firebaseConfig";


const CustomerReview = () => {
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

  const [topthree, settopthree] = useState([]);
    // search product title
    useEffect (() => {
      //const usersearch = item.toUpperCase();
      const topthreeArray = []
  
     const docRef = query(collection(db, "All-Added-Product", "products", "allproduct"));
      getDocs(docRef).then((querySnapshot) => {
        querySnapshot.forEach((doc) =>{
            topthreeArray.push({id: doc.id, post: doc.data()})
        })
        settopthree(topthreeArray)
      }).catch('Error error error')
    }, [])

  const data = {
    series: [
      {
        name: "Number of Buyer",
        data: [`${overstock.RESINnumberofbuyer}`, `${overstock.FIGMASnumberofbuyer}`, `${overstock.SCALESnumberofbuyer}`, `${overstock.NENDOROIDnumberofbuyer}`, `${overstock.OTHERnumberofbuyer}`],
      },
    ],
    options: {
      chart: {
        type: "area",
        height: "auto",
      },

      fill: {
        colors: ["#fff"],
        type: "gradient",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        colors: ["#ff929f"],
      },
      tooltip: {
        x: {
          
          show: false,
        },
      },
      grid: {
        show: false,
      },
      xaxis: {
        categories: [
          "Resin",
          "Figmas",
          "Scales",
          "Nendoroid",
          "Other"
        ],
      },
      yaxis: {
        show: false
      },
      toolbar:{
        show: false
      }
    },
  };
  const data1 = {
    series: [
      {
        name: "Number of Buyer",
        data: [0,0,0,0,0],
      },
    ],
    options: {
      chart: {
        type: "area",
        height: "auto",
      },

      fill: {
        colors: ["#fff"],
        type: "gradient",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        colors: ["#ff929f"],
      },
      tooltip: {
        x: {
          
          show: false,
        },
      },
      grid: {
        show: false,
      },
      xaxis: {
        categories: [
          "Resin",
          "Figmas",
          "Scales",
          "Nendoroid",
          "Other"
        ],
      },
      yaxis: {
        show: false
      },
      toolbar:{
        show: false
      }
    },
  };
  return <div className="CustomerReview">
    {topthree.length > 0  ? 
        <Chart options={data.options} series={data.series} type="area" />:
        <Chart options={data1.options} series={data1.series} type="area" />}
  </div>;
};

export default CustomerReview;
