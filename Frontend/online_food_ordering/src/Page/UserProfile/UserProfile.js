import "../UserProfile/UserProfile.css";
import styled from "styled-components";
import { useState } from "react";

// export const SProf = styled.div`
//   padding: 2%;
//   width: 70%;
//   margin-left: auto;
//   margin-right: auto;
//   .rest-info {
//     text-align: center;
//     margin-bottom: 5%;
//   }
//   .profile-pic {
//     width: 45%;
//   }
// `;

export default function UserProfile() {
    const [user, setUser] = useState();
    const getData = async () => {
        const response = await fetch("https://localhost:7288/api/all-user")
            .then((response) => response.json());
        setUser(response);
    }
    useState(() => {
        getData();
    }, [])
    return (
        <>
            {/* <SProf> */}
                {user?.map((user, index) => (
                    <div className="profile">
                        <div className="rest-info">
                            <center>
                                <img
                                    className="profile-pic"
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwBpJfQA4vxZRi2QkK1WWHBwVUJS-wGJwHSA2fg7NSjw&s"
                                />
                            </center>
                            <h2>Name:{user.firstName} {user.lastName} </h2>
                            <p>Email: {user.email}</p>
                            <p>Phone: {user.phoneNumber}</p>
                            <p>Role: {user.role}</p>
                        </div>
                    </div>
                ))}
            {/* </SProf> */}
        </>
    );
}