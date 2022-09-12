import React, { useState } from "react";
import {
    Button,
    Card,
    Col,
    Container,
    Form,
    Modal,
    Row,
    Table,
} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';

export default function PurchaseHistory(){
    const [cart, setCart] = useState([]);
    const getData = async () => {
        const response = await fetch(`https://localhost:7288/api/get-all-cart?email=${localStorage.getItem("email")}`)
            .then((response) => response.json());
        setCart(response);
    }

    useState(() => {
        getData();
    }, [])
    return (
        <>
         <Container fluid="md">
        <Row>
          <Col>
            <Card className="customCard">
              <Card.Body>
                <div className="d-flex justify-content-between customCardBody">
                  <div>
                    <Card.Title>Purchase History</Card.Title>
                  </div>
                  <div className="d-flex">
                  </div>
                </div>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Image</th>
                      <th>Delivery</th>
                          <th>Add to Cart Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.length > 0 ? (
                      cart.map((cart, index) => (
                        <tr key={index}>
                          <td>{cart.productName}</td>
                          <td>{cart.price}</td>
                          <td>{cart.quantity}</td>
                          <td><img src={cart.image}/></td>
                          <td>{cart.delivery}</td>
                          <td>{cart.addedToCartDateTime}</td>
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
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
        </>
    );
}