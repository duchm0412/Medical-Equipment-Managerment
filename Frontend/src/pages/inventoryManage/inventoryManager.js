import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, Table } from "reactstrap";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import Row from "reactstrap/lib/Row";
import Col from "reactstrap/lib/Col";
import Modal from "reactstrap/lib/Modal";

import { getListInventoryAction } from "../../redux/actions/inventoryAction";
import {
  selectListInventory,
  selectPage,
  selectSize,
  selectTotalElement,
} from "../../redux/selectors/inventorySelector";
import CustomSearch from "./customSearch";
import { selectUserInfo } from "../../redux/selectors/userLoginInfoSelector";
import Storage from "../../Storage/Storage";
import InventoryApi from "../../api/InventoryApi.js";
import TableInventoryCustom from "./customTable";
import CreateInventoryForm from "./createdInventoryForm";
import UpdateInventoryForm from "./updateInventoryForm";
import DetailInventoryModal from "./detailModal";
import TranferEquipmentModal from "./tranferEquipment";
const InventoryManager = (props) => {
  const getListInventoryAction = props.getListInventoryAction;
  const size = props.size;
  const [page, setPage] = useState(1);
  const [isOpenModalCreate, setOpenModalCreate] = useState(false);
  const [isOpenModalUpdate, setOpenModalUpdate] = useState(false);
  const [isOpenModalDetail, setOpenModalDetail] = useState(false);
  const [isOpenModalTranferEquipment, setOpenModalTranferEquipment] =
    useState(false);
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
    const getAllInventory = async () => {
      const user = Storage.getUserInfo();
      const result = await InventoryApi.getAll(page, size);
      if (
        user.email == "nvva0907@gmail.com" &&
        user.userName == "minhduc9999" &&
        user.role == "Admin"
      ) {
        setAuthorite(true);
      } else {
        setAuthorite(false);
      }
      const inventory = result.content;
      const totalSize = result.totalElements;
      getListInventoryAction(inventory, page, totalSize);
    };

    getAllInventory();
  }, [authorite, getListInventoryAction, size, page]);
  // DELETE EQUIPMENT
  const deleteInventory = async (id) => {
    if (authorite == true) {
      const result = await InventoryApi.deleteById(id);
      if (result == "success") {
        showSuccessNotification("Xóa thiết bị trong kho", ">>> Thành công");
      } else {
        showErrorNotification("Xóa thiết bị trong kho", ">>> Thất bại");
      }

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
    unitPrice,
    quantity
  ) => {
    sessionStorage.setItem("equipmentId", equipmentId);
    sessionStorage.setItem("equipmentName", equipmentName);
    sessionStorage.setItem("classify", classify);
    sessionStorage.setItem("description", description);
    sessionStorage.setItem("brand", brand);
    sessionStorage.setItem("staffName", staffName);
    sessionStorage.setItem("insurance", insurance);
    sessionStorage.setItem("unitPrice", unitPrice);
    sessionStorage.setItem("quantity", quantity);
    setOpenModalUpdate(true);
  };
  // DETAIL THIẾT BỊ
  const onClickDetail = (
    equipmentId,
    equipmentName,
    classify,
    description,
    brand,
    staffName,
    insurance,
    unitPrice,
    quantity
  ) => {
    sessionStorage.setItem("equipmentId", equipmentId);
    sessionStorage.setItem("equipmentName", equipmentName);
    sessionStorage.setItem("classify", classify);
    sessionStorage.setItem("description", description);
    sessionStorage.setItem("brand", brand);
    sessionStorage.setItem("staffName", staffName);
    sessionStorage.setItem("insurance", insurance);
    sessionStorage.setItem("unitPrice", unitPrice);
    sessionStorage.setItem("quantity", quantity);

    setOpenModalDetail(true);
  };

  const handelAdd = () => {
    setOpenModalCreate(true);
  };
  const handleTranferClick = (
    equipmentId,
    equipmentName,
    classify,
    description,
    brand,
    staffName,
    insurance,
    unitPrice,
    quantity
  ) => {
    sessionStorage.setItem("equipmentId", equipmentId);
    sessionStorage.setItem("equipmentName", equipmentName);
    sessionStorage.setItem("classify", classify);
    sessionStorage.setItem("description", description);
    sessionStorage.setItem("brand", brand);
    sessionStorage.setItem("staffName", staffName);
    sessionStorage.setItem("insurance", insurance);
    sessionStorage.setItem("unitPrice", unitPrice);
    sessionStorage.setItem("quantity", quantity);

    setOpenModalTranferEquipment(true);
  };

  const dataTable = props.inventory.map((item, index) => {
    return (
      <TableInventoryCustom
        key={index}
        data={item}
        // DELETE
        onClickDelete={(id) => deleteInventory(id)}
        //UPDATE
        onClickUpdating={(
          equipmentId,
          equipmentName,
          classify,
          description,
          brand,
          staffName,
          insurance,
          unitPrice,
          quantity
        ) => {
          onClickUpdate(
            equipmentId,
            equipmentName,
            classify,
            description,
            brand,
            staffName,
            insurance,
            unitPrice,
            quantity
          );
        }}
        // DEtail thiết bị
        onClickDetail={(
          equipmentId,
          equipmentName,
          classify,
          description,
          brand,
          staffName,
          insurance,
          unitPrice,
          quantity
        ) =>
          onClickDetail(
            equipmentId,
            equipmentName,
            classify,
            description,
            brand,
            staffName,
            insurance,
            unitPrice,
            quantity
          )
        }
        onClickTranfer={(
          equipmentId,
          equipmentName,
          classify,
          description,
          brand,
          staffName,
          insurance,
          unitPrice,
          quantity
        ) =>
          handleTranferClick(
            equipmentId,
            equipmentName,
            classify,
            description,
            brand,
            staffName,
            insurance,
            unitPrice,
            quantity
          )
        }
      />
    );
  });
  const handleSearch = async (name) => {
    const result = await InventoryApi.getLikeName(name);

    getListInventoryAction(result, 1, 1);
  };
  const onClickBack = async () => {
    const result = await InventoryApi.getAll(1, 5);
    const eq = result.content;
    getListInventoryAction(eq, 1, 1);
  };
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle tag="h5">
            <b style={{ fontSize: "30px" }}>Quản lý xuất nhập kho</b>
          </CardTitle>
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
              <th style={{ width: "10%" }}>Mã thiết bị</th>
              <th style={{ width: "20%" }}>Tên thiết bị</th>
              <th style={{ width: "15%" }}>Quản lý</th>
              <th style={{ width: "15%" }}>Đơn giá</th>
              <th style={{ width: "10%" }}>Số lượng</th>
              <th style={{ width: "20%" }}>Điều chuyển</th>
              <th > Actions</th>
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
        <CreateInventoryForm closeModal={() => setOpenModalCreate(false)} />
      </Modal>
      {/* ModelUpdate */}
      <Modal isOpen={isOpenModalUpdate}>
        <UpdateInventoryForm closeModal={() => setOpenModalUpdate(false)} />
      </Modal>
      {/* ModelDetail */}
      <Modal isOpen={isOpenModalDetail}>
        <DetailInventoryModal closeModal={() => setOpenModalDetail(false)} />
      </Modal>
      {/* ModelDetail */}
      <Modal isOpen={isOpenModalTranferEquipment}>
        <TranferEquipmentModal
          closeModal={() => setOpenModalTranferEquipment(false)}
        />
      </Modal>
    </div>
  );
};
const mapGlobalStateToProps = (state) => {
  return {
    inventory: selectListInventory(state),
    page: selectPage(state),
    size: selectSize(state),
    totalElement: selectTotalElement(state),
    userInfo: selectUserInfo(state),
  };
};
export default connect(mapGlobalStateToProps, { getListInventoryAction })(
  InventoryManager
);
