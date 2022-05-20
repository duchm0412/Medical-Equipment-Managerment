import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, Table } from "reactstrap";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import Row from "reactstrap/lib/Row";
import Col from "reactstrap/lib/Col";
import Modal from "reactstrap/lib/Modal";

import { getListEquipmentAction } from "../../redux/actions/equipmentAction";
import {
  selectListEquipment,
  selectPage,
  selectSize,
  selectTotalElement,
} from "../../redux/selectors/equipmentSelector";
import EquipmentApi from "../../api/EquipmentApi";
import StaffApi from "../../api/StaffApi";
import TableEquipmentCustom from "./customTable";
import CustomSearch from "./customSearch";
import CreateEquipmentForm from "./createdEquipForm";
import UpdateEquipmentForm from "./updateEquipForm";
import { selectUserInfo } from "../../redux/selectors/userLoginInfoSelector";
import Storage from "../../Storage/Storage";
import WarningRepairForm from "./warningForm";
import DetailEquipmentModal from "./detailModal";
const EquipmentManager = (props) => {
  const getListEquipmentAction = props.getListEquipmentAction;
  const size = props.size;
  const [page, setPage] = useState(1);
  const [isOpenModalCreate, setOpenModalCreate] = useState(false);
  const [isOpenModalUpdate, setOpenModalUpdate] = useState(false);
  const [isOpenModalRepair, setOpenModalRepair] = useState(false);
  const [isOpenModalDetail, setOpenModalDetail] = useState(false);
  const [search, setSearch] = useState(false);
  const [authorite, setAuthorite] = useState(false);
  const [equipmentNoPage, setequipmentNoPage] = useState([]);
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
    const getAllEquipment = async () => {
      const user = Storage.getUserInfo();
      const result = await EquipmentApi.getAll(page, size);

      if (
        user.email == "nvva0907@gmail.com" &&
        user.userName == "minhduc9999" &&
        user.role == "Admin"
      ) {
        setAuthorite(true);
      } else {
        setAuthorite(false);
      }
      ///

      ///
      const result2 = await EquipmentApi.getAll(page, result.totalElements);
      const equipments0 = result2.content;
      if (equipmentNoPage.length == 0) {
        setequipmentNoPage(equipments0);
      }
      const equipments = result.content;
      const totalSize = result.totalElements;
      getListEquipmentAction(equipments, page, totalSize);
    };

    getAllEquipment();
  }, [authorite, getListEquipmentAction, size, page]);
  //DELETE EQUIPMENT
  const deleteEquipment = async (id) => {
    if (authorite == true) {
      await EquipmentApi.deleteById(id);
      showSuccessNotification(
        "Delete Equipment",
        "Delete Equipment Successfully!"
      );
      window.location.reload();
    } else {
      alert("Bạn không phải Admin, không được thực hiện thao tác này");
    }
  };

  // UPDATE EQUIPMENT
  const onClickUpdate = (
    equipmentId,
    equipmentName,
    classify,
    description,
    brand,
    staffName,
    insurance,
    equipmentStatus
  ) => {
    sessionStorage.setItem("equipmentId", equipmentId);
    sessionStorage.setItem("equipmentName", equipmentName);
    sessionStorage.setItem("classify", classify);
    sessionStorage.setItem("description", description);
    sessionStorage.setItem("brand", brand);
    sessionStorage.setItem("staffName", staffName);
    sessionStorage.setItem("insurance", insurance);
    sessionStorage.setItem("equipmentStatus", equipmentStatus);
    setOpenModalUpdate(true);
  };
  // BÁO HỎNG
  const onClickWarning = (
    equipmentId,
    equipmentName,
    classify,
    description,
    brand,
    staffName,
    insurance,
    equipmentStatus
  ) => {
    sessionStorage.setItem("equipmentId", equipmentId);
    sessionStorage.setItem("equipmentName", equipmentName);
    sessionStorage.setItem("classify", classify);
    sessionStorage.setItem("description", description);
    sessionStorage.setItem("brand", brand);
    sessionStorage.setItem("staffName", staffName);
    sessionStorage.setItem("insurance", insurance);
    sessionStorage.setItem("equipmentStatus", equipmentStatus);
    setOpenModalRepair(true);
  };
  //DETAIL THIẾT BỊ
  const onClickDetail = (
    equipmentId,
    equipmentName,
    classify,
    description,
    brand,
    staffName,
    insurance,
    equipmentStatus
  ) => {
    sessionStorage.setItem("equipmentId", equipmentId);
    sessionStorage.setItem("equipmentName", equipmentName);
    sessionStorage.setItem("classify", classify);
    sessionStorage.setItem("description", description);
    sessionStorage.setItem("brand", brand);
    sessionStorage.setItem("staffName", staffName);
    sessionStorage.setItem("insurance", insurance);
    sessionStorage.setItem("equipmentStatus", equipmentStatus);
    setOpenModalDetail(true);
  };
  const dataTable = props.equipments.map((item, index) => {
    return (
      <TableEquipmentCustom
        key={index}
        data={item}
        // DELETE
        onClickDelete={(id) => deleteEquipment(id)}
        //UPDATE
        onClickUpdating={(
          equipmentId,
          equipmentName,
          classify,
          description,
          brand,
          staffName,
          insurance,
          equipmentStatus
        ) => {
          onClickUpdate(
            equipmentId,
            equipmentName,
            classify,
            description,
            brand,
            staffName,
            insurance,
            equipmentStatus
          );
        }}
        //BÁO HỎNG
        onClickWarning={(
          equipmentId,
          equipmentName,
          classify,
          description,
          brand,
          staffName,
          insurance,
          equipmentStatus
        ) =>
          onClickWarning(
            equipmentId,
            equipmentName,
            classify,
            description,
            brand,
            staffName,
            insurance,
            equipmentStatus
          )
        }
        // DEtail thiết bị
        onClickDetail={(
          equipmentId,
          equipmentName,
          classify,
          description,
          brand,
          staffName,
          insurance,
          equipmentStatus
        ) =>
          onClickDetail(
            equipmentId,
            equipmentName,
            classify,
            description,
            brand,
            staffName,
            insurance,
            equipmentStatus
          )
        }
      />
    );
  });
  const handelAdd = () => {
    setOpenModalCreate(true);
  };
  const handleSearch = async (name) => {
    const result = await EquipmentApi.getLikeName(name);
    getListEquipmentAction(result, 1, 1);
  };
  const onClickBack = async () => {
    const result = await EquipmentApi.getAll(1, 5);
    const eq = result.content;
    getListEquipmentAction(eq, 1, 1);
  };
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle tag="h5">Thiết bị y tế </CardTitle>
        </CardHeader>
        <Row style={{ alignItems: "flex-end" }}>
          <Col xs="9">
            <CustomSearch
              handleSearch={(name) => handleSearch(name)}
              openCreateModal={() => handelAdd()}
              onClickBack={() => onClickBack()}
              data={equipmentNoPage}
            />
          </Col>
        </Row>
        <Table>
          <thead>
            <tr>
              <th style={{ width: "12%" }}>Mã thiết bị</th>
              <th style={{ width: "10%" }}>Trạng thái</th>
              <th style={{ width: "18%" }}>Tên thiết bị</th>
              <th style={{ width: "20%" }}>Mô tả thiết bị</th>
              <th style={{ width: "18%" }}>Nhân viên quản lý</th>
              <th style={{ width: "10%" }}>Phân loại</th>
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
        <CreateEquipmentForm closeModal={() => setOpenModalCreate(false)} />
      </Modal>
      {/* ModelUpdate */}
      <Modal isOpen={isOpenModalUpdate}>
        <UpdateEquipmentForm closeModal={() => setOpenModalUpdate(false)} />
      </Modal>
      {/* ModelWarning */}
      <Modal isOpen={isOpenModalRepair}>
        <WarningRepairForm closeModal={() => setOpenModalRepair(false)} />
      </Modal>
      {/* ModelDetail */}
      <Modal isOpen={isOpenModalDetail}>
        <DetailEquipmentModal closeModal={() => setOpenModalDetail(false)} />
      </Modal>
    </div>
  );
};
const mapGlobalStateToProps = (state) => {
  return {
    equipments: selectListEquipment(state),
    page: selectPage(state),
    size: selectSize(state),
    totalElement: selectTotalElement(state),
    userInfo: selectUserInfo(state),
  };
};
export default connect(mapGlobalStateToProps, { getListEquipmentAction })(
  EquipmentManager
);
