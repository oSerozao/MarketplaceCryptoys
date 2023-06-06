import React, { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { auth, db } from '../../../../FirebaseConfigs/firebaseConfig'
import { collection, getDoc, doc, getDocs, query, where, orderBy } from 'firebase/firestore'
import Myordercard from './Myordercard'
import Sidebar from '../Sidebar'

const Myorder = () => {
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
            <div className='cart-head'>Your Orders</div>
            <div className='allcartitems'>
              {buyerdata.map((item) => (
                <Myordercard
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

      : <p>Your Order is Empty</p>}
  </div></div></div>
)
}

export default Myorder