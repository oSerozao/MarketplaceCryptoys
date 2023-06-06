import React, { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { auth, db } from '../../../../FirebaseConfigs/firebaseConfig'
import { collection, getDoc, doc, getDocs, query, where, orderBy } from 'firebase/firestore'
import MyCartCard from './MyCartCard'
import Sidebar from '../Sidebar'

const Mycart = () => {
  const { type, id } = useParams()

function GetCurrentUser () {
  const[user,setUser] = useState ("")
  const usersCollectionRef = collection(db, "users")
  useEffect(() => {
    auth.onAuthStateChanged(userlogged=>{
      if(userlogged){
        // console.log(userlogged.email)
        const getUsers = async () => {
          const q = query(collection(db, "users"),where("uid","==",userlogged.uid))
          // console.log(q)
        const data = await getDocs(q);
        setUser(data.docs.map((doc) =>({...doc.data(),id:doc.id})));
        };
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

const [cartdata, setcartdata] = useState([]);

if (loggeduser) {
const getcartdata = async () => {
  const cartArray = [];
  const email1 = loggeduser[0].email
  
  // console.log(path)
  getDocs(collection(db,"users", `${email1}`,"cart"), orderBy('timestamp', 'desc')).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      cartArray.push({ ...doc.data(), id: doc.id})
    });
    setcartdata(cartArray)
    // console.log('done')
  }).catch('Error error error')
}
getcartdata()
}


return (
  <div className="App">
          <div className="AppGlass">
          <Sidebar/>
      {cartdata.length != 0 ? <div>
            <div className='cart-head'>Your Cart Items</div>
            <div className='allcartitems'>
              {cartdata.map((item) => (
                <MyCartCard
                key={item.id} 
                itemdata = {item}
                userid={loggeduser[0].uid} 
                useremail={loggeduser[0].email}
                userusername={loggeduser[0].username}
                usernumber={loggeduser[0].phonenumber}
                useraddress={loggeduser[0].address}
                />
              ))}
            </div>
            <div className='proceed'>
              <button>Proceed</button>
            </div>
      </div>

      : <div class="container-fluid  mt-100">
      <div class="row">
      
       <div class="col-md-12">
       
           <div class="card">
         <div class="card-header">
         <h5 className='textcolorcart'>Cart Item List</h5>
         </div>
         <div class="card-body cart">
             <div class="col-sm-12 empty-cart-cls text-center">
               <img src="https://i.imgur.com/dCdflKN.png" width="130" height="130" class="img-fluid mb-4 mr-3"/>
               <h3 className='textcolor'><strong>Your Cart is Empty</strong></h3>
               <h4 className='textcolor'>Looks like you have not added anything to your cart. Go ahead & explore top categories.</h4>
               <a href="/" class="btn btn-primary cart-btn-transform m-3" data-abc="true">Continue Shopping</a>
               
             
             </div>
         </div>
     </div>
         
       
       </div>
      
      </div>
     
     </div>}
      </div>
  </div>
)
}

export default Mycart