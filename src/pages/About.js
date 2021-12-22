import React from "react";
import { MDBTypography } from "mdb-react-ui-kit";

function About() {
  return (
    <div style={{ marginTop: "50px", textAlign: "left" }}>
      <MDBTypography note noteColor="primary">
        Hi Guys, this is a Full CRUD (create, read, update, and delete)
        application with the help of React JS. We have used Redux-Sage to
        perform all CRUD operations in this application. In this application, we
        have routing facility as well. We have used MDBBootstrap 5 to build the
        component like Table, Form, Navbar, Button, etc in this React
        Application.
      </MDBTypography>
    </div>
  );
}

export default About;
