import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { enableCorporateTheme } from "../../redux/actions/themeActions";
import {
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
  Row,
} from "reactstrap";
import { Box } from "react-feather";
import home from "../../assets/img/screenshots/home.png";

const handleLogin = () => {
  if (
    sessionStorage.getItem("token") != null ||
    localStorage.getItem("token") != null
  ) {
    window.location.href = "http://localhost:3000/dashboard/default";
  } else {
    window.location.href = "http://localhost:3000/auth/sign-in";
  }
};
const Navigation = () => (
  <Navbar dark expand="md" className="navbar-landing">
    <Container>
      <NavbarBrand href="/">
        <Box title="Medicine Management" />
        Medicine Management
      </NavbarBrand>
      <Nav className="ml-auto" navbar>
        <NavItem className="d-none d-md-inline-block">
          <NavLink target="_blank" active onClick={() => handleLogin()}>
            Đăng nhập
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            target="_blank"
            active
            onClick={() =>
              (window.location.href = "http://localhost:3000/auth/sign-up")
            }
          >
            Đăng ký
          </NavLink>
        </NavItem>
      </Nav>
    </Container>
  </Navbar>
);

const Intro = () => {
  return (
    <section className="landing-intro pt-5">
      <Container>
        <Row>
          <Col md="7" className="mx-auto text-center">
            <h1 className="landing-intro-title my-4">
              Phần mềm quản lý bệnh viện tốt nhất
            </h1>

            <p className="landing-intro-subtitle">
              Chúng tôi quan tâm đến việc quản lý tốt nhất các phòng ban, nhân
              viên, thiết bị y tế và quản lý xuất nhập kho
            </p>

            <div className="my-4">
              <a
                href="/dashboard/default"
                className="btn btn-light btn-lg mr-1"
              >
                Trang chủ
              </a>{" "}
            </div>
          </Col>
        </Row>
        <Row>
          <Col md="8" className="mx-auto text-center">
            <div className="mt-4 landing-intro-img">
              <img
                src={home}
                className="img-fluid rounded-lg"
                alt="Corporate Bootstrap 4 Dashboard Theme"
              />
            </div>
          </Col>
        </Row>
      </Container>

      <svg
        className="landing-intro-shape"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 220"
      >
        <path
          fill="#F7F9FC"
          fill-opacity="1"
          d="M0,160L1440,32L1440,320L0,320Z"
        ></path>
      </svg>
    </section>
  );
};

const Landing = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(enableCorporateTheme());
  }, [dispatch]);

  return (
    <React.Fragment>
      <Navigation />
      <Intro />
    </React.Fragment>
  );
};

export default connect()(Landing);
