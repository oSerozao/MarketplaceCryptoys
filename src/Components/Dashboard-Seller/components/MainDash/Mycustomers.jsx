import React, { useState, useEffect} from "react"
import { auth, db } from "../../../../FirebaseConfigs/firebaseConfig";
import { collection, getDocs, query, where, setDoc, doc, addDoc, orderBy } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Sidebar from '../Sidebar';
import RightSide from '../RigtSide/RightSide';
import './App1.css'
import Mycustomercard from "./Mycustomercard";

const Mycustomers = () => {
  function GetCurrentUser () {
    const[user,setUser] = useState (null);
    const usersCollectionRef = collection(db, "users");
    useEffect(() => {
      auth.onAuthStateChanged(userlogged=>{
        if(userlogged){
          // console.log(userlogged.email)
          const getUsers = async () => {
            const q = query(collection(db, "users"),where("uid","==",userlogged.uid))
            console.log(q);
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
    // if (loggeduser) { console.log(loggeduser[0].email) }
    const [buyerdata, setbuyerdata] = useState([]);

if (loggeduser) {
const getbuyerdata = async () => {
  const buyerdataArray = [];
  const email1 = loggeduser[0].email
  
  // console.log(path)
  getDocs(collection(db,"users", `${email1}`,"buyerorders"), orderBy('timestamp', 'desc')).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      buyerdataArray.push({ ...doc.data(), id: doc.id})
    });
    setbuyerdata(buyerdataArray)
    // console.log('done')
  }).catch('Error error error')

}
getbuyerdata()
}
  return (
    <div>
    <div className="App">
        <div className="AppGlass">
        <Sidebar/>
      {buyerdata.length != 0 ? <div>
            <div className='cart-head'>My Customer</div>
            <div className='allcartitems'>
              {buyerdata.map((item) => (
                <Mycustomercard
                key={item.id} 
                itemdata = {item}
                loggeduser = {loggeduser}
                userid={loggeduser[0].uid} 
                useremail={loggeduser[0].email}
                userusername={loggeduser[0].username}
                usernumber={loggeduser[0].phonenumber}
                useraddress={loggeduser[0].address}
                />
              ))}
            </div>
      </div>

      : <p>No Customer Yet</p>}
  </div></div></div>
  )
}

export default Mycustomers