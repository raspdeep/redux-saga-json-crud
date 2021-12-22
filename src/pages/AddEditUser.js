import React, { useState, useEffect } from "react";
import { MDBValidation, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUserStart, updateUserStart } from "../redux/actions";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const initialState = {
  name: "",
  email: "",
  phone: "",
  address: "",
};

function AddEditUser() {
  const [formValue, setFormValue] = useState(initialState);
  const [editMode, setEditMode] = useState(false);
  const { name, email, phone, address } = formValue;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { users } = useSelector((state) => state.data);

  useEffect(() => {
    if (id) {
      const singleUser = users.find((user) => user.id === +id);
      setFormValue({ ...singleUser });
      setEditMode(true);
    } else {
      setEditMode(false);
      setFormValue({ ...initialState });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && phone && address) {
      if (editMode) {
        dispatch(updateUserStart({ id, formValue }));
        setEditMode(false);
      } else dispatch(createUserStart(formValue));

      setTimeout(() => navigate("/"), 500);
      toast.success(
        !editMode ? "User added successfully!" : "User updated successfully",
        {
          toastId: email,
          autoClose: 4000,
        }
      );
    }
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  return (
    <div>
      <MDBValidation
        className="row g-3"
        style={{ marginTop: "50px" }}
        noValidate
        onSubmit={handleSubmit}
      >
        <p className="fs-2 fw-bold">
          {!editMode ? "Add User Detail" : "Update User Detail"}
        </p>
        <div
          style={{
            margin: "auto",
            padding: "15px",
            maxWidth: "400px",
            alignContent: "center",
          }}
        >
          <MDBInput
            value={name}
            name="name"
            type="text"
            onChange={onInputChange}
            required
            label="Name"
            validation="Please provide a name"
            invalid
          ></MDBInput>
          <br />
          <MDBInput
            value={email}
            name="email"
            type="email"
            onChange={onInputChange}
            required
            label="Email"
            validation="Please provide an email"
            invalid
          ></MDBInput>
          <br />
          <MDBInput
            value={phone}
            name="phone"
            type="number"
            onChange={onInputChange}
            required
            label="Phone"
            validation="Please provide a phone number"
            invalid
          ></MDBInput>
          <br />
          <MDBInput
            value={address}
            name="address"
            type="text"
            onChange={onInputChange}
            required
            label="Address"
            validation="Please provide an address"
            invalid
          ></MDBInput>{" "}
          <br />
          <div className="col-12">
            <MDBBtn style={{ marginRight: "10px" }} type="submit">
              {!editMode ? "Add" : "Edit"}
            </MDBBtn>
            <MDBBtn
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
              color="danger"
            >
              Cancel
            </MDBBtn>
          </div>
        </div>
      </MDBValidation>
    </div>
  );
}

export default AddEditUser;
