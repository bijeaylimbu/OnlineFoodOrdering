
import { useState } from "react";
import "../ManageCart/ManageCart.scss"
import { Button } from "@material-ui/core";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import { BiPurchaseTag } from "react-icons/bi";
import { IconButton, Table } from '@mui/material';
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
        const response = await fetch(`https://localhost:7288/api/get-all-cart?email=${localStorage.getItem("userEmail")}`)
            .then((response) => response.json());
        setCart(response);
    }

    useState(() => {
        getData();
    }, [])
    const deleteCartItem = (id) => {
        // setOpen(true);
        const response = axios.delete(`https://localhost:7288/api/delete-cart-item?cartId=${id}`
        ).then(response => {
            if (response.data == 202) {
                window.location.reload();
            }
        })
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
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th> Name</th>
                            <th>Image</th>
                            <th>Price</th>
                            <th>Remove From Cart</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.length > 0 ? (
                            cart.map((cart, index) => (
                                <tr key={index}>
                                    <td >{cart.productName}</td>
                                    <td><img src={cart.image} /></td>
                                    <td>{cart.price}</td>
                                    <td>
                                        <AiFillDelete onClick={()=>handleClickOpen()} />
                                    </td>
                                    <td>
                                        <Link
                                            to="/payment"
                                            state={{ item: cart }}
                                            style={{ textDecoration: 'none', color: "black" }}>
                                            <BiPurchaseTag />
                                        </Link>
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
                                                <Button onClick={() => deleteCartItem(cart.id)}>
                                                    Agree
                                                </Button>
                                            </DialogActions>
                                        </Dialog>
                                    </td>
                                </tr>

                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="text-center">
                                    No Category found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>

                {/* <ul className="cart-items">
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
                ))} */}
            </div>
        </>
    );
}