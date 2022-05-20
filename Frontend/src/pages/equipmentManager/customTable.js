import React from "react";
import { Edit2, Trash } from "react-feather";
import { FcHighPriority } from "react-icons/fc";
import { FiEye } from "react-icons/fi";
import Table from "reactstrap/lib/Table";

const TableEquipmentCustom = (props) => {
  return (
    <tbody>
      <tr>
        <td>{props.data.equipmentId}</td>
        <td>{props.data.equipmentStatus}</td>
        <td>{props.data.equipmentName}</td>
        <td>{props.data.description}</td>
        <td>{props.data.staffName}</td>
        <td>{props.data.classify}</td>
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
                props.data.equipmentStatus
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
          <FcHighPriority
            className="align-middle"
            size={20}
            onClick={() =>
              props.onClickWarning(
                props.data.equipmentId,
                props.data.equipmentName,
                props.data.classify,
                props.data.description,
                props.data.brand,
                props.data.staffName,
                props.data.insurance,
                props.data.equipmentStatus
              )
            }
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
                props.data.equipmentStatus
              )
            }
          />
        </td>
      </tr>
    </tbody>
  );
};
export default TableEquipmentCustom;
