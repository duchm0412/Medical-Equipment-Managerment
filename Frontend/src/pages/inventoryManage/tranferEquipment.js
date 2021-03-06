import React from "react";
import { Button } from "reactstrap";
import { toastr } from "react-redux-toastr";
import Table from "reactstrap/lib/Table";
import DeartmentApi from "../../api/DepartmentApi";
import Select from "react-select";
import EquipmentApi from "../../api/EquipmentApi";
import InventoryApi from "../../api/InventoryApi";
const TranferEquipmentModal = (props) => {
  const [departmentId, setdepartmentId] = React.useState();
  const [departmentName, setdepartmentName] = React.useState();
  const [option, setOptions] = React.useState([]);
  const [equipmentId, setequipmentId] = React.useState();
  const [equipmentName, setequipmentName] = React.useState();
  const [classify, setclassify] = React.useState();
  const [description, setdescription] = React.useState();
  const [brand, setbrand] = React.useState();
  const [staffName, setstaffName] = React.useState();
  const [insurance, setinsurance] = React.useState();
  const [quantity, setquantity] = React.useState();
  const [unitPrice, setunitPrice] = React.useState();

  React.useEffect(() => {
    const getAllInventory = () => {
      setequipmentId(sessionStorage.getItem("equipmentId"));
      setequipmentName(sessionStorage.getItem("equipmentName"));
      setclassify(sessionStorage.getItem("classify"));
      setdescription(sessionStorage.getItem("description"));
      setbrand(sessionStorage.getItem("brand"));
      setstaffName(sessionStorage.getItem("staffName"));
      setinsurance(sessionStorage.getItem("insurance"));
      setquantity(sessionStorage.getItem("quantity"));
      setunitPrice(sessionStorage.getItem("unitPrice"));
    };
    console.log(insurance);
    getAllInventory();
  }, []);
  const showSuccessNotification = (title, message) => {
    const options = {
      timeOut: 2500,
      showCloseButton: false,
      progressBar: false,
      position: "top-right",
    };
    // show notification
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
  const getDepartment = async () => {
    const result = await DeartmentApi.getAll(0, 100);
    const data = result.content;
    const options = data.map((d) => ({
      value: `${d.departmentId}`,
      label: `${d.departmentName}`,
    }));
    setOptions(options);
  };
  const setQuantity = async () => {
    if (sessionStorage.getItem("quantity") == 1) {
      try {
        await InventoryApi.deleteById(sessionStorage.getItem("equipmentId"));
      } catch (error) {
        console.log(error);
      }
    } else if (sessionStorage.getItem("quantity") != 1)
      try {
        await InventoryApi.setQuantity(
          sessionStorage.getItem("equipmentId"),
          sessionStorage.getItem("equipmentId") - 1
        );
      } catch (error) {
        console.log(error);
      }
  };
  const handleSubmit = async () => {
    const equipmentStatus = "READY";
    try {
      if (departmentId != null) {
        await EquipmentApi.intoDepartment(
          equipmentId,
          equipmentName,
          classify,
          description,
          brand,
          staffName,
          insurance,
          unitPrice,
          quantity,
          departmentId
        );
        await EquipmentApi.create(
          equipmentId,
          equipmentName,
          classify,
          description,
          brand,
          staffName,
          insurance,
          equipmentStatus
        );
        if (sessionStorage.getItem("quantity") == 1) {
          try {
            await InventoryApi.deleteById(
              sessionStorage.getItem("equipmentId")
            );
          } catch (error) {
            console.log(error);
          }
        } else if (sessionStorage.getItem("quantity") != 1)
          try {
            await InventoryApi.setQuantity(
              sessionStorage.getItem("equipmentId"),
              sessionStorage.getItem("quantity") - 1
            );
          } catch (error) {
            console.log(error);
          }
        showSuccessNotification("??i???u chuy???n thi???t b???", ">>> Th??nh c??ng");
      } else {
        showErrorNotification("??i???u chuy???n thi???t b???", ">>> Th???t b???i");
      }

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setdepartmentId(e.value);
    setdepartmentName(e.label);
  };
  return (
    <div>
      <div className="text-center" style={{ marginTop: "50px" }}>
        <Button color="danger" size="lg">
          ??i???u ph???i thi???t b???
        </Button>
      </div>
      <div style={{ width: "500px", height: "700px", padding: "50px" }}>
        <b>M?? thi???t b??? : </b>
        {sessionStorage.getItem("equipmentId")}
        <br></br>
        <b>T??n thi???t b??? :</b>
        {sessionStorage.getItem("equipmentName")}
        <br></br>
        <b>Ph??n lo???i : </b>
        {sessionStorage.getItem("classify")}
        <br></br>
        <b>M?? t??? : </b>
        {sessionStorage.getItem("description")}
        <br></br>
        <b>Th????ng hi???u : </b>
        {sessionStorage.getItem("brand")}
        <br></br>
        <b>Nh??n vi??n qu???n l?? :</b>
        {sessionStorage.getItem("staffName")}
        <br></br>
        <b>Th???i h???n b???o h??nh : </b>
        {sessionStorage.getItem("insurance")}
        <br></br>
        <b>????n gi?? : </b>
        {sessionStorage.getItem("unitPrice")}
        <br></br>
        <b>S??? l?????ng : </b>
        {sessionStorage.getItem("quantity")}
        <br></br>
        <br></br>
        <br></br>
        <b>L???a ch???n ph??ng ban ???????c chuy???n ?????n : </b>
        <div onClick={() => getDepartment()}>
          <Select options={option} onChange={(e) => handleChange(e)} />
        </div>

        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <div style={{ float: "right" }}>
          <Button color="warning" size="sm" onClick={() => handleSubmit()}>
            ??i???u ph???i ngay
          </Button>{" "}
          <Button color="primary" size="sm" onClick={props.closeModal}>
            ????ng
          </Button>
        </div>
      </div>
    </div>
  );
};
export default TranferEquipmentModal;
