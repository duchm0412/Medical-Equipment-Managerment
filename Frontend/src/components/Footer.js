import React from "react";
import { Container, Row, Col } from "reactstrap";
import LienHe from "./Lienhe";
import { Facebook, Mail, Twitter, Youtube } from "react-feather";

const Footer = () => (
  <footer className="footer">
    <Container fluid>
    <h3> Liên Hệ </h3>
        <br></br>
      <Row className="text-muted">      
        <LienHe
          address="Chi nhánh Hà Nội"
          toanha=" Tầng 24 tòa nhà ICON 4, số 243A Phương Mai, quận Đống Đa, TP. Hà Nội"
          phone="0975290298/ 09876346346"
          gmail="minhducjojo199@gmail.com"
        />
        <LienHe
          address="Chi nhánh Tp.Hồ Chí Minh"
          toanha=" Tầng 5 Central Garden, 328 Võ Văn Kiệt, Quận Tân Bình, TP. Hồ Chí Minh"
          phone="0975295598/ 09876346346"
          gmail="duc.hm2487@sis.hust.edu.vn"
        />
        <LienHe
          address="Chi nhánh Đà Nẵng"
          toanha=" Tầng 16 tòa nhà VNPT04, số 243A Sơn Trà, Quận Ngũ Hành Sơn, TP.Đà Nẵng"
          phone="0975245298/ 0987634686"
          gmail="ducHM17@fsoft.edu.vn"
        />

        <Col xs="2" className="text-right">
          <b><p className="mb-0">
             {new Date().getFullYear()} -{" "}
            <span href="/" className="text-muted">
              Fanpage
            </span>
          </p>
          </b>
          <br></br>
          <p>
            <span> <Facebook /></span>{"  "}
            <span> <Mail /></span>{"  "}
            <span> <Twitter /></span>{"  "}
            <span> <Youtube /></span>{"  "}
          </p>
        </Col>
      </Row>
    </Container>
  </footer >
);

export default Footer;
