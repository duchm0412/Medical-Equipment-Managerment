import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { toggleSidebar } from "../redux/actions/sidebarActions";
import {
  Row,
  Col,
  Collapse,
  Navbar,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ListGroup,
  ListGroupItem,
  Form,
  Input,
  Button,
} from "reactstrap";

import {
  AlertCircle,
  Bell,
  BellOff,
  Home,
  MessageCircle,
  PieChart,
  Settings,
  Trash,
  User,
  UserPlus,
} from "react-feather";
import {
  selectFullname,
  selectUserInfo,
} from "../redux/selectors/userLoginInfoSelector";

import usFlag from "../assets/img/flags/us.png";
import esFlag from "../assets/img/flags/es.png";
import deFlag from "../assets/img/flags/de.png";
import nlFlag from "../assets/img/flags/nl.png";

import avatar1 from "../assets/img/avatars/avatar.jpg";
import avatar3 from "../assets/img/avatars/avatar-3.jpg";
import avatar4 from "../assets/img/avatars/avatar-4.jpg";
import avatar5 from "../assets/img/avatars/avatar-5.jpg";
import Storage from "../Storage/Storage";
import { useHistory } from "react-router-dom";
import UserApi from "../api/UserApi";
import setUserLoginInfo from "../redux/actions/userLoginInfoActions";
import MessageApi from "../api/MessageApi";
const notifications = [
  {
    type: "important",
    title: "Update completed",
    description: "Restart server 12 to complete the update.",
    time: "2h ago",
  },
  {
    type: "default",
    title: "Lorem ipsum",
    description: "Aliquam ex eros, imperdiet vulputate hendrerit et.",
    time: "6h ago",
  },
  {
    type: "login",
    title: "Login from 192.186.1.1",
    description: "",
    time: "6h ago",
  },
  {
    type: "request",
    title: "New connection",
    description: "Anna accepted your request.",
    time: "12h ago",
  },
];
///////thong bao//////////
// const messages = [
//   {
//     name: sessionStorage.getItem("sender"),
//     avatar: avatar5,
//     description: "Nam pretium turpis et arcu. Duis arcu tortor.",
//     time: "15m ago",
//   },
// ];

const NavbarDropdown = ({
  children,
  count,
  showBadge,
  header,
  footer,
  icon: Icon,
}) => (
  <UncontrolledDropdown nav inNavbar className="mr-2">
    <DropdownToggle nav className="nav-icon dropdown-toggle">
      <div className="position-relative">
        <Icon className="align-middle" size={18} />
        {showBadge ? <span className="indicator">{count}</span> : null}
      </div>
    </DropdownToggle>
    <DropdownMenu right className="dropdown-menu-lg py-0">
      <div className="dropdown-menu-header position-relative">
        {count} {header}
      </div>
      <ListGroup>{children}</ListGroup>
      <DropdownItem
        header
        className="dropdown-menu-footer"
        style={{ width: "500px" }}
      >
        <span className="text-muted">{footer}</span>
      </DropdownItem>
    </DropdownMenu>
  </UncontrolledDropdown>
);

const NavbarDropdownItem = ({
  icon,
  title,
  description,
  equipmentName,
  time,
  spacing,
  action,
}) => (
  <ListGroupItem>
    <Row noGutters className="align-items-center">
      <Col xs={2}>{icon}</Col>
      <Col xs={10} className={spacing ? "pl-2" : null}>
        <span className="text-dark"><b>{title}</b></span>
        
        <span
          className="text-muted small mt-1"
          style={{ paddingLeft: "200px" }}
        >
          {action}
        </span>
        <br></br>
        <span className="text-dark">Thiết bị : {equipmentName}</span>
        <div className="text-muted small mt-1">Mô tả : {description}</div>
        <span className="text-muted small mt-1">{time}</span>
      </Col>
    </Row>
  </ListGroupItem>
);

