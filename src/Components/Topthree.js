import { collection, getDocs, limit, limitToLast, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../FirebaseConfigs/firebaseConfig';
import Topthreecard from './Topthreecard';
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import './Topthree.css'

const Topthree = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

    const [topthree, settopthree] = useState([]);
    // search product title
    useEffect (() => {
      //const usersearch = item.toUpperCase();
      const topthreeArray = []
  
     const docRef = query(collection(db, "All-Added-Product", "products", "allproduct"),orderBy("numberofbuyers", "desc"), limit(10));
      getDocs(docRef).then((querySnapshot) => {
        querySnapshot.forEach((doc) =>{
            topthreeArray.push({id: doc.id, post: doc.data()})
        })
        settopthree(topthreeArray)
      }).catch('Error error error')
    }, [])

    const itemList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className='toptrending'>
      <div className='topcontainer'>
        <section className='topsection'>
          <div className='topdiv'>
            <div className='bah-heading'>
              <h2 className='topdivh2'>Top 10 Popular Product</h2>
            </div>
            <div></div>
          </div>
          <div>
            <div className='topdiv2'>
              <div className='topdiv3'>
                <div className='topdiv4'>
                <Carousel responsive={responsive}>
                {topthree.map((product) => (
                    <Topthreecard
                    item={0}
                    key={product.id} 
                    itemdata = {product}
                    />
                  ))}
                </Carousel>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Topthree
