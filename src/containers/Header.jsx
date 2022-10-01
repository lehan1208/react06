import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../stores/reducers/auth";

function Header() {
  const userInfo = useSelector((state) => state.auth.userInfo)
  // console.log("🚀 ~ file: Header.jsx ~ line 9 ~ Header ~ userInfo", userInfo)
  const dispatch = useDispatch()

  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={NavLink} to="/">
            Student Management
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link as={NavLink} to="/major">
                Major
              </Nav.Link>
              <Nav.Link as={NavLink} to="/instructor">
                Instructor
              </Nav.Link>
              <Nav.Link as={NavLink} to="/student">
                Student
              </Nav.Link>
            </Nav>
            <Nav className="" style={{ maxHeight: "100px" }} navbarScroll>
              <Nav.Link href="#">welcome to ... {userInfo?.fullName}</Nav.Link>
              <Nav.Link 
              onClick={() =>dispatch(logout())}
              >
                <i className="bi-box-arrow-right" />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
