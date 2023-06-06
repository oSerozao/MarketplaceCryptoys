import React from 'react'

const Editproduct = () => {
  return (
    {props.itemdata.ordercondition !== 'confirmed' && props.itemdata.prodrateequal === 0 && props.itemdata.userrateequal === 0? 
    <div>
      <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Order is in Progress...
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
      </Box>
    </Modal>
    </div>
  :
  <div>
    {props.itemdata.ordercondition === 'confirmed' && props.itemdata.prodrateequal !== 0 && props.itemdata.userrateequal !== 0 ? 
    <div>
      <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Order is Confirmed and Rating Done.
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Duis
        </Typography>
        <div style={styles.container}>
    <h2> Rate <a className='stylenone' href={`/product/${props.itemdata.producttype}/${props.itemdata.productuid}`}>{props.itemdata.productitle}</a></h2>
    <div style={styles.stars}>
      {stars.map((_, index3) => {
        return (
          <FaStar
            key={index3}
            size={24}
            color={(props.itemdata.prodrateequal) > index3 ? colors.orange : colors.grey}
            style={{
              marginRight: 10,
              cursor: "pointer"
            }}
          />
        )
      })}
    </div>
    <h2> Rate <a className='stylenone' href={`/users/${props.itemdata.productusername}`}>{props.itemdata.productusername}</a></h2>
    <div style={styles.stars}>
      {stars1.map((_, index4) => {
        return (
          <FaStar
            key={index4}
            size={24}
            color={(props.itemdata.userrateequal) > index4 ? colors.orange : colors.grey}
            style={{
              marginRight: 10,
              cursor: "pointer"
            }}
          />
        )
      })}
    </div>
  </div>
        
      </Box>
    </Modal>
    </div>
  :
  <div>
    <div>
      <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Order is Confirmed and Please Rate.
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
        
        <div style={styles.container}>
    <h2> Rate <a className='stylenone' href={`/product/${props.itemdata.producttype}/${props.itemdata.productuid}`}>{props.itemdata.productitle}</a></h2>
    <div style={styles.stars}>
      {stars.map((_, index) => {
        return (
          <FaStar
            key={index}
            size={24}
            onClick={() => handleClick(index + 1)}
            onMouseOver={() => handleMouseOver(index + 1)}
            onMouseLeave={handleMouseLeave}
            onChange={(e) => setCurrentValue(e.target.value)}
            color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
            style={{
              marginRight: 10,
              cursor: "pointer"
            }}
          />
        )
      })}
    </div>
    <h2> Rate <a className='stylenone' href={`/users/${props.itemdata.productusername}`}>{props.itemdata.productusername}</a> </h2>
    <div style={styles.stars}>
      {stars1.map((_, index1) => {
        return (
          <FaStar
            key={index1}
            size={24}
            onClick={() => handleClick1(index1 + 1)}
            onMouseOver={() => handleMouseOver1(index1 + 1)}
            onMouseLeave={handleMouseLeave1}
            onChange={(e) => setCurrentValue1(e.target.value)}
            color={(hoverValue1 || currentValue1) > index1 ? colors.orange : colors.grey}
            style={{
              marginRight: 10,
              cursor: "pointer"
            }}
          />
        )
      })}
    </div>
    {currentValue === 0 || currentValue1 === 0 ?
    <div>
      <Button variant="outlined" onClick={handleClickOpen1}>
      Submit
    </Button>
    <Dialog
      open={open1}
      onClose={handleClose1}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Please Rate"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Plase rate the product and the vendor.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose1} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
    </div>:
    <div><button  onClick={() => {  handleRating(); handleClose(); }}
    style={styles.button}
  >
    Submit
  </button></div>}   
  </div>
      
      </Box>
    </Modal>
    </div></div>}
    </div>}
  )
}

export default Editproduct