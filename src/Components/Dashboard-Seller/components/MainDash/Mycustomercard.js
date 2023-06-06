import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../../../FirebaseConfigs/firebaseConfig';
import defaultimg from './default.png'
const Mycustomercard = (props) => {
    const [specificuser, setSpecificUser] = useState('');
    function GetSpecificUser() {
        // const productCollectionRef = collection(db, `products-${type.toUpperCase()}`);
  
        useEffect(() => {
          const getSpecificUser = async () => {
            
            const docRef = doc(db, "users", props.itemdata.buyeremail);
            const docSnap = await getDoc(docRef);
            
            setSpecificUser(docSnap.data());
          };
          getSpecificUser();
        }, [])
        return specificuser
      }
      GetSpecificUser();
      const currentuser = GetSpecificUser();

      var stringified = props.itemdata.timestamp.toDate().toISOString();
      //console.log(stringified);
      var split1 = stringified.split('T');
      var date = split1[0].replace(/\-/g, ' ');
  return (
    <div>
        <div className='cart-prod-container'>
<div className='cart-prod-imgtitle'>
            {currentuser.profileimage === '' ?
            <div className='prod-image'><img src={defaultimg} /></div>:
            <div className='prod-image'><img src={currentuser.profileimage} /></div>}
            <a className='stylenone prod-title' href={`/users/${currentuser.email}`}>{currentuser.username}</a>&nbsp;
            <a  className='prod-title' href={`/users/${currentuser.email}`}>{currentuser.email}</a>
        </div>
        <div>{date}</div>
        </div>
    </div>
  )
}

export default Mycustomercard