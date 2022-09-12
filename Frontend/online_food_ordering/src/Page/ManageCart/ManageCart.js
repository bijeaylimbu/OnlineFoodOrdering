
import { useState } from "react";
import "../ManageCart/ManageCart.scss"
import { Button } from "@material-ui/core";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import { BiPurchaseTag } from "react-icons/bi";
import { IconButton } from '@mui/material';
import { Link } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
export default function ManageCart() {
    const [cart, setCart] = useState([]);
    const [open, setOpen] = useState(false);
    const getData = async () => {
        const response = await fetch(`https://localhost:7288/api/get-all-cart?email=${localStorage.getItem("email")}`)
            .then((response) => response.json());
        setCart(response);
    }

    useState(() => {
        getData();
    }, [])
    const deleteCartItem = (id) => {
        // setOpen(true);
        const response = axios.delete(`https://localhost:7288/api/delete-cart-item?cartId=${id}`
        )
        setOpen(false);
        window.location.reload();
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <div className="history-purchase-div">
                <Link to="/purchase-history" style={{ textDecoration: 'none', color: "black" }}>
                    <IconButton>   History Purchase</IconButton>
                </Link>
            </div>
            <div>
                {/* <ul className="cart-items"> */}
                {cart.map((item) => (
                    <div className="items-info">
                        <div className="product-img">
                            <img src={item.image} />
                        </div>

                        <div className="title">
                            <h5>{item.productName}</h5>
                        </div>
                        <div className="price">
                            <h5>{item.price}</h5>
                        </div>
                        <div className="remove-item">
                            <AiFillDelete onClick={handleClickOpen} />
                        </div>
                        <div className="remove-item">
                            <Link 
                            to="/payment"
                            state= {{item: item}} 
                            style={{ textDecoration: 'none', color: "black" }}>
                                <BiPurchaseTag />
                            </Link>
                        </div>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                {"Use Google's location service?"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Are you sure you wants to delete this product
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Disagree</Button>
                                <Button onClick={() => deleteCartItem(item.id)} autoFocus>
                                    Agree
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                ))}
            </div>
        </>
    );
}