import React from 'react'
import { Link } from 'react-router-dom';
import './Sliderproductcard.css'

const Sliderproductcard = (product) => {
  let p = product.product
  let overalltax = 10/100;
  let overcommission = 10/100;
  let extraforfun = 10/100;

  let mrp = parseFloat(p.price);
  mrp = mrp + overalltax*mrp + overcommission*mrp + extraforfun*mrp
  const saleprice = mrp - extraforfun*mrp

  return (
    <div className='productslide'>
    <div className="productslider">
    <div className='productslider1'>
      <img src={p.productimage} className='productslider2'/>
      <a className='productslider3' href={`/product/${p.producttype}/${p.id}`}></a>
    </div>
    <div className='productslider4'>
      <h3 className='productslider5'>
        <a className='productslider6' href={`/product/${p.producttype}/${p.id}`}>{p.producttitle}</a>
      </h3>
      <div className='productslider7'>
        <span className='productslider8'>₱{p.price}.00</span>
        <span className='productslider9'></span>
        <span className='productslider10'>Order Now!</span>
      </div>
    </div>
    <div className='productslider11'></div>
    </div>
    </div>

  )
}

export default Sliderproductcard