import React from "react";
import ReactExport from "react-export-excel";
import { Button } from "reactstrap";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export class ExportExcelEquipment extends React.Component {
  render() {
    return (
      <ExcelFile element={<Button color="warning">Báo cáo Excel</Button>}>
        <ExcelSheet data={this.props.data} name="Employees">
          <ExcelColumn label="Mã thiết bị" value="equipmentId" />
          <ExcelColumn label="Tên thiết bị" value="equipmentName" />
          <ExcelColumn label="Thương hiệu" value="brand" />
          <ExcelColumn label="Nhân viên quản lý" value="staffName" />
          <ExcelColumn label="Phân loại" value="classify" />
          <ExcelColumn label="Mô tả" value="description" />
          <ExcelColumn label="Trạng thái" value="equipmentStatus" />
        </ExcelSheet>
      </ExcelFile>
    );
  }
}
