import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../FirebaseConfigs/firebaseConfig';
import './Topthree.css'
const Topthreecard = (props) => {
    const [searchdata, setsearchdata] = useState([]);
    /*const getsearchdata = async () => {
        const searchdataArray = [];
        
        // console.log(path)
        getDoc(doc(db, "All-Added-Product", "products", "allproduct",props.itemdata.id)).then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // console.log(doc.id, " => ", doc.data());
            searchdataArray.push({ ...doc.data(), id: doc.id})
          });
          setsearchdata(searchdataArray)
          // console.log('done')
        }).catch('Error error error')
      }
      getsearchdata()
      const searchsolo = getsearchdata();*/

      function GetCurrentSearch() {
        // const productCollectionRef = collection(db, `products-${type.toUpperCase()}`);
  
        useEffect(() => {
          const getsearchdata = async () => {
            
            const docRef = doc(db, "All-Added-Product", "products", "allproduct",props.itemdata.id);
            const docSnap = await getDoc(docRef);
            
            setsearchdata(docSnap.data());
          };
          getsearchdata();
        }, [])
        return searchdata
      }
      GetCurrentSearch();
      const searchsolo = GetCurrentSearch();
      const num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const num2x = num.map((n) => n);
//console.log(props.key+1)
  return (
    <div className='topcarddiv'>
      <div className='topcarddiv1'>
        <div className='topcarddiv2'>
          <span className='topcarddiv3'>##</span>
          <div className='topcarddiv4'>{searchsolo.producttitle}</div>
        </div>
        <a className='topcarddiv5'>
          <img className='topcarddiv6' src={searchsolo.productimage}/>
        </a>
        <div></div>
      </div>
    </div>
    
  )
}

export default Topthreecard