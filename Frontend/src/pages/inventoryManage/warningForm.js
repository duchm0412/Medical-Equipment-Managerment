import React from "react";
import { toastr } from "react-redux-toastr";
import EquipmentApi from "../../api/EquipmentApi";
import { Button } from "reactstrap";

const WarningRepairForm = (props) => {
  const showSuccessNotification = (title, message) => {
    const options = {
      timeOut: 2500,
      showCloseButton: false,
      progressBar: false,
      position: "top-right",
    };
    toastr.success(title, message, options);
  };
  const warningErrorEquipment = async () => {
    try {
      await EquipmentApi.warningErrorEquipment(
        sessionStorage.getItem("equipmentId")
      );
      showSuccessNotification("----Báo hỏng----", "Báo hỏng thành công");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div class="text-center" style={{ marginTop: "10px" }}>
        <Button color="danger" size="lg">
          Báo hỏng
        </Button>
      </div>
      <div style={{ width: "500px", height: "600px", padding: "30px" }}>
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
        <b>Trạng thái : </b>
        {sessionStorage.getItem("equipmentStatus")}
        <br></br>
        <div class="form-group">
          <label for="exampleFormControlTextarea1">
            <b>Mô tả tình trạng sản phẩm : </b>
          </label>
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="7"
          ></textarea>
        </div>
        <div style={{ float: "right" }}>
          <Button
            color="warning"
            size="sm"
            onClick={() => warningErrorEquipment()}
          >
            Báo hỏng
          </Button>{" "}
          <Button color="primary" size="sm" onClick={props.closeModal}>
            Đóng
          </Button>
        </div>
      </div>
    </div>
  );
};
export default WarningRepairForm;