const NavbarComponent = (props) => {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState({});
  const [messages, setMessage] = useState([]);
  const [notifiCount, setNotifi] = useState();
  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const result = await UserApi.getProfile();
        const message = await MessageApi.getAllMessage();
        setMessage(message);
        setNotifi(message.length);
        setUserInfo(result);
      } catch (error) {
        console.log(error);
      }
    };
    getUserProfile();
  }, []);
  const message0 = [];

  const deleteNotifi = async (sender, message) => {
    try {
      if (Storage.getItem("role") == "Admin") {
        if (window.confirm("Bạn có chắc chắn xóa thông báo này không ?")) {
          await MessageApi.deleteBySender(sender, message);
          window.location.reload();
        }
      } else {
        alert("Bạn không phải admin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Navbar color="white" light expand>
      <span
        className="sidebar-toggle d-flex mr-2"
        onClick={() => {
          props.toggleSidebar();
        }}
      >
        <i className="hamburger align-self-center" />
      </span>

      <Form inline>
        <Input
          type="text"
          placeholder="Search projects..."
          aria-label="Search"
          className="form-control-no-border mr-sm-2"
        />
      </Form>
      {/* /// thông báo  */}
      <Collapse navbar>
        <Nav className="ml-auto" navbar>
          <NavbarDropdown
            size="lg"
            header="New Messages"
            footer="Show all messages"
            icon={MessageCircle}
            count={message0.length}
            showBadge
          >
            {message0.map((item, key) => {
              return (
                <NavbarDropdownItem
                  key={key}
                  icon={
                    <img
                      className="avatar img-fluid rounded-circle"
                      src={item.avatar}
                      alt={item.name}
                    />
                  }
                  title={item.sender}
                  description={item.message}
                  time={item.time}
                  spacing
                />
              );
            })}
          </NavbarDropdown>

          <NavbarDropdown
            header="New Notifications"
            footer="Show all notifications"
            icon={Bell}
            count={notifiCount}
            showBadge
          >
            {messages.map((item, key) => {
              return (
                <NavbarDropdownItem
                  key={key}
                  icon={
                    <img
                    width= "100%"
                    height="100%"
                    src={
                      userInfo.avatarUrl
                        ? `http://127.0.0.1:8887/Avatar/${userInfo.avatarUrl}`
                        : avatar1
                    }
                    />
                  }
                  title={item.sender}
                  description={item.message}
                  equipmentName={sessionStorage.getItem("equipmentName")}
                  time={item.time}
                  action={
                    <Trash
                      className="align-middle"
                      size={20}
                      onClick={() => deleteNotifi(item.sender, item.message)}
                    ></Trash>
                  }
                  
                  spacing
                />
              );
            })}
          </NavbarDropdown>

          <UncontrolledDropdown nav inNavbar className="mr-2">
            <DropdownToggle nav caret className="nav-flag">
              <img src={usFlag} alt="English" />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                <img
                  src={usFlag}
                  alt="English"
                  width="20"
                  className="align-middle mr-1"
                />
                <span className="align-middle">English</span>
              </DropdownItem>
              <DropdownItem>
                <img
                  src={esFlag}
                  alt="Spanish"
                  width="20"
                  className="align-middle mr-1"
                />
                <span className="align-middle">Spanish</span>
              </DropdownItem>
              <DropdownItem>
                <img
                  src={deFlag}
                  alt="German"
                  width="20"
                  className="align-middle mr-1"
                />
                <span className="align-middle">German</span>
              </DropdownItem>
              <DropdownItem>
                <img
                  src={nlFlag}
                  alt="Dutch"
                  width="20"
                  className="align-middle mr-1"
                />
                <span className="align-middle">Dutch</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>

          <UncontrolledDropdown nav inNavbar>
            <span className="d-inline-block d-sm-none">
              <DropdownToggle nav caret>
                <Settings size={18} className="align-middle" />
              </DropdownToggle>
            </span>
            <span className="d-none d-sm-inline-block">
              <DropdownToggle nav caret>
                <img
                  src={
                    userInfo.avatarUrl
                      ? `http://127.0.0.1:8887/Avatar/${userInfo.avatarUrl}`
                      : avatar1
                  }
                  className="avatar img-fluid rounded-circle mr-1"
                  alt={userInfo.firstName + " " + userInfo.lastName}
                />
                <span className="text-dark">
                  {userInfo.firstName + " " + userInfo.lastName}
                </span>
              </DropdownToggle>
            </span>
            <DropdownMenu right>
              <DropdownItem onClick={() => history.push("/profile")}>
                <User size={18} className="align-middle mr-2" />
                Profile
              </DropdownItem>
              <DropdownItem>
                <PieChart size={18} className="align-middle mr-2" />
                Analytics
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={() => history.push("/settings")}>
                {" "}
                Settings & Privacy
              </DropdownItem>
              <DropdownItem>Help</DropdownItem>
              <DropdownItem
                onClick={() => {
                  Storage.removeToken();
                  Storage.removeUserInfo();
                  history.push("/auth/sign-in");
                  // window.location.reload();
                }}
              >
                Sign out
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

const mapGlobalStateToProps = (state) => {
  return {
    app: state.app,
    user: selectUserInfo(state),
  };
};

export default connect(mapGlobalStateToProps, { toggleSidebar })(
  NavbarComponent
);
