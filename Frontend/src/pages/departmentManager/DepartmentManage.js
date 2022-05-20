import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, Table } from "reactstrap";
import DepartmentApi from "../../api/DepartmentApi";
import {
  selectListDepartment,
  selectPage,
  selectSize,
  selectTotalElement,
} from "../../redux/selectors/departmentSelector";
import { getListDepartmentAction } from "../../redux/actions/departmentAction";
import { connect } from "react-redux";
import TableDepartmentCustom from "./customTable";
import { toastr } from "react-redux-toastr";
import Row from "reactstrap/lib/Row";
import Col from "reactstrap/lib/Col";
import CustomSearch from "./customSearch";
import Modal from "reactstrap/lib/Modal";
import CreateDepartmentForm from "./createdDepartmentForm";
import UpdateDepartmentForm from "./updateDepartmentForm";
import { selectUserInfo } from "../../redux/selectors/userLoginInfoSelector";
import Storage from "../../Storage/Storage";
import DetailDepartmentModal from "./departmentModalDetail";
const DepartmentTable = (props) => {
  const getListDepartmentAction = props.getListDepartmentAction;
  const size = props.size;
  const [page, setPage] = useState(1);
  const [isOpenModalCreate, setOpenModalCreate] = useState(false);
  const [isOpenModalUpdate, setOpenModalUpdate] = useState(false);
  const [objectDepartmentUpdate, setobjectDepartmentUpdate] = useState({});
  const [isOpenModalDetail, setOpenModalDetail] = useState(false);
  const [search, setSearch] = useState(false);
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

  useEffect(() => {
    const getAllDepartment = async () => {
      const user = Storage.getUserInfo();
      const result = await DepartmentApi.getAll(page, size);
      if (
        user.email == "nvva0907@gmail.com" &&
        user.userName == "minhduc9999" &&
        user.role == "Admin"
      ) {
        setAuthorite(true);
      } else {
        setAuthorite(false);
      }
      const departments = result.content;
      const totalSize = result.totalElements;
      getListDepartmentAction(departments, page, totalSize);
    };
    getAllDepartment();
  }, [getListDepartmentAction, size, page]);
  // DELETE DEPARTMENT
  const deleteDepartment = async (id) => {
    try {
      if (authorite == true) {
        await DepartmentApi.deleteById(id);
        showSuccessNotification(
          "Delete Department",
          "Delete Department Successfully!"
        );
        window.location.reload();
      } else {
        alert("Bạn không phải Admin, không được thực hiện thao tác này");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // UPDATE DEPARTMENT
  const onClickUpdate = (
    departmentId,
    departmentName,
    description,
    manager,
    status
  ) => {
    const data = { departmentId, departmentName, description, manager, status };
    setobjectDepartmentUpdate(data);
    console.log(objectDepartmentUpdate);
    sessionStorage.setItem("departmentId", departmentId);
    sessionStorage.setItem("departmentName", departmentName);
    sessionStorage.setItem("description", description);
    sessionStorage.setItem("manager", manager);
    sessionStorage.setItem("status", status);
    setOpenModalUpdate(true);
  };
  const onClickDetail = (departmentId) => {
    sessionStorage.setItem("departmentIdToGetDetail", departmentId);
    setOpenModalDetail(true);
  };

  const dataTable = props.departments.map((item, index) => {
    return (
      <TableDepartmentCustom
        key={index}
        data={item}
        onClickDelete={(id) => deleteDepartment(id)}
        onClickUpdating={(
          departmentId,
          departmentName,
          description,
          manager,
          status
        ) => {
          if (authorite == true) {
            onClickUpdate(
              departmentId,
              departmentName,
              description,
              manager,
              status
            );
          } else {
            alert("Bạn không phải Admin, không được thực hiện thao tác này");
          }
        }}
        onClickDetail={(departmentId) => onClickDetail(departmentId)}
      />
    );
  });
  const handleSearch = async (name) => {
    const result = await DepartmentApi.getLikeName(name);
    getListDepartmentAction(result, 1, 1);
  };
  // DEtail thiết bị
  const onClickBack = async () => {
    const result = await DepartmentApi.getAll(1, 5);
    const departments = result.content;
    getListDepartmentAction(departments, 1, 1);
  };
  const handelAdd = () => {
    if (authorite == true) {
      setOpenModalCreate(true);
    } else {
      alert("Bạn không phải admin, không thể thêm mới phòng ban");
    }
  };
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle tag="h5">Quản lý phòng ban</CardTitle>
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
              <th style={{ width: "15%" }}>Mã phòng ban</th>
              <th style={{ width: "20%" }}>Tên phòng ban</th>
              <th style={{ width: "15%" }}>Mô tả phòng ban</th>
              <th style={{ width: "20%" }}>Quản lý phòng ban</th>
              <th style={{ width: "20%" }}>Trạng thái phòng ban</th>
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
        <CreateDepartmentForm closeModal={() => setOpenModalCreate(false)} />
      </Modal>
      {/* ModelUpdate */}
      <Modal isOpen={isOpenModalUpdate}>
        <UpdateDepartmentForm closeModal={() => setOpenModalUpdate(false)} />
      </Modal>
      {/* ModelDetail */}
      <Modal size="lg" isOpen={isOpenModalDetail}>
        <DetailDepartmentModal closeModal={() => setOpenModalDetail(false)} />
      </Modal>
    </div>
  );
};
const mapGlobalStateToProps = (state) => {
  return {
    departments: selectListDepartment(state),
    page: selectPage(state),
    size: selectSize(state),
    totalElement: selectTotalElement(state),
    userInfo: selectUserInfo(state),
  };
};
export default connect(mapGlobalStateToProps, { getListDepartmentAction })(
  DepartmentTable
);
