import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Card from "./CustomCard";
import {
  Col,
  Container,
  Row
} from "reactstrap";
import { selectFullname } from "../../redux/selectors/userLoginInfoSelector";
import anhyte1 from "../../assets/img/avatars/anhyte1.jpg";
import anhyte2 from "../../assets/img/avatars/anhyte2.jpg";
import anhyte3 from "../../assets/img/avatars/anhyte3.jpg";
import anhyte4 from "../../assets/img/avatars/anhyte4.jpg";
import anhyte5 from "../../assets/img/avatars/anhyte5.jpg";
import anhyte6 from "../../assets/img/avatars/anhyte6.jpg";
import duan1 from "../../assets/img/avatars/duan1.jpg";
import duan2 from "../../assets/img/avatars/duan2.jpg";
import duan3 from "../../assets/img/avatars/duan3.jpg";
import tintuc2 from "../../assets/img/avatars/tintuc2.jpg";
import tintuc3 from "../../assets/img/avatars/tintuc3.jpg";
import tintuc6 from "../../assets/img/avatars/tintuc6.jpg";

const Intro = () => (
  <div id="introduction" className="mb-5">
    <h3>Giới thiệu </h3>
    <p className="text-lg">
      Phần mềm quản lý Medice Equipment ứng dụng những thành tựu khoa học kĩ thuật của cách mạng công nghiệp 4.0,
      kết nối và tối ưu hóa mọi nguồn lực để quản lý tốt các trang thiết bị Y tế một cách khoa học và minh bạch,
      giúp cho các đỡ các bệnh viện và trung tâm y tế giảm tải nhân lực và thời gian, từ đó cung cấp các thiết bị y tế kịp thời, chính xác cho y bác sĩ
      góp phần bảo vệ, chăm sóc và không ngừng nâng cao sức khoẻ người Việt !
    </p>

    <Carousel showThumbs={false} showStatus={false} >
      <div>
        <img src={anhyte1} alt="anh1" height={400} />
        {/* <p className="legend">Legend 1</p> */}
      </div>
      <div>
        <img src={anhyte2} alt="anh2" height={400} />
        {/* <p className="legend">Legend 2</p> */}
      </div>
      <div>
        <img src={anhyte3} alt="anh3" height={400} />
        {/* <p className="legend">Legend 3</p> */}
      </div>
      <div>
        <img src={anhyte4} alt="anh1" height={400} />
        {/* <p className="legend">Legend 1</p> */}
      </div>
      <div>
        <img src={anhyte5} alt="anh2" height={400} />
        {/* <p className="legend">Legend 2</p> */}
      </div>
      <div>
        <img src={anhyte6} alt="anh3" height={400} />
        {/* <p className="legend">Legend 3</p> */}
      </div>
    </Carousel>
    <br></br>
    <p className="text-lg">
      Hiện nay không chỉ ở thế giới mà ở tại Việt Nam
      việc sử dụng phần mềm quản lý thiết bị giúp tối ưu thời gian,
      đảm bảo thông tin được lưu trữ, tránh mất mát, đặt lịch hẹn bảo trì, sửa chữa,
      đồng thời tìm kiếm, thống kê và truy xuất dữ liệu được nhanh và chính xác hơn.
    </p>
  </div>
);

const ProductsAndServices = () => (
  <div id="table-of-contents" className="mb-5">
    <h3>
      Sản phẩm và dịch vụ
    </h3>

    <Container></Container>
    <ul className="text-lg">
      <li>
        <Link to="/docs/getting-started">Phân phối thiết bị y tế</Link>
      </li>
      <li>
        <Link to="/docs/environment-variables">Phân phối vật tư tiêu hao </Link>
      </li>
      <li>
        <Link to="/docs/deployment">Đầu tư liên kết</Link>
      </li>
      <li>
        <Link to="/docs/state-management">Dịch vụ kĩ thuật</Link>
      </li>
      <li>
        <Link to="/docs/plugins">Dịch vụ IT</Link>
      </li>
      <li>
        <Link to="/docs/changelog">Phòng khám đa khoa</Link>
      </li>
    </ul>
  </div>
);

// const Project = () => (
//   <div id="something-missing" className="mb-5">
//     <h3>Dự án</h3>
//     <Container>
//       <Row>
//         <Col sm={4}>
//           <Card
//             image={duan1}
//             title="Bệnh viện Đa khoa Lâm Hoa Thái Bình"
//             content="Cung cấp hệ thống cộng hưởng từ MRI ECHELON SMART 1.5T 
//             cho khoa Chẩn đoán hình ảnh Bệnh viện Đa khoa Lâm Hoa Thái Bình"
//             daytime="20/11/2021"
//           >
//           </Card>
//         </Col>
//         <Col sm={4}>
//           <Card
//             image={duan2}
//             title="Sở y tế tỉnh Quảng Ninh"
//             content="Cung cấp hệ thống cộng hưởng từ, hệ thống chụp cắt lớp vi tính cho một số bệnh viện tuyến tỉnh, 
//             tuyến huyện thuộc tỉnh Quảng Ninh"
//             daytime="31/12/2021"
//           >
//           </Card>
//         </Col>
//         <Col sm={4}>
//           <Card
//             image={duan3}
//             title="Cơ quan Hợp tác Quốc tế (JICA)"
//             content="Cung cấp hệ thống cộng hưởng từ cho khoa chẩn đoán hình ảnh nhằm nâng cao
//              chất lượng khám và điều trị bệnh tại BVĐK tỉnh Bắc Giang"
//             daytime="02/02/2022"
//           >
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   </div>
// );

// const News = () => (
//   <div id="something-missing" className="mb-5">
//     <h3>Tin tức & Sự kiện</h3>
//     <Container>
//       <Row>
//         <Col sm={4}>
//           <Card
//             image={tintuc3}
//             content="Lợi ích thở Oxy dòng cao (HFNC),
//             Máy thở không xâm nhập chuyên dụng NKV-330 với bệnh nhân Covid-19"
//             daytime="2r33"
//           >
//           </Card>
//         </Col>
//         <Col sm={4}>
//           <Card
//             image={tintuc2}
//             content="JVC tổ chức nhiều Hội thảo trực tuyến chuyên đề
//             cho cán bộ nhân viên y tế trong tình hình dịch Covid-19 kéo dài"
//             daytime="13/01/2022"
//           >
//           </Card>
//         </Col>
//         <Col sm={4}>
//           <Card
//             image={tintuc6}
//             content="02/02 vừa qua, JVC trao tặng vật tư y tế phòng, chống dịch Covid-19 
//             tại Bệnh viện Hữu nghị Việt Nam – Cu Ba Đồng Hới."
//             daytime="02/02/2022"
//           >
//           </Card>
//         </Col>
//       </Row>
//     </Container>

//   </div>
// );

const Introduction = (props) => (
  <Container fluid className="p-0">
    <Row>
      <Col lg={10} xl={8} className="mx-auto">
        <h1 className="h3">Welcome back, {props.fullname}</h1>
        <hr className="my-4" />
        <Intro />
        <ProductsAndServices />
        {/* <Project />
        <News /> */}
      </Col>
    </Row>
  </Container>
);
const mapGlobalStateToProps = state => {
  return {
    app: state.app,
    fullname: selectFullname(state)
  };
};

export default connect(mapGlobalStateToProps,)(Introduction);
