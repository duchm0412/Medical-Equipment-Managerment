import React from "react";
import { toastr } from "react-redux-toastr";
import EquipmentApi from "../../api/EquipmentApi";
import { Button } from "reactstrap";
import StaffApi from "../../api/StaffApi";
import Table from "reactstrap/lib/Table";
import InventoryApi from "../../api/InventoryApi";

const DetailDepartmentModal = (props) => {
  const [staffs, setstaffs] = React.useState([]);
  const [equipment, setequipment] = React.useState([]);
  const showSuccessNotification = (title, message) => {
    const options = {
      timeOut: 2500,
      showCloseButton: false,
      progressBar: false,
      position: "top-right",
    };
    toastr.success(title, message, options);
  };
  React.useEffect(() => {
    const getEmployeeOfDepartment = async () => {
      const id = sessionStorage.getItem("departmentIdToGetDetail");
      const result = await StaffApi.findStaffByDepartmentId(`${id}`);
      const equipt = await EquipmentApi.getOnlyDpIDEquipID(`${id}`);
      const staff = result.content;
      ///
      const getStaff = staff.map((d) => ({
        fullName: `${d.fullName}`,
        phone: `${d.phone}`,
        role: `${d.role}`,
      }));
      setstaffs(getStaff);
      ///
      const equipments = equipt;
      const getEquipments = equipments.map((d) => ({
        equipId: `${d.equipmentId}`,
        equipName: `${d.equipmentName}`,
        equipmentStatus: `${d.equipmentStatus}`,
        departmentId: `${d.departmentId}`,
        classify: `${d.classify}`,
        description: `${d.description}`,
        brand: `${d.brand}`,
        staffName: `${d.staffName}`,
        insurance: `${d.insurance}`,
        quantity: `${d.quantity}`,
        unitPrice: `${d.unitPrice}`,
      }));
      setequipment(getEquipments);
    };
    getEmployeeOfDepartment();
  }, []);

  const dataTableStaff = staffs.map((item, index) => {
    return (
      <tbody>
        <tr>
          <td>{item.fullName}</td>
          <td>{item.phone}</td>
          <td>{item.role}</td>
        </tr>
      </tbody>
    );
  });

  const handlePay = async (
    equipmentId,
    departmentId,
    equipName,
    equipmentStatus,
    classify,
    description,
    brand,
    staffName,
    insurance,
    quantity,
    unitPrice
  ) => {
    console.log(equipmentId + " " + departmentId);
    try {
      await EquipmentApi.deleteInEquipOfDpById(equipmentId, departmentId);
      //////////////
      const result = await InventoryApi.existsByEquipmentId(equipmentId);
      console.log(result);
      if (result == []) {
        const quantity0 = 1;
        try {
          await InventoryApi.create(
            equipmentId,
            equipName,
            classify,
            description,
            brand,
            staffName,
            insurance,
            unitPrice,
            quantity0
          );
        } catch (error) {
          console.log(error);
        }
      } else if (result != null)
        try {
          await InventoryApi.setQuantity(
            result.equipmentId,
            result.quantity + 1
          );
        } catch (error) {
          console.log(error);
        }
      ////////////////
      showSuccessNotification("Tr??? m??y", ">>> Th??nh c??ng !");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const dataTableEquip = equipment.map((item, index) => {
    return (
      <tbody>
        <tr>
          <td>{item.equipId}</td>
          <td>{item.equipName}</td>
          <td>{item.equipmentStatus}</td>
          <td>
            <Button
              color="warning"
              onClick={() =>
                handlePay(
                  item.equipId,
                  item.departmentId,
                  item.equipName,
                  item.equipmentStatus,
                  item.classify,
                  item.description,
                  item.brand,
                  item.staffName,
                  item.insurance,
                  item.quantity,
                  item.unitPrice
                )
              }
            >
              Tr??? m??y
            </Button>
          </td>
        </tr>
      </tbody>
    );
  });
  return (
    <div>
      <div className="text-center" style={{ marginTop: "50px" }}>
        <Button color="danger" size="lg">
          Chi ti???t ph??ng ban
        </Button>
      </div>
      <div style={{ height: "400px", padding: "50px" }}>
        <b>Nh??n vi??n : </b>
        <Table>
          <thead>
            <tr>
              <th style={{ width: "25%" }}>T??n nh??n vi??n</th>
              <th style={{ width: "25%" }}>S??? ??i???n tho???i</th>
              <th style={{ width: "25%" }}>Ch???c v???</th>
            </tr>
          </thead>
          {dataTableStaff}
        </Table>
        <br></br>
        <b>Thi???t b??? :</b>
        <Table>
          <thead>
            <tr>
              <th style={{ width: "20%" }}>M?? thi???t b??? </th>
              <th style={{ width: "40%" }}>T??n thi???t b???</th>
              <th style={{ width: "20%" }}>Tr???ng th??i</th>
              <th style={{ width: "25%" }}>Tr??? thi???t b???</th>
            </tr>
          </thead>
          {dataTableEquip}
        </Table>

        <br></br>

        <div style={{ float: "right" }}>
          <Button color="primary" size="sm" onClick={props.closeModal}>
            ????ng
          </Button>
        </div>
      </div>
    </div>
  );
};
export default DetailDepartmentModal;
