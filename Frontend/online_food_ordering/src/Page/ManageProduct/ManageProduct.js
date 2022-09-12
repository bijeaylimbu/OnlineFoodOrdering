
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
import { Toggle } from "rsuite";
import { FaPencilAlt, FaPlus, FaTrashAlt } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function ManageProduct() {
    const [products, setProducts] = useState([]);
    const [show, setShow] = useState(false);
    const [showCreateBtn, setShowCreateBtn] = useState(true);
    const [editing, setEdit] = useState(false);
    const [adding, setAdd] = useState(false);
    const [productName, setProductName] = useState(localStorage.getItem("productName"));
    const [price, setPrice] = useState(localStorage.getItem("price"));
    const [image, setImage] = useState(localStorage.getItem("image"));
    const [quantity, setQuantity] = useState(localStorage.getItem("quantity"));
    const [category, setCategory] = useState(localStorage.getItem("category"));
    const [addProductName, setAddProductName] = useState();
    const [addPrice, setAddPrice] = useState();
    const [addImage, setAddImage] = useState();
    const [addQuantity, setAddQuantity] = useState();
    const [addCategory, setAddCategory] = useState('');
    const [allCategory, setAllCategory] = useState();
    const [rating, setRating] = useState(0);
    const [error, setError] = useState([]);
    console.log(error)
    const handleClose = () => {
        setShow(false);
    };
    const handleShow = () => {
        setShow(true);
        if (editing == false) {
            //   setNewUser(initCurrentUser);
        }
    };
    const handleAdd = () => {
        setEdit(false);
        if (editing == false) {
            handleShow();
        }
    };

    const onEdit = () => {
        setEdit(true);
        if (editing == true) {
            handleShow();
        }
    };

    const getData = async () => {
        const response = await fetch("https://localhost:7288/api/get-all-product")
            .then((response) => response.json());
        setProducts(response);
    }

    const getCategory = async () => {
        const response = await fetch("https://localhost:7288/api/get-all-category")
            .then((response) => response.json());
        setAllCategory(response);
    }

    React.useState(() => {
        getData();
        getCategory();
    }, [])

    const updateProduct = (id, e) => {
        e.preventDefault();
        setShow(true);
        const response = axios.put(`https://localhost:7288/api/updated-product?id=${id}`, {
            productName,
            price,
            image,
            quantity,
            category,
            rating
        }).then(response => {
            if (response.data == 202) {
                window.location.reload();
            }
        }).catch((error) => {
            setError(error.response.data.errors)
        })
    }

    const addProduct = (e) => {
        e.preventDefault();
        setShow(true);
        axios.post("https://localhost:7288/api/add-product ", {
            productName: addProductName,
            price: addPrice,
            image: addImage,
            quantity: addQuantity,
            category: addCategory,
            rating: rating
        })
            .then(response => {
                if (response.data == 201) {
                    window.location.reload();
                }
            }).catch((error) => {
                setError(error.response.data.errors)
            })
    }

    const deleteProduct = (id) => {
        setShow(false);
        const response = axios.delete(`https://localhost:7288/api/delete-product?id=${id}`
        )
        window.location.reload();
    }
    const handleChange = (event) => {
        setAddCategory(event.target.value);
    };
    const handleChangeCategory = (event) => {
        setCategory(event.target.value);
    };
    return (
        <Container fluid="md">
            <Row>
                <Col>
                    <Card className="customCard">
                        <Card.Body>
                            <div className="d-flex justify-content-between customCardBody">
                                <div>
                                    <Card.Title>Product Data</Card.Title>
                                </div>
                                <div className="d-flex">
                                    <Toggle
                                        className="userToggleBtn"
                                        checked={showCreateBtn}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setShowCreateBtn(!showCreateBtn);
                                        }}
                                    />
                                    {showCreateBtn ? (
                                        <Button
                                            variant="primary"
                                            onClick={handleAdd}
                                            title="Add User"
                                        >
                                            <FaPlus />
                                        </Button>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Product Name</th>
                                        <th>Price</th>
                                        <th>Image</th>
                                        <th>Quantity</th>
                                        <th>Category</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.length > 0 ? (
                                        products.map((product, index) => (
                                            <tr key={index}>
                                                <td>{product.id}</td>
                                                <td>{product.productName}</td>
                                                <td>{product.price}</td>
                                                <td>{product.image}</td>
                                                <td>{product.quantity}</td>
                                                <td>{product.category}</td>
                                                <td>
                                                    <Button
                                                        variant="info"
                                                        title="Edit user details"
                                                        onClick={() =>
                                                            onEdit(window.localStorage.setItem("productName", product.productName),
                                                                window.localStorage.setItem("price", product.price),
                                                                window.localStorage.setItem("image", product.image),
                                                                window.localStorage.setItem("quantity", product.quantity),
                                                                window.localStorage.setItem("category", product.category),
                                                                window.localStorage.setItem("id", product.id)
                                                            )}
                                                    >
                                                        <FaPencilAlt />
                                                    </Button>{" "}
                                                    <Button
                                                        variant="danger"
                                                        title="Delete product"
                                                        onClick={() => deleteProduct(product.id)}
                                                    >
                                                        <FaTrashAlt />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className="text-center">
                                                No Product found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                    {
                        editing == true
                            ?
                            <>
                                <Modal size="lg" show={show} onHide={handleClose}>
                                    <Form>
                                        <Modal.Header closeButton></Modal.Header>
                                        <Modal.Title>Edit Product</Modal.Title>
                                        <Modal.Body>
                                            <Form.Group className="mb-3" >
                                                <Form.Label>Product Name</Form.Label>
                                                <Form.Control
                                                    type="text"

                                                    defaultValue={localStorage.getItem("productName")}
                                                    onChange={(e) =>
                                                        setProductName(e.target.value)
                                                    }
                                                    placeholder="Product Name"
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" >
                                                <Form.Label>Price</Form.Label>
                                                <Form.Control
                                                    type="text"

                                                    defaultValue={localStorage.getItem("price")}
                                                    onChange={(e) =>
                                                        setPrice(e.target.value)
                                                    }
                                                    placeholder="Price"
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Image</Form.Label>
                                                <Form.Control
                                                    type="text"

                                                    defaultValue={localStorage.getItem("image")}
                                                    onChange={(e) =>
                                                        setImage(e.target.value)
                                                    }
                                                    placeholder="Enter Image"
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Quantity</Form.Label>
                                                <Form.Control

                                                    type="text"
                                                    required
                                                    defaultValue={localStorage.getItem("quantity")}
                                                    onChange={(e) =>
                                                        setQuantity(e.target.value)
                                                    }
                                                    placeholder="Enter Qunatity"
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3">

                                                <Box sx={{ minWidth: 120 }}>
                                                    <FormControl fullWidth>
                                                        <InputLabel>Category</InputLabel>
                                                        <Select
                                                            label="Category"
                                                            onChange={
                                                                handleChangeCategory
                                                                // setAddCategory()
                                                            }
                                                        >
                                                            {
                                                                allCategory?.map((category) => (
                                                                    <MenuItem key={category.id} value={category.name}
                                                                    >{category.name}</MenuItem>
                                                                ))}
                                                        </Select>
                                                    </FormControl>
                                                </Box>
                                            </Form.Group>
                                        </Modal.Body>
                                        {error && (

                                            <p style={{ color: "red" }}> {error?.Price} </p>
                                        )}
                                        {error && (

                                            <p style={{ color: "red" }}> {error?.Category} </p>
                                        )}
                                        {error && (

                                            <p style={{ color: "red" }}> {error?.ProductName} </p>
                                        )}
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleClose}>
                                                Close
                                            </Button>
                                            <Button variant="primary" type="submit" onClick={(e) => updateProduct(localStorage.getItem("id"), e)}>
                                                Update
                                            </Button>
                                        </Modal.Footer>
                                    </Form>
                                </Modal>
                            </>
                            :
                            <>
                                <Modal size="lg" show={show} onHide={handleClose}>
                                    <Form >
                                        <Modal.Header closeButton></Modal.Header>
                                        <Modal.Title>Add Product</Modal.Title>
                                        <Modal.Body>
                                            <Form.Group className="mb-3" >
                                                <Form.Label>Product Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    required
                                                    onChange={(e) =>
                                                        setAddProductName(e.target.value)
                                                    }
                                                    placeholder="Product Name"
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" >
                                                <Form.Label>Price</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    required
                                                    onChange={(e) =>
                                                        setAddPrice(e.target.value)
                                                    }
                                                    placeholder="Price"
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Image</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    onChange={(e) =>
                                                        setAddImage(e.target.value)
                                                    }
                                                    placeholder="Enter Image"
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Quantity</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    onChange={(e) =>
                                                        setAddQuantity(e.target.value)
                                                    }
                                                    placeholder="Enter Quantity"
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3">

                                                <Box sx={{ minWidth: 120 }}>
                                                    <FormControl fullWidth>
                                                        <InputLabel>Category</InputLabel>
                                                        <Select
                                                            label="Category"
                                                            onChange={
                                                                handleChange
                                                                // setAddCategory()
                                                            }
                                                        >
                                                            {
                                                                allCategory?.map((category) => (
                                                                    <MenuItem key={category.id} value={category.name}
                                                                    >{category.name}</MenuItem>
                                                                ))}
                                                        </Select>
                                                    </FormControl>
                                                </Box>
                                            </Form.Group>
                                            {error && (

                                                <p style={{ color: "red" }}> {error?.Price} </p>
                                            )}
                                            {error && (

                                                <p style={{ color: "red" }}> {error?.Category} </p>
                                            )}
                                            {error && (

                                                <p style={{ color: "red" }}> {error?.ProductName} </p>
                                            )}
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleClose}>
                                                Close
                                            </Button>
                                            <Button variant="primary" type="submit" onClick={(e) => addProduct(e)}>
                                                Add Product
                                            </Button>
                                        </Modal.Footer>
                                    </Form>
                                </Modal>
                            </>
                    }

                </Col>
            </Row>
        </Container >
    );
}