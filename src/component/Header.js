import React, { useState } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

function Header() {
  const [showBasic, setShowBasic] = useState(false);
  return (
    <>
      {/* <MDBNavbar expand="lg" light style={{ backgroundColor: "#D5D8DC" }}> */}
      <MDBNavbar expand="lg" dark bgColor="dark">
        <MDBContainer fluid>
          <MDBNavbarBrand tag={Link} to="/">
            <MDBIcon fas icon="book-open" style={{ marginRight: "10px" }} />
            Contact
          </MDBNavbarBrand>
          <MDBNavbarToggler
            type="button"
            data-target="#navbarColor02"
            aria-controls="navbarColor02"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShowBasic(!showBasic)}
          >
            <MDBIcon fas icon="bars" />
          </MDBNavbarToggler>
          <MDBCollapse navbar show={showBasic}>
            <MDBNavbarNav
              className="me-auto mb-2 mb-lg-0"
              style={{
                textAlign: "start",
                margin: "0 50px",
                // fontSize: "18px",
              }}
            >
              <MDBNavbarItem className="active">
                <MDBNavbarLink
                  aria-current="page"
                  className="nav-link"
                  tag={Link}
                  to="/"
                >
                  {/* <NavLink to="/">Home</NavLink> */}
                  Home
                </MDBNavbarLink>
              </MDBNavbarItem>

              <MDBNavbarItem>
                <MDBNavbarLink className="nav-link" tag={Link} to="/addUser">
                  {/* <NavLink to="/addUser" className="text-white">
                    Add User
                  </NavLink> */}
                  Add User
                </MDBNavbarLink>
              </MDBNavbarItem>

              <MDBNavbarItem>
                <MDBNavbarLink className="nav-link" tag={Link} to="/about">
                  {/* <NavLink to="/about" className="text-white">
                    About
                  </NavLink> */}
                  About
                </MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
}

export default Header;
