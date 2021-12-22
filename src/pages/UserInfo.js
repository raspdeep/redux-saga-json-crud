import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MDBBtn } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";

function UserInfo() {
  const { users } = useSelector((state) => state.data);
  const { id } = useParams();
  const navigate = useNavigate();
  const singleUser = users.find((user) => user.id === +id);

  return (
    <div style={{ marginTop: "50px" }}>
      <div
        className="row"
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "450px",
        }}
      >
        <p
          className="col-md-12 fs-3"
          style={{
            margin: "auto",
            padding: "15px",
            maxWidth: "450px",
            textAlign: "center",
          }}
        >
          User Detail
        </p>
        <hr />
        <div className="col-md-6 fw-bold">ID:</div>
        <div className="col-md-6">{singleUser.id}</div>
        <div className="col-md-6 fw-bold">Name:</div>
        <div className="col-md-6">{singleUser.name}</div>
        <div className="col-md-6 fw-bold">Email:</div>
        <div className="col-md-6">{singleUser.email}</div>
        <div className="col-md-6 fw-bold">divhone:</div>
        <div className="col-md-6">{singleUser.divhone}</div>
        <div className="col-md-6 fw-bold">Address:</div>
        <div className="col-md-6">{singleUser.address}</div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "50px 0",
          }}
        >
          <MDBBtn onClick={() => navigate("/")} color="danger">
            Back
          </MDBBtn>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
