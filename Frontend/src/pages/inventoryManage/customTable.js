import * as React from "react";
import { Edit2, Trash } from "react-feather";
import { FcHighPriority } from "react-icons/fc";
import { FiEye } from "react-icons/fi";
import Button from "reactstrap/lib/Button";
import Table from "reactstrap/lib/Table";
import DeartmentApi from "../../api/DepartmentApi";

const TableInventoryCustom = (props) => {
  return (
    <tbody>
      <tr>
        <td>{props.data.equipmentId}</td>
        <td>{props.data.equipmentName}</td>
        <td>{props.data.staffName}</td>
        <td>{props.data.unitPrice}</td>
        <td>{props.data.quantity}</td>
        <td>
          <Button
            color="success"
            onClick={() =>
              props.onClickTranfer(
                props.data.equipmentId,
                props.data.equipmentName,
                props.data.classify,
                props.data.description,
                props.data.brand,
                props.data.staffName,
                props.data.insurance,
                props.data.unitPrice,
                props.data.quantity
              )
            }
          >
            Điều chuyển thiết bị này
          </Button>
        </td>
        <td className="table-action">
          <Edit2
            className="align-middle mr-1"
            size={20}
            onClick={() =>
              props.onClickUpdating(
                props.data.equipmentId,
                props.data.equipmentName,
                props.data.classify,
                props.data.description,
                props.data.brand,
                props.data.staffName,
                props.data.insurance,
                props.data.unitPrice,
                props.data.quantity
              )
            }
          />
          <Trash
            className="align-middle"
            size={20}
            onClick={() => {
              if (window.confirm("Bạn có chắc chắn xóa thiết bị này không ?")) {
                props.onClickDelete(props.data.equipmentId);
              }
            }}
          />

          <FiEye
            className="align-middle"
            size={20}
            onClick={() =>
              props.onClickDetail(
                props.data.equipmentId,
                props.data.equipmentName,
                props.data.classify,
                props.data.description,
                props.data.brand,
                props.data.staffName,
                props.data.insurance,
                props.data.unitPrice,
                props.data.quantity
              )
            }
          />
        </td>
      </tr>
    </tbody>
  );
};
export default TableInventoryCustom;
