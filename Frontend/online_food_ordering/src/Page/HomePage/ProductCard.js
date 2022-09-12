import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import ReactStars from "react-rating-stars-component";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const ProductCard = ({ data }) => {
    const [isAdded, setIsAdded] = useState(false);
    const [productId, setProductId] = React.useState(data.id);
    const [quantity, setQuantity] = React.useState(data.quantity);
    const [price, setPrice] = React.useState(data.price);
    const [image, setImage] = React.useState(data.image);
    const [products, setProducts] = React.useState([]);
    const [category, setCategory]=useState(data.category)
    const [id, setId] = useState();
    const [productName, setProductName] = useState(data.productName);
    const [rating, setRating] = useState(data.rating);
    const [canRate, setCanRate] = useState(true);
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addToCart = (e) => {
        e.preventDefault();
        const response = axios.post("https://localhost:7288/api/add-cart ", {
            user: localStorage.getItem("email"),
            productId: productId,
            quantity: quantity,
            price: price,
            image: image,
            productName: productName,
            purchase: "NO",
            delivery: "PENDING",
            category: category
        }
        )
        setIsAdded(true)
        // window.location.reload();
    }
    useEffect(() => {
        if (localStorage.getItem("email") !== null) {
            setCanRate(true);
        }
    })

    const updateRating = (id) => {
        const response = axios.put(`https://localhost:7288/api/updated-product?id=${id}`, {
            user: localStorage.getItem("email"),
            productId: productId,
            quantity: quantity,
            price: price,
            image: image,
            productName: productName,
            purchase: "NO",
            delivery: "PENDING",
            rating: rating,
             category: category
        })
    }
    return (
        <div className="product">
            <div className="product-image">
                <img src={data.image} />
            </div>
            <h4 className="product-name">{data.productName}</h4>
            <p className="product-price">{data.price}</p>
            <p className="product-price" onClick={handleClickOpen}>
                <ReactStars
                    count={5}
                    value={data.rating}
                    onChange={setRating}
                    size={24}
                    activeColor="#ffd700"
                />
            </p>
            <div className="product-action">
                <button
                    className={!isAdded ? "" : "added"}
                    type="button"
                    onClick={(e) => {
                        addToCart(e);
                    }}
                >
                    {!isAdded ? "ADD TO CART" : "✔ ADDED"}
                </button>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <ReactStars
                            count={5}
                            value={data.rating}
                            onChange={setRating}
                            size={24}
                            activeColor="#ffd700"
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={(e)=> updateRating(data.id)} autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>

    );
};

export default ProductCard;
