import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../stores/reducers/auth";



function Header() {
  const userInfo = useSelector((state) => state.auth.userInfo)
  const dispatch = useDispatch()
  const {t} = useTranslation();
  

  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={NavLink} to="/">
            {t('appName')}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link as={NavLink} to="/major">
              {t('major')}
              </Nav.Link>
              <Nav.Link as={NavLink} to="/instructor">
              {t('instructor')}
              </Nav.Link>
              <Nav.Link as={NavLink} to="/student">
              {t('student')}
              </Nav.Link>
            </Nav>
            <Nav className="" style={{ maxHeight: "100px" }} navbarScroll>
              <Nav.Link href="#">{t('welcomeTo')} {userInfo?.fullName}</Nav.Link>
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
