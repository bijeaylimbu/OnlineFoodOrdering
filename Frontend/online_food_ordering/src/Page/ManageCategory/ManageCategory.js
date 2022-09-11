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
export default function ManageCategory() {
    const [categories, setCategories] = useState([]);
  const [show, setShow] = useState(false);
  const [showCreateBtn, setShowCreateBtn] = useState(true);
  const [editing, setEdit] = useState(false);
  const [adding, setAdd] = useState(false);
  const [name, setName] = useState(localStorage.getItem("name"));
  const [addName, setAddName] = useState();
 
  const [error, setError] = useState(false);
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
    const response = await fetch("https://localhost:7288/api/get-all-category")
      .then((response) => response.json());
    setCategories(response);
  }

  React.useState(() => {
    getData();
  }, [])

  const updateCategory = (id, e) => {
    e.preventDefault();
    setShow(true);
    const response = axios.put(`https://localhost:7288/api/updated-category?id=${id}`, {
      name
    })
      .then(res => console.log(res))
      .catch((error) => setEdit(true))
  }

  const addCategory = (e) => {
    e.preventDefault();
    setShow(true);
    const response = axios.post("https://localhost:7288/api/add-category ", {
      name: name,
    })
    window.location.reload();
  }

  const deleteCategory = (id) => {
    setShow(false);
    const response = axios.delete(`https://localhost:7288/api/delete-category?categoryId=${id}`
    )
    // window.location.reload();
  }
  return (
    <>
      <Container fluid="md">
        <Row>
          <Col>
            <Card className="customCard">
              <Card.Body>
                <div className="d-flex justify-content-between customCardBody">
                  <div>
                    <Card.Title>User Data</Card.Title>
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
                        title="Add Category"
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
                      <th>Category Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.length > 0 ? (
                      categories.map((category, index) => (
                        <tr key={index}>
                          <td>{category.id}</td>
                          <td>{category.name}</td>
                     
                          <td>
                            <Button
                              variant="info"
                              title="Edit user details"
                              onClick={() => onEdit(window.localStorage.setItem("name", category.name),
                              )}
                            >
                              <FaPencilAlt />
                            </Button>{" "}
                            <Button
                              variant="danger"
                              title="Delete user"
                              onClick={() => deleteCategory(category.id)}
                            >
                              <FaTrashAlt />
                            </Button>
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
              </Card.Body>
            </Card>
            {
              editing == true
                ?
                <>
                  <Modal size="lg" show={show} onHide={handleClose}>
                    <Form>
                      <Modal.Header closeButton></Modal.Header>
                      <Modal.Title>Edit Category</Modal.Title>
                      <Modal.Body>
                        <Form.Group className="mb-3" >
                          <Form.Label>Category Name</Form.Label>
                          <Form.Control
                            type="text"
                            required
                            defaultValue={localStorage.getItem("name")}
                            onChange={(e) =>
                              setName(e.target.value)
                            }
                            placeholder="First Name"
                          />
                        </Form.Group>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        <Button variant="primary" type="submit" onClick={(e) => updateCategory(localStorage.getItem("id"), e)}>
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
                      <Modal.Title>Add Category</Modal.Title>
                      <Modal.Body>
                        <Form.Group className="mb-3" >
                          <Form.Label>Category Name</Form.Label>
                          <Form.Control
                            type="text"
                            required
                            onChange={(e) =>
                              setAddName(e.target.value)
                            }
                            placeholder="Category Name"
                          />
                        </Form.Group>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        <Button variant="primary" type="submit" onClick={(e) => addCategory(e)}>
                          Add Category
                        </Button>
                      </Modal.Footer>
                    </Form>
                  </Modal>
                </>
            }

          </Col>
        </Row>
      </Container>
    </>
  );
}