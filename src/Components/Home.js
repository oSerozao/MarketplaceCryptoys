import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Productpage from './Some-Product-Components/Productpage'
import Banner from './Banner'
import { auth, db } from '../FirebaseConfigs/firebaseConfig'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import ProductSlider from './Some-Product-Components/ProductSlider'
import './Home.css'
import Footer from './Footer'
import { PureComponent } from 'react'
import { ResponsiveContainer, PieChart, Pie, Legend } from 'recharts';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Topthree from './Topthree'
const Home = () => {
  function GetCurrentUser () {
    const[user,setUser] = useState ('')
    const usersCollectionRef = collection(db, "users")

    useEffect(() => {
      auth.onAuthStateChanged(userlogged=>{
        if(userlogged){
          console.log(userlogged.email)
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
/*if (loggeduser) { console.log(loggeduser[0].email,loggeduser[0].uid.charCodeAt(0),
  loggeduser[0].uid.charCodeAt(1),
  loggeduser[0].uid.charCodeAt(2),
  loggeduser[0].uid.charCodeAt(3),
  loggeduser[0].uid.charCodeAt(4),
  loggeduser[0].uid.charCodeAt(5),
  loggeduser[0].uid.charCodeAt(6),
  loggeduser[0].uid.charCodeAt(7),
  loggeduser[0].uid.charCodeAt(8),
  loggeduser[0].uid.charCodeAt(9),
  loggeduser[0].uid.charCodeAt(10),
  loggeduser[0].uid.charCodeAt(11),
  loggeduser[0].uid.charCodeAt(12),
  loggeduser[0].uid.charCodeAt(13),
  loggeduser[0].uid.charCodeAt(14),
  loggeduser[0].uid.charCodeAt(15),
  loggeduser[0].uid.charCodeAt(16),
  loggeduser[0].uid.charCodeAt(17),
  loggeduser[0].uid.charCodeAt(18),
  loggeduser[0].uid.charCodeAt(19),
  loggeduser[0].uid.charCodeAt(20),
  loggeduser[0].uid.charCodeAt(21),
  loggeduser[0].uid.charCodeAt(22),
  loggeduser[0].uid.charCodeAt(23),
  loggeduser[0].uid.charCodeAt(24),
  loggeduser[0].uid.charCodeAt(25),
  loggeduser[0].uid.charCodeAt(26),
  loggeduser[0].uid.charCodeAt(27),
  ) }*/
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
    { name: 'Resin', value: buyerresin, fill: '#0088FE' },//blue
    { name: 'Figmas', value: buyerfigmas, fill: '#00C49F'},//light green
    { name: 'Nendoroid', value: buyernendoroid, fill: '#FFBB28'},//yellow
    { name: 'Scales', value: buyerscales, fill: '#FF8042'},//orange
    { name: 'Other', value: buyerother, fill: '#ff4242'},//red
  ];
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
  const datanovalue = [
    { name: 'Resin', value: 0, fill: '#0088FE' },
    { name: 'Figmas', value: 0, fill: '#00C49F'},
    { name: 'Nendoroid', value: 0, fill: '#FFBB28'},
    { name: 'Scales', value: 0, fill: '#FF8042'},
    { name: 'Other', value: 0, fill: '#ff4242'},
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
    <div className='homebody'>
        <Navbar />
        <Banner />
        <Topthree/>
        <div className='homecontainer'>
  <div className='homecontainer1'>
    <div className='homecontainer2'>
      <div></div>
      <section className='homecontainer3'>
      <div className='homeproduct3'>
                <div className='homeproduct33'>
                  <h2 className='homeproduct4'>
                    Resin
                  </h2>
                </div>
                <div className='homeproduct5'>
                  <a className='homeproduct6' href='/product-type/resin'>View More
                  <i className='homeproduct7'>
                    </i></a>
                </div>
                <div style={{display: "block", clear: "both"}}>
                </div>
              </div>
        <div className='homecontainer7'>
          <div className='homecontainer8'>
            <div className='homecontainer9'>
    
            <ProductSlider type={'Resin'} />
            </div>
          </div>
        </div>

        <div className='homeproduct3'>
                <div className='homeproduct33'>
                  <h2 className='homeproduct4'>
                    Figmas
                  </h2>
                </div>
                <div className='homeproduct5'>
                  <a className='homeproduct6' href='/product-type/resin'>View More
                  <i className='homeproduct7'>
                    </i></a>
                </div>
                <div style={{display: "block", clear: "both"}}>
                </div>
              </div>
        <div className='homecontainer7'>
          <div className='homecontainer8'>
            <div className='homecontainer9'>
    
            <ProductSlider type={'Figmas'} />
            </div>
          </div>
        </div>

        <div className='homeproduct3'>
                <div className='homeproduct33'>
                  <h2 className='homeproduct4'>
                    Scales
                  </h2>
                </div>
                <div className='homeproduct5'>
                  <a className='homeproduct6' href='/product-type/resin'>View More
                  <i className='homeproduct7'>
                    </i></a>
                </div>
                <div style={{display: "block", clear: "both"}}>
                </div>
              </div>
        <div className='homecontainer7'>
          <div className='homecontainer8'>
            <div className='homecontainer9'>
    
            <ProductSlider type={'Scales'} />
            </div>
          </div>
        </div>

        <div className='homeproduct3'>
                <div className='homeproduct33'>
                  <h2 className='homeproduct4'>
                    Nendoroid
                  </h2>
                </div>
                <div className='homeproduct5'>
                  <a className='homeproduct6' href='/product-type/resin'>View More
                  <i className='homeproduct7'>
                    </i></a>
                </div>
                <div style={{display: "block", clear: "both"}}>
                </div>
              </div>
        <div className='homecontainer7'>
          <div className='homecontainer8'>
            <div className='homecontainer9'>
    
            <ProductSlider type={'Nendoroid'} />
            </div>
          </div>
        </div>

        <div className='homeproduct3'>
                <div className='homeproduct33'>
                  <h2 className='homeproduct4'>
                    Other
                  </h2>
                </div>
                <div className='homeproduct5'>
                  <a className='homeproduct6' href='/product-type/resin'>View More
                  <i className='homeproduct7'>
                    </i></a>
                </div>
                <div style={{display: "block", clear: "both"}}>
                </div>
              </div>
        <div className='homecontainer7'>
          <div className='homecontainer8'>
            <div className='homecontainer9'>
    
            <ProductSlider type={'Other'} />
            </div>
          </div>
        </div>
      </section>
      </div>
  </div>
</div>

        <Footer />
    </div>
  )
}

export default Home
/*
<section className='homesidebar'>
        <div className='homesidebar1'>
          <div className='homesidebar2'>
            <div className='homesidebar3'>
              <h2 className='homeproduct4'>Category Stock Chart</h2>
            </div>
            <div></div>
          </div>
          <div className='blokc_area-content'>
            <div className='homesidebar4'>
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
           data={datanovalue}
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
      </section>
      <section className='homesidebar'>
        <div className='homesidebar1'>
          <div className='homesidebar2'>
            <div className='homesidebar3'>
              <h2 className='homeproduct4'>Buyer Preference Chart</h2>
            </div>
            <div></div>
          </div>
          <div className='blokc_area-content'>
            <div className='homesidebar4'>
            <ul className='chartsul'>
                <li className='chartsil'><span style={{color: '#0088FE'}}>Blue: <span className='productslider66'>Resin</span></span></li>
                <li className='chartsil'><span style={{color: '#00C49F'}}>Green: <span className='productslider66'>Figmas</span></span></li>
                <li className='chartsil'><span style={{color: '#FF8042'}}>Orange: <span className='productslider66'>Scales</span></span></li>
                <li className='chartsil'><span style={{color: '#FFBB28'}}>Yellow: <span className='productslider66'>Nendoroid</span></span></li>
                <li className='chartsil'><span style={{color: '#ff4242'}}>Red: <span className='productslider66'>Other</span></span></li>
              </ul>
            {dataforstock.length > 0 ?
       <div className='piechartsize'>
          <ResponsiveContainer>
           <PieChart>
             <Pie dataKey="value"  data={data} fill="#0088FE" label />
           </PieChart>
         </ResponsiveContainer>
       </div>
       :
       
      <div className='piechartsize' >
       
        <ResponsiveContainer>
          <PieChart>
            <Pie dataKey="value"  data={datanovalue} fill="#0088FE" label />
          </PieChart>
        </ResponsiveContainer>
      </div>}
            </div>
          </div>
        </div>
      </section>*/