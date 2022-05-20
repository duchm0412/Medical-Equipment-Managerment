import React from "react";
import { Edit2, Trash } from "react-feather";
import Button from "reactstrap/lib/Button";
import Tooltip from "reactstrap/lib/Tooltip";
import UncontrolledTooltip from "reactstrap/lib/UncontrolledTooltip";
const TableStaffCustom = (props) => {
  return (
    <tbody>
      <tr>
        <td>{props.data.staffId}</td>
        <td>{props.data.fullName}</td>
        <td>{props.data.phone}</td>
        <td>{props.data.email}</td>
        <td>{props.data.departmentId}</td>

        <td>{props.data.role}</td>
        <td className="table-action">
          <Edit2
            className="align-middle mr-1"
            size={20}
            onClick={() =>
              props.onClickUpdating(
                props.data.staffId,
                props.data.fullName,
                props.data.phone,
                props.data.email,
                props.data.departmentId,
                props.data.role
              )
            }
          />
          <Trash
            className="align-middle"
            size={20}
            onClick={() => {
              if (
                window.confirm(
                  `Bạn có chắc chắn xóa nhân viên ${props.data.fullName} không ?`
                )
              ) {
                props.onClickDelete(props.data.staffId);
              }
            }}
          />
        </td>
      </tr>
    </tbody>
  );
};
export default TableStaffCustom;
