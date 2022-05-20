import React from "react";
import Table from "reactstrap/lib/Table";
const Group = (props) => {
  return (
    <div>
      {" "}
      <h1>Việc cần làm :</h1>
      <div>1. Thêm trưởng phòng cho department</div>
      <div>2. Sửa .test khi update EquipmentName</div>
      <div>3. Nâng cấp lên Selection cho trường EquipmentStatus</div>
      <div>
        4. Nâng cấp tự động đóng modal : Đã sửa (sử dụng load lại trang)
      </div>
      <div>5. Check tồn tại nhân viên mỗi khi sửa</div>
      <div>6. Nâng cấp lại Search</div>
    </div>
  );
};

export default Group;
