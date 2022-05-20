import React from "react";
import { Edit2, Trash } from "react-feather";
import { FiEye } from "react-icons/fi";
const TableDepartmentCustom = (props) => {
  return (
    <tbody>
      <tr>
        <td>{props.data.departmentId}</td>
        <td>{props.data.departmentName}</td>
        <td>{props.data.description}</td>
        <td>{props.data.manager}</td>
        <td>{props.data.status}</td>

        <td className="table-action">
          <Edit2
            className="align-middle mr-1"
            size={20}
            onClick={() =>
              props.onClickUpdating(
                props.data.departmentId,
                props.data.departmentName,
                props.data.description,
                props.data.manager,
                props.data.status
              )
            }
          />
          <Trash
            className="align-middle"
            size={20}
            onClick={() => {
              if (
                window.confirm("Bạn có chắc chắn xóa phòng ban này không ?")
              ) {
                props.onClickDelete(props.data.departmentId);
              }
            }}
          />
          <FiEye
            className="align-middle"
            size={20}
            onClick={() => props.onClickDetail(props.data.departmentId)}
          />
        </td>
      </tr>
    </tbody>
  );
};
export default TableDepartmentCustom;
