import React from "react";
import { toastr } from "react-redux-toastr";
import EquipmentApi from "../../api/EquipmentApi";
import { Button } from "reactstrap";

const DetailInventoryModal = (props) => {
  return (
    <div>
      <div class="text-center" style={{ marginTop: "50px" }}>
        <Button color="danger" size="lg">
          Chi tiết thiết bị
        </Button>
      </div>
      <div style={{ width: "500px", height: "400px", padding: "50px" }}>
        <b>Mã thiết bị : </b>
        {sessionStorage.getItem("equipmentId")}
        <br></br>
        <b>Tên thiết bị :</b>
        {sessionStorage.getItem("equipmentName")}
        <br></br>
        <b>Phân loại : </b>
        {sessionStorage.getItem("classify")}
        <br></br>
        <b>Mô tả : </b>
        {sessionStorage.getItem("description")}
        <br></br>
        <b>Thương hiệu : </b>
        {sessionStorage.getItem("brand")}
        <br></br>
        <b>Nhân viên quản lý :</b>
        {sessionStorage.getItem("staffName")}
        <br></br>
        <b>Thời hạn bảo hành : </b>
        {sessionStorage.getItem("insurance")}
        <br></br>
        <b>Đơn giá : </b>
        {sessionStorage.getItem("unitPrice")}
        <br></br>
        <b>Số lượng : </b>
        {sessionStorage.getItem("quantity")}
        <br></br>

        <div style={{ float: "right" }}>
          <Button color="primary" size="sm" onClick={props.closeModal}>
            Đóng
          </Button>
        </div>
      </div>
    </div>
  );
};
export default DetailInventoryModal;
