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
import "../ManageUser/ManageUser.css"
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";

export default function ManageUser() {

  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [newUser, setNewUser] = useState([]);
  const [showCreateBtn, setShowCreateBtn] = useState(true);
  const [editing, setEdit] = useState(false);
  const [adding, setAdd] = useState(false);
  const [firstName, setFirstName] = useState(localStorage.getItem("firstName"));
  const [lastName, setLastName] = useState(localStorage.getItem("lastName"));
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [addFirstName, setAddFirstName] = useState();
  const [addLastName, setAddLastName] = useState();
  const [addEmail, setAddEmail] = useState();
  const [addRole, setAddRole] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [phone, setPhone] = useState();
  const [error, setError] = useState();
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
    const response = await fetch("https://localhost:7288/api/all-user")
      .then((response) => response.json());
    setUsers(response);
  }

  React.useState(() => {
    getData();
  }, [])

  const updateUser = (emailId, e) => {
    e.preventDefault();
    setShow(true);
    const response = axios.put(`https://localhost:7288/api/updated-user?email=${emailId}`, {
      firstName,
      lastName,
      email,
      role
    })
      .then(response => {
        if (response.data == 202) {
          window.location.reload();
        }
      }).catch((error) => {
        setError(error.response.data.errors)
      })
  }

  const addUser = (e) => {
    e.preventDefault();
    setShow(true);
    const response = axios.post("https://localhost:7288/api/registration ", {
      firstName: addFirstName,
      lastName: addLastName,
      email: addEmail,
      role: addRole,
      password: password,
      confirmPassword: confirmPassword,
      phoneNumber: phone

    }).then(response => {
      if (response.data == 201) {
        window.location.reload();
      }
    }).catch((error) => {
      setError(error.response.data.errors)
    })
  }

  const deleteUser = (emailId) => {
    setShow(false);
    const response = axios.delete(`https://localhost:7288/api/delete-user?email=${emailId}`
    ).then(response => {
      if (response.data == 202) {
        window.location.reload();
      }
    }).catch((error) => {
      setError(error.response.data.errors)
    })
    
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
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length > 0 ? (
                      users.map((user, index) => (
                        <tr key={index}>
                          <td>{user.id}</td>
                          <td>{user.firstName}</td>
                          <td>{user.lastName}</td>
                          <td>{user.email}</td>
                          <td>{user.role}</td>
                          <td>
                            <Button
                              variant="info"
                              title="Edit user details"
                              onClick={() => onEdit(window.localStorage.setItem("firstName", user.firstName),
                                window.localStorage.setItem("lastName", user.lastName),
                                window.localStorage.setItem("email", user.email),
                                window.localStorage.setItem("role", user.role),
                              )}
                            >
                              <FaPencilAlt />
                            </Button>{" "}
                            <Button
                              variant="danger"
                              title="Delete user"
                              onClick={() => deleteUser(user.email)}
                            >
                              <FaTrashAlt />
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="text-center">
                          No users found.
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
                      <Modal.Title>Edit User</Modal.Title>
                      <Modal.Body>
                        <Form.Group className="mb-3" >
                          <Form.Label>First Name</Form.Label>
                          <Form.Control
                            type="text"
                            required
                            defaultValue={localStorage.getItem("firstName")}
                            onChange={(e) =>
                              setFirstName(e.target.value)
                            }
                            placeholder="First Name"
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control
                            type="text"
                            required
                            defaultValue={localStorage.getItem("lastName")}
                            onChange={(e) =>
                              setLastName(e.target.value)
                            }
                            placeholder="First Name"
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="text"
                            defaultValue={localStorage.getItem("email")}
                            onChange={(e) =>
                              setEmail(e.target.value)
                            }
                            placeholder="Enter Email"
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Role</Form.Label>
                          <Form.Control
                            type="text"
                            defaultValue={localStorage.getItem("role")}
                            onChange={(e) =>
                              setRole(e.target.value)
                            }
                            placeholder="Enter Role"
                          />
                        </Form.Group>
                      </Modal.Body>
                      {error && (

                        <p style={{ color: "red" }}> {error?.Email} </p>
                      )}
                      {error && (

                        <p style={{ color: "red" }}> {error?.FirstName} </p>
                      )}
                      {error && (

                        <p style={{ color: "red" }}> {error?.LastName} </p>
                      )}

                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        <Button variant="primary" type="submit" onClick={(e) => updateUser(localStorage.getItem("email"), e)}>
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
                      <Modal.Title>Add User</Modal.Title>
                      <Modal.Body>
                        <Form.Group className="mb-3" >
                          <Form.Label>First Name</Form.Label>
                          <Form.Control
                            type="text"
                            required
                            onChange={(e) =>
                              setAddFirstName(e.target.value)
                            }
                            placeholder="First Name"
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control
                            type="text"
                            required
                            onChange={(e) =>
                              setAddLastName(e.target.value)
                            }
                            placeholder="First Name"
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="text"
                            onChange={(e) =>
                              setAddEmail(e.target.value)
                            }
                            placeholder="Enter Email"
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Phone</Form.Label>
                          <Form.Control
                            type="text"
                            onChange={(e) =>
                              setPhone(e.target.value)
                            }
                            placeholder="Enter Email"
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Role</Form.Label>
                          <Form.Control
                            type="text"
                            onChange={(e) =>
                              setAddRole(e.target.value)
                            }
                            placeholder="Enter Role"
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            type="text"
                            onChange={(e) =>
                              setPassword(e.target.value)
                            }
                            placeholder="Enter Password"
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Re-Password</Form.Label>
                          <Form.Control
                            type="text"
                            onChange={(e) =>
                              setConfirmPassword(e.target.value)
                            }
                            placeholder="Enter Password Again"
                          />
                        </Form.Group>
                      </Modal.Body>
                      {error && (

                        <p style={{ color: "red" }}> {error?.Email} </p>
                      )}
                      {error && (

                        <p style={{ color: "red" }}> {error?.FirstName} </p>
                      )}
                      {error && (

                        <p style={{ color: "red" }}> {error?.LastName} </p>
                      )}
                      {error && (

                        <p style={{ color: "red" }}> {error?.PhoneNumber} </p>
                      )}
                      {error && (

                        <p style={{ color: "red" }}> {error?.Password} </p>
                      )}
                      {error && (

                        <p style={{ color: "red" }}> {error?.ConfirmPassword} </p>
                      )}
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        <Button variant="primary" type="submit" onClick={(e) => addUser(e)}>
                          Add User
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