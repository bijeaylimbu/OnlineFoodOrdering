
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
export default function ManageProduct() {
    const [products, setProducts] = useState([]);
    const [show, setShow] = useState(false);
    const [showCreateBtn, setShowCreateBtn] = useState(true);
    const [editing, setEdit] = useState(false);
    const [adding, setAdd] = useState(false);
    const [productName, setProductName] = useState(sessionStorage.getItem("productName"));
    const [price, setPrice] = useState(sessionStorage.getItem("price"));
    const [image, setImage] = useState(sessionStorage.getItem("image"));
    const [quantity, setQuantity] = useState(sessionStorage.getItem("quantity"));
    const [category, setCategory] = useState(sessionStorage.getItem("category"));
    const [addProductName, setAddProductName] = useState();
    const [addPrice, setAddPrice] = useState();
    const [addImage, setAddImage] = useState();
    const [addQuantity, setAddQuantity] = useState();
    const [addCategory, setAddCategory] = useState(sessionStorage.getItem("role"));

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

    React.useState(() => {
        getData();
    }, [])

    const updateProduct = (id, e) => {
        e.preventDefault();
        setShow(true);
        const response = axios.put(`https://localhost:7288/api/updated-product?id=${id}`, {
            productName,
            price,
            image,
            quantity,
            category
        })
            .then(res => console.log(res));
    }

    const addProduct = (e) => {
        e.preventDefault();
        setShow(true);
        const response = axios.post("https://localhost:7288/api/add-product ", {
            productName: addProductName,
            price: addPrice,
            image: addImage,
            quantity: addQuantity,
            category: addCategory
        })
        // window.location.reload();
    }

    const deleteProduct = (id) => {
        setShow(false);
        const response = axios.delete(`https://localhost:7288/api/delete-product?id=${id}`
        )
        window.location.reload();
    }
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
                                                            onEdit(window.sessionStorage.setItem("productName", product.productName),
                                                                window.sessionStorage.setItem("price", product.price),
                                                                window.sessionStorage.setItem("image", product.image),
                                                                window.sessionStorage.setItem("quantity", product.quantity),
                                                                window.sessionStorage.setItem("category", product.category),
                                                                window.sessionStorage.setItem("id", product.id)
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
                                                    required
                                                    defaultValue={sessionStorage.getItem("productName")}
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
                                                    required
                                                    defaultValue={sessionStorage.getItem("price")}
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
                                                    defaultValue={sessionStorage.getItem("image")}
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
                                                    defaultValue={sessionStorage.getItem("quantity")}
                                                    onChange={(e) =>
                                                        setQuantity(e.target.value)
                                                    }
                                                    placeholder="Enter Qunatity"
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Category</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    defaultValue={sessionStorage.getItem("category")}
                                                    onChange={(e) =>
                                                        setCategory(e.target.value)
                                                    }
                                                    placeholder="Enter Qunatity"
                                                />
                                            </Form.Group>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleClose}>
                                                Close
                                            </Button>
                                            <Button variant="primary" type="submit" onClick={(e) => updateProduct(sessionStorage.getItem("id"), e)}>
                                                Update
                                            </Button>
                                        </Modal.Footer>
                                    </Form>
                                </Modal>
                            </>
                            :
                            <>
                                <Modal size="lg" show={show} onHide={handleClose}>
                                    <Form>
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
                                                <Form.Label>Category</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    onChange={(e) =>
                                                        setAddCategory(e.target.value)
                                                    }
                                                    placeholder="Enter Category"
                                                />
                                            </Form.Group>
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
        </Container>
    );
}