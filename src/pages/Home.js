import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserStart, loadUserStart } from "../redux/actions";
import {
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBBtn,
  MDBIcon,
  MDBTooltip,
  MDBSpinner,
  MDBTabsItem,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import * as types from "../redux/actionTypes";

function Home() {
  const dispatch = useDispatch();
  const { users, status, error, loading } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(loadUserStart());
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete that user?")) {
      dispatch(deleteUserStart(id));
    }
  };

  return (
    <div className="container" style={{ marginTop: "50px" }}>
      <div style={{ display: "none" }}>
        {status === types.DELETE_USER_SUCCESS && !loading
          ? toast.success(`User deleted successfully!`, {
              toastId: status,
              autoClose: 1500,
            })
          : error && !loading
          ? toast.error(`${error}`, { toastId: "error", autoClose: 1500 })
          : toast.dismiss()}
      </div>
      {loading && (
        <MDBSpinner
          className="spinner-border text-info"
          stype={{ marginTop: "100px" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </MDBSpinner>
      )}
      <MDBTable hover>
        <MDBTableHead style={{ color: "black", background: "#D5D8DC" }}>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Address</th>
            <th scope="col">Action</th>
          </tr>
        </MDBTableHead>
        {users &&
          users.map((user, index) => (
            <MDBTableBody key={index}>
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.address}</td>
                <td>
                  <MDBBtn
                    className="m-1"
                    tag="a"
                    color="none"
                    onClick={() => handleDelete(user.id)}
                  >
                    <MDBTooltip title="Delete" tag="a">
                      <MDBIcon
                        fas
                        icon="trash"
                        size="lg"
                        style={{ color: "#dd4b39", marginRight: "10px" }}
                      ></MDBIcon>
                    </MDBTooltip>
                  </MDBBtn>
                  <Link to={`/editUser/${user.id}`}>
                    <MDBTooltip title="Edit" tag="a">
                      <MDBIcon
                        fas
                        icon="pen"
                        size="lg"
                        style={{
                          color: "#55acee",
                          marginBottom: "10px",
                          marginRight: "10px",
                        }}
                      ></MDBIcon>
                    </MDBTooltip>
                  </Link>

                  <Link to={`/userInfo/${user.id}`}>
                    <MDBTooltip title="View" tag="a">
                      <MDBIcon
                        fas
                        icon="eye"
                        size="lg"
                        style={{
                          color: "#3b5938",
                          marginBottom: "10px",
                        }}
                      ></MDBIcon>
                    </MDBTooltip>
                  </Link>
                </td>
              </tr>
            </MDBTableBody>
          ))}
      </MDBTable>
    </div>
  );
}

export default Home;
