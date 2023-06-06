import React, { useEffect, useState} from 'react'
import { doc, getDoc, where } from 'firebase/firestore';
import { db } from '../../../../FirebaseConfigs/firebaseConfig';

import './Myproducts.css'
const Myproductcard = (product) => {
    let p = product.product
    // console.log(p)
    let overalltax = 10/100;
    let overcommission = 10/100;
    let extraforfun = 10/100;

    let mrp = parseFloat(p.price);
    
    mrp = mrp + overalltax*mrp + overcommission*mrp + extraforfun*mrp
    const saleprice = mrp - extraforfun*mrp


  return (
    <div className='bodymyproduct'>
        {p.email == product.useremail ?
        <div className='product-container1'>
        <img src={p.productimage} />
        <div className='product-details1'>
            <a href={`/product/${p.producttype}/${p.id}`}>
            <button className='producttitle1'>{p.producttitle}</button>
            </a>
            <div className='price-container1'>
                <p className='mrp1'>MRP: <p className='rate1'>₱{mrp}</p></p>
                <p className='saleprice1'>Discount: <p className='rate1'>₱{saleprice}</p></p>
                <p className='yousave1'>You Save: ₱{mrp - saleprice}</p>
            </div>
            <a href={`/product/${p.producttype}/${p.id1}`}>
                <button className='showmore1-btn'>More Details &gt;</button>
            </a>
        </div>
    </div>
    : <div></div>}
    </div>
  )
}

export default Myproductcard