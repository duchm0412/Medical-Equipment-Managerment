import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, Table } from "reactstrap";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import Row from "reactstrap/lib/Row";
import Col from "reactstrap/lib/Col";
import Modal from "reactstrap/lib/Modal";
import { getListStaffAction } from "../../redux/actions/staffAction";
import StaffApi from "../../api/StaffApi";
import TableEquipmentCustom from "./customTable";
import CustomSearch from "./customSearch";
import { selectUserInfo } from "../../redux/selectors/userLoginInfoSelector";
import Storage from "../../Storage/Storage";
import {
  selectListStaff,
  selectPage,
  selectSize,
  selectTotalElement,
} from "../../redux/selectors/staffSelector";
import TableStaffCustom from "./customTable";
import CreateStaffForm from "./createdStaffForm";
import UpdateStaffForm from "./updateStaffForm";
const StaffManager = (props) => {
  const getListStaffAction = props.getListStaffAction; ///////////////////////////
  const size = props.size;
  const [page, setPage] = useState(1);
  const [isOpenModalCreate, setOpenModalCreate] = useState(false);
  const [isOpenModalUpdate, setOpenModalUpdate] = useState(false);
  const [authorite, setAuthorite] = useState(false);
  //SHOW SUCCESS NOTIFICATION
  const showSuccessNotification = (title, message) => {
    const options = {
      timeOut: 2500,
      showCloseButton: false,
      progressBar: false,
      position: "top-right",
    };
    toastr.success(title, message, options);
  };
  const showErrorNotification = (title, message) => {
    const options = {
      timeOut: 2500,
      showCloseButton: false,
      progressBar: true,
      position: "top-right",
    };
    toastr.error(title, message, options);
  };
  useEffect(() => {
    const getAllStaff = async () => {
      const user = Storage.getUserInfo();
      const result = await StaffApi.getAll(page, size);
      if (
        user.email == "nvva0907@gmail.com" &&
        user.userName == "minhduc9999" &&
        user.role == "Admin"
      ) {
        setAuthorite(true);
      } else {
        setAuthorite(false);
      }
      const staffs = result.content;
      const totalSize = result.totalElements;
      getListStaffAction(staffs, page, totalSize);
    };

    getAllStaff();
  }, [authorite, getListStaffAction, size, page]);
  //DELETE Staff
  const deleteStaff = async (id) => {
    if (authorite == true) {
      const result = await StaffApi.deletebyId(id);
      console.log(result);
      if (result == "success") {
        showSuccessNotification("X??a nh??n vi??n", ">>> Th??nh c??ng");
      } else {
        showErrorNotification("X??a nh??n vi??n", ">>> Th???t b???i");
      }
      window.location.reload();
    } else {
      alert("B???n kh??ng ph???i Admin, kh??ng ???????c th???c hi???n thao t??c n??y");
    }
  };

  // UPDATE Staff
  const onClickUpdate = (
    staffId,
    fullName,
    phone,
    email,
    departmentId,
    role
  ) => {
    sessionStorage.setItem("staffId", staffId);
    sessionStorage.setItem("fullName", fullName);
    sessionStorage.setItem("phone", phone);
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("departmentId", departmentId);
    sessionStorage.setItem("role", role);
    setOpenModalUpdate(true);
  };
  const dataTable = props.staffs.map((item, index) => {
    return (
      <TableStaffCustom
        key={index}
        data={item}
        // // DELETE
        onClickDelete={(id) => deleteStaff(id)}
        //UPDATE
        onClickUpdating={(
          staffId,
          fullName,
          phone,
          email,
          departmentId,
          role
        ) => {
          onClickUpdate(staffId, fullName, phone, email, departmentId, role);
        }}
      />
    );
  });
  const handelAdd = () => {
    if (authorite == true) {
      setOpenModalCreate(true);
    } else {
      alert("B???n kh??ng ph???i admin, kh??ng th??? th??m m???i nh??n vi??n");
    }
  };
  const handleSearch = async (name) => {
    const result = await StaffApi.getLikeName(name);
    getListStaffAction(result, 1, 1);
  };
  const onClickBack = async () => {
    const result = await StaffApi.getAll(1, 5);
    const staffs = result.content;
    getListStaffAction(staffs, 1, 1);
  };
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle tag="h1">Qu???n l?? nh??n vi??n</CardTitle>
        </CardHeader>
        <Row style={{ alignItems: "flex-end" }}>
          <Col xs="9">
            <CustomSearch
              handleSearch={(name) => handleSearch(name)}
              openCreateModal={() => handelAdd()}
              onClickBack={() => onClickBack()}
            />
          </Col>
        </Row>
        <Table>
          <thead>
            <tr>
              <th style={{ width: "23%" }}>M?? nh??n vi??n</th>
              <th style={{ width: "25%" }}>H??? t??n</th>
              <th style={{ width: "15%" }}>??i???n tho???i</th>
              <th style={{ width: "15%" }}>Email</th>
              <th style={{ width: "20%" }}>Ph??ng ban</th>
              <th style={{ width: "10%" }}>C???p b???c</th>
              <th>Actions</th>
            </tr>
          </thead>
          {dataTable}
        </Table>
      </Card>
      <div>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <p
                className="page-link"
                aria-label="Previous"
                onClick={() => setPage(page - 1)}
              >
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only">Previous</span>
              </p>
            </li>
            <li className="page-item">
              <p className="page-link" onClick={() => setPage(1)}>
                1
              </p>
            </li>
            <li className="page-item">
              <p className="page-link" onClick={() => setPage(2)}>
                2
              </p>
            </li>
            <li className="page-item">
              <a className="page-link" onClick={() => setPage(3)}>
                3
              </a>
            </li>
            <li className="page-item">
              <p
                className="page-link"
                href="#"
                aria-label="Next"
                onClick={() => setPage(page + 1)}
              >
                <span aria-hidden="true">&raquo;</span>
                <span className="sr-only">Next</span>
              </p>
            </li>
          </ul>
        </nav>
      </div>
      {/* ModelCreate */}
      <Modal isOpen={isOpenModalCreate}>
        <CreateStaffForm closeModal={() => setOpenModalCreate(false)} />
      </Modal>
      {/* ModelUpdate */}
      <Modal isOpen={isOpenModalUpdate}>
        <UpdateStaffForm closeModal={() => setOpenModalUpdate(false)} />
      </Modal>
    </div>
  );
};
const mapGlobalStateToProps = (state) => {
  return {
    staffs: selectListStaff(state),
    page: selectPage(state),
    size: selectSize(state),
    totalElement: selectTotalElement(state),
    userInfo: selectUserInfo(state),
  };
};
export default connect(mapGlobalStateToProps, { getListStaffAction })(
  StaffManager
);
