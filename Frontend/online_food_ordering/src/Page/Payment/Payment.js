import React, { useEffect, useState } from "react";
import {
    TextField,
    Grid,
    Box,
    Button
} from "@material-ui/core";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { listPickerPropTypes } from "rsuite/esm/Picker";

export default function Payment() {
    const location = useLocation()
    const user=location.state.item.user;
    const productId=location.state.item.productId;
    const productName=location.state.item.productName;
    const price=location.state.item.price;
    const image=location.state.item.image;
    const quantity =location.state.item.quantity;
    const purchase= "YES";
    const addedToCartDateTime= location.state.item.addedToCartDateTime;
    const delivery="SENT_OUT_FOR_DELIVERY";
    console.log(location.state.item)
    const [id, setId]=useState(location.state.item.id);
    const updateCart = (id) => {
        const response = axios.put(`https://localhost:7288/api/updated-cart-item?id=${id}`, {
        user,
        productId,
        productName,
        price,
        image,
        quantity,
        purchase,
        addedToCartDateTime,  
        delivery
        })
    }

    return (
        <>
            <Grid container spacing={3} style={{ marginTop: '30px' }}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        type="tel"
                        label="Credit card number"
                        variant="filled"
                        required
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        type="tel"
                        label="Expiry date"
                        variant="filled"
                        required
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        type="tel"
                        label="CVV"
                        variant="filled"
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Name on Card"
                        placeholder="J Smith"
                        required
                    />
                </Grid>
            </Grid>
            <Grid container justify="center">
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '30px', display: "flex" }} 
                onClick={()=>updateCart(id)}
                >
                    Submit
                </Button>
            </Grid>
        </>
    );
}