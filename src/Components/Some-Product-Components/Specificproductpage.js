import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useParams, useNavigate, Link } from 'react-router-dom'
import { auth, db, storage } from '../../FirebaseConfigs/firebaseConfig'
import { doc, addDoc, getDoc, collection, query, where, getDocs, setDoc, deleteDoc, updateDoc, serverTimestamp, increment } from 'firebase/firestore'
import './Specificproductpage.css'
import ProductSlider from './ProductSlider';
import cod from './cod.png'
import replacement from './replacement.png'
import warranty from './warranty.png'
import Footer from '../Footer'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { FaStar } from "react-icons/fa";
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Specificproductpage = () => {
    const { type, id } = useParams()

    const [product, setProduct] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const navigate =useNavigate()

    const [producttitle, setProductTitle] = useState("");
    const [producttype, setProductType] = useState("");
    const [keyspecs, setKeyspecs] = useState("");
    const [description, setDescription] = useState("");
    const [brand, setBrand] = useState("");
    const [customersupport, setCustomersupport] = useState("");
    const [price, setPrice] = useState("");
    const [warranty, setWarranty] = useState("");
    const [productimage, setProductImage] = useState("");
    const [productnumber, setProductNumber] = useState("");

    const [imageError, setImageError] = useState('');

    const [uploadError, setUploadError] = useState('');
   // const [prodquantity, setProdQuantity] = useState(props.itemdata.quantity);
    function GetCurrentUser () {
      const[user,setUser] = useState ("");
      const usersCollectionRef = collection(db, "users");
      useEffect(() => {
        auth.onAuthStateChanged(userlogged => {
          if (userlogged) {
            // console.log(userlogged.email)
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

 function GetCurrentProduct() {
      // const productCollectionRef = collection(db, `products-${type.toUpperCase()}`);

      useEffect(() => {
        const getProduct = async () => {
          
          const docRef = doc(db, "All-Added-Product","products", `products-${type.toUpperCase()}`, id);
          const docSnap = await getDoc(docRef);
          
          setProduct(docSnap.data());
        };
        getProduct();
      }, [])
      return product
    }
    GetCurrentProduct();
    const currentprod = GetCurrentProduct();
    // console.log(currentprod)
    const prodrating = currentprod.productrating / currentprod.ratingnumber;
    let overallprodrating = parseInt(prodrating);

    let overalltax = 10/100;
    let overcommission = 10/100;
    let extraforfun = 10/100;

  
    let mrp = parseFloat(product.price);
    mrp = mrp + overalltax*mrp + overcommission*mrp + extraforfun*mrp
    const saleprice = mrp - extraforfun*mrp

    const addtocart = () => {
      const email1 = loggeduser[0].email
     
      if(loggeduser){
        
        addDoc(collection(db,"users", `${email1}`,"cart"),{
          product,quantity:1, timestamp: serverTimestamp(), idurl: currentprod.id1,
        })
        .then(() => {
          setSuccessMsg('Product added to cart');

        }).catch((error) => { setErrorMsg(error.message) });
        
      }
      else {
        setErrorMsg('You need to login first')
      }
    }
    
    const deletproductitem =  async () => {
      
      await deleteDoc(doc(db,"All-Added-Product","products", `products-${type.toUpperCase()}`,id))
      await deleteDoc(doc(db,"All-Added-Product","products", "allproduct",`${currentprod.id1}`))
      await deleteDoc(doc(db,"users", `${loggeduser[0].email}`,"listing",`${currentprod.producttype}${currentprod.producttitle}`))
      .then(() => {
        setSuccessMsg('Listed product deleted successfully, You will now be automatically redirected to home page.')
        setTimeout(() => {
          setSuccessMsg('');
          navigate('/home');
      }, 3000);
        console.log('Doc Deleted')
    }) 
  
  }

 /* const updateproduct = async () => {
    setProdQuantity(prodquantity + 1)

        const itemref = doc(db,"users", `${props.useremail}`,"cart",`${props.itemdata.id}`)
        await updateDoc(itemref, {
            quantity: prodquantity +1
        }).then(() => {console('changed  quantity')})
}
*/
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const [open, setOpen] = React.useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const [open1, setOpen1] = React.useState(false);

const handleClick1 = () => {
  setOpen1(true);
};

const handleClose1 = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpen1(false);
};
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  stars: {
    display: "flex",
    flexDirection: "row",
  },
  button: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    width: 300,
    padding: 10,
  }

};
  const stars = Array(5).fill(0)
  const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"
    
};

/*const EditImg = async (e) => {
  e.preventDefault();
  let providerRef = ref(db,"All-Added-Product","products", "allproduct",`${product.id1}`);
  const ref = ref(storage, `product-images${product.producttype.toUpperCase()}/${product.id1}`)
  await ref.putFile(productimage).then(() => {
    ref.getDownloadURL().then(
      img => {
        console.log('img', img);
        providerRef
          .update({
            productimage: img,
          })
          .then(() => console.log('saved to Db Successfully'));
      },
      error => console.log(error),
    );

  });
};*/

const EditImg = async (e) => {
  e.preventDefault();
  const storageRef = ref(storage, `product-images${product.producttype.toUpperCase()}/${product.id1}`)
  uploadBytes(storageRef, productimage)
  .then(() => {
    getDownloadURL(storageRef).then(url => {
      updateDoc (doc(db,"All-Added-Product","products", "allproduct",`${product.id1}`), {
        productimage: url
      }).then(() => console.log('saved to Db Successfully'));
    })
  })
}
const [updatestock, setUpdateStock] = useState('');

const handleupdatestock = async () => {
  const userref = doc(db, "users", `${product.email}`)
  const stocknegative = (updatestock - product.stock) * product.price;
  const stockpositive = Math.abs(stocknegative)
    setUpdateStock(updatestock)
    updateDoc(userref, {
      stock: updatestock,
      expenses: increment(stockpositive)
    }).then(() => {console.log('changed  quantity')})
    
}

const handleoverallstock = () => {
  const overstock = product.stock - updatestock
  let stock = Math.abs(overstock)
      if((product.producttype === 'Resin')) {
          updateDoc(doc(db,"All-Added-Product","products"), {
                RESIN: increment(stock)
          }).then(() => {
                        navigate('/')
                    })
        }
        else if ((product.producttype === 'Figmas')){
          updateDoc(doc(db,"All-Added-Product","products"), {
            FIGMAS: increment(stock)
          }).then(() => {
            navigate('/')
        })
        }
        else if ((product.producttype === 'Nendoroid')){
          updateDoc(doc(db,"All-Added-Product","products"), {
                NENDOROID: increment(stock)
            }).then(() => {
                navigate('/')
            })
        }
        else if ((product.producttype === 'Scales')){
             setDoc(doc(db,"All-Added-Product","products"), {
                SCALES: increment(stock)
            }).then(() => {
                navigate('/')
            })
        }
        else {
            addDoc(doc(db,"All-Added-Product","products"), {
                OTHER: increment(stock)
            }).then(() => {
                navigate('/')
            })
    }
}

const updateproduct = async () => {
       
  const itemref = doc(db,"All-Added-Product","products", "allproduct",`${product.id1}`)
  const itemref1 = doc(db,"All-Added-Product","products", `products-${product.producttype.toUpperCase()}`,`${product.id1}`)
  const itemref2 = doc(db,"users", `${product.email}`,"listing",`${product.id1}`)

  if((producttitle === '') || (keyspecs === '') || (description === '') || (price === '') || (warranty === '')) {
    console.log('Wrong Input')
  }
  else {
    updateDoc(itemref, {//productrating
      producttitle: producttitle,
      keyspecs: keyspecs,
      description: description,
      price: price,
      warranty: warranty,
      stock: updatestock
    }) &&
    updateDoc(itemref1, {//productrating
      producttitle: producttitle,
      keyspecs: keyspecs,
      description: description,
      price: price,
      warranty: warranty,
      stock: updatestock
    }) &&
    updateDoc(itemref2, {//productrating
      producttitle: producttitle,
      keyspecs: keyspecs,
      description: description,
      price: price,
      warranty: warranty,
      stock: updatestock
    }).then(() => {console.log('changed  quantity')})
  }
}
const [state, setState] = React.useState({
  open: false,
  vertical: 'top',
  horizontal: 'center',
});
const style3 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

  const [open3, setOpen3] = React.useState(false);
  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => setOpen3(false);
const { vertical, horizontal, open2 } = state;

const types = ['image/jpg', 'image/jpeg', 'image/png', 'image/PNG']

const handleProductImg = (e) => {
    e.preventDefault();
    let selectedFile = e.target.files[0];

    if(selectedFile){
        if(selectedFile && types.includes(selectedFile.type)){
            setProductImage(selectedFile);
            setImageError('')
        }
        else {
            setProductImage(null)
            setImageError('Please Select a Valid Image File Type(png or jpg')
        }
    }
    else{
        setImageError('Please Select a File')
    }
    
}
const [openoutofstock, setOpenoutofstock] = React.useState(false);

const handleClickoutofstock = () => {
  setOpenoutofstock(true);
};

const handleCloseoutofstock = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpenoutofstock(false);
};
  return (
    <div>
    <Navbar />
    {product ? <div className='myprod-container'>
      <div className='prod-img-cont'>
        <img src={product.productimage} />
        {loggeduser && loggeduser[0].email == currentprod.email ? 
        <div>
        <Button onClick={handleOpen3}>Change Image</Button>
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open3}
      onClose={handleClose3}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open3}>
        <Box sx={style3}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Change Product Display Image
          </Typography>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
          <label>Image</label>
              <input onChange={handleProductImg} type="file" />
              {imageError && <>
                  <div className="error-msg">{imageError}</div>
              </>}
              <Button onClick={EditImg}>Confirm</Button>
          </Typography>
        </Box>
      </Fade>
    </Modal>
    </div>
        :
        <></>
        }
      </div>
      <div className='prod-data'>
        <p className='prod-head'>{product.producttitle}</p> 
        <a href={`/users/${product.email}`} className='prod-keyspecs stylenone'>{product.email}</a> 
        <p className='prod-keyspecs'>{product.keyspecs}</p>

        <div className='specific-price-container'>
          <p className='mrp'>MRP: <p className='rate'>₱{mrp}</p></p>
          <p className='saleprice'>Discount Price: <p className='rate'>₱{saleprice}</p></p>
          <p className='yousave'>You Save: ₱{mrp - saleprice}</p>
          <p className='yousave'>Stock: {product.stock}</p>
        </div>
        {loggeduser && loggeduser[0].email == currentprod.email ? 
        <span className='buy-cart'><button className='btn' onClick={deletproductitem}>Delete</button>
        <div>
      <Button onClick={handleOpen}>Edit</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h5" component="h2" >
              Edit Product
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              
            <TextField onChange={(e) => setProductTitle(e.target.value)} id="outlined-basic" placeholder={product.producttitle} variant="outlined" sx={{ width: "100%", mt: 1 }} helperText="Product Title"/>
            <TextField onChange={(e) => setKeyspecs(e.target.value)} id="outlined-multiline-flexible" multiline maxRows={10} placeholder={product.keyspecs} variant="outlined" sx={{ width: "100%" , mt: 1 }} helperText="Product Keyspecs"/>
            <TextField onChange={(e) => setDescription(e.target.value)} id="outlined-multiline-flexible" multiline maxRows={10} placeholder={product.description} variant="outlined" sx={{ width: "100%", mt: 1 }} helperText="Product Description"/>
            <TextField onChange={(e) => setPrice(e.target.value)} id="outlined-basic" placeholder={product.price} variant="outlined" sx={{ width: "100%", mt: 1 }} type='number' helperText="Product Price"/>
            <TextField onChange={(e) => setUpdateStock(e.target.value)} id="outlined-basic" placeholder={product.stock} variant="outlined" sx={{ width: "100%", mt: 1 }} type='number' helperText="Stock"/>
            <TextField onChange={(e) => setWarranty(e.target.value)} id="outlined-basic" placeholder={product.warranty} variant="outlined" sx={{ width: "100%" , mt: 1}} helperText="Product Warranty"/>
            </Typography>
            <Button onClick={() => {updateproduct(); handleupdatestock(); handleoverallstock(); handleClick1({ vertical: 'bottom', horizontal: 'left', });}}>Confirm</Button>
            {producttitle === '' || keyspecs === '' || description === '' || price === '' || warranty === '' || updatestock === '' ?
        <Snackbar open={open1} autoHideDuration={6000} sx={{ width: '90%' }} onClose={() => { handleClose1();}} key={vertical + horizontal} anchorOrigin={{ vertical, horizontal }}>
        <Alert onClose={() => { handleClose1();}} severity="warning" sx={{ width: '100%' }}>
          Please Fill up Required Requirements!
        </Alert>
      </Snackbar>:
            <Snackbar open={open1} autoHideDuration={6000} sx={{ width: '80%' }} onClose={() => { handleClose1();}} key={vertical + horizontal} anchorOrigin={{ vertical, horizontal }}>
        <Alert onClose={() => { handleClose1(); handleClose();}} severity="success" sx={{ width: '100%' }}>
          Success! The product is updated!
        </Alert>
      </Snackbar>}
            
          </Box>
        </Fade>
      </Modal>
    </div>
    </span>
        
        : <div></div>
      }
        

        <p className='prod-details-head'>Details</p>
        <p className='prod-description'>{product.description}</p>

        <div className='row-cont'>
          <div className='warranty-replacement'>
          <div className='cod'>
            <div className='img-circle'>
              <img src={cod} />
            </div>
            <p>Cash on Delivery</p>
          </div>
            <div className='warranty'>
              <div className='img-circle'>
                <img src={warranty}/>
              </div>
              <p>{product.warranty} year warranty</p>
            </div>

            <div className='replacement'>
              <div className='img-circle'>
                <img src={replacement}/>
              </div>
              <p>10 Days warranty</p>
            </div>
        </div>
          <div className='buy-cart'>
            {product.stock <= 0  ?
            <div><button className='btn' onClick={handleClickoutofstock}>Add to Cart</button >
            <Snackbar open={openoutofstock} autoHideDuration={6000} onClose={handleCloseoutofstock}>
      <Alert onClose={handleCloseoutofstock} severity="error" sx={{ width: '100%' }}>
        This product is out of stock!
      </Alert>
    </Snackbar>
    </div>:
            <div>
              {loggeduser && product.email !== loggeduser[0].email  ?
      <div>
      <button className='btn' onClick={addtocart}>Add to Cart</button>
    </div>
              :
              <></>}</div>}
              
          </div>
          <div>
    </div>
        </div>
        {successMsg && <>
            <div className='success-msg'>{successMsg}</div>
        </>}
        {errorMsg && <>
            <div className='error-msg'>{errorMsg}</div>
        </>}
        <div>
        <div style={styles.container}>
      <h2> Rating of {product.producttitle}:</h2>
      <div style={styles.stars}>
        {stars.map((_, index) => {
          return (
            <FaStar
              key={index}
              size={24}
              color={(overallprodrating) > index ? colors.orange : colors.grey}
              style={{
                marginRight: 10,
                cursor: "pointer"
              }}
            />
          )
        })}
      </div>
        </div>
        </div>
      </div>

    </div> : <div>Loading...</div>
    }
    <p className='prod-details-head2'>Similar Items</p>
    <ProductSlider type={type}></ProductSlider>
    <Footer/>
    </div>
    
  )
}

export default Specificproductpage