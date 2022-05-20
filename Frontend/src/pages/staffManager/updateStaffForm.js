import React from "react";
import { Button, Card, CardBody, FormGroup } from "reactstrap";
import { Formik, FastField, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ReactstrapInput } from "reactstrap-formik";
import DepartmentApi from "../../api/DepartmentApi";
import { toastr } from "react-redux-toastr";
import StaffApi from "../../api/StaffApi";

const UpdateStaffForm = (props) => {
  const showSuccessNotification = (title, message) => {
    const options = {
      timeOut: 2500,
      showCloseButton: false,
      progressBar: true,
      position: "top-right",
    };
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
  const removeStaffInStorage = () => {
    sessionStorage.removeItem("staffId");
    sessionStorage.removeItem("fullName");
    sessionStorage.removeItem("phone");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("departmentId");
    sessionStorage.removeItem("role");
  };

  return (
    <>
      <Formik
        initialValues={{
          staffId: sessionStorage.getItem("staffId"),
          fullName: sessionStorage.getItem("fullName"),
          phone: sessionStorage.getItem("phone"),
          email: sessionStorage.getItem("email"),
          departmentId: sessionStorage.getItem("departmentId"),
          role: sessionStorage.getItem("role"),
          errorForm: "",
        }}
        validationSchema={Yup.object({
          fullName: Yup.string()
            .max(50, "Tối đa 50 ký tự")
            .required("Required"),
          phone: Yup.string()
            .max(11, "Số điện thoại từ 10 đến 11 chữ số ")
            .max(10, "Số điện thoại từ 10 đến 11 chữ số")
            .required("Required")
            .test(
              "checkUniquePhone",
              "Số điện thoại này đã tồn tại",
              async (phone) => {
                const isExists = await StaffApi.findStaffByStaffPhone(phone);
                return !isExists;
              }
            ),
          email: Yup.string()
            .max(100, "Tối đa 100 ký tự")
            .required("Required")
            .test(
              "checkUniquePhone",
              "Email này đã được sử dụng",
              async (email) => {
                const isExists = await StaffApi.findStaffByEmail(email);
                return !isExists;
              }
            ),
          departmentId: Yup.string()
            .max(10, "Tối đa 10 ký tự")
            .required("Required")
            .test(
              "checkUniquePhone",
              "Hiện không tồn tại phòng ban này",
              async (departmentId) => {
                const isExists = await DepartmentApi.existsByDepartmentId(
                  departmentId
                );
                return isExists;
              }
            ),
          role: Yup.string()
            .max(10, "Tối đa 10 ký tự")
            .required("Required")
            .test(
              "checkformequipmentStatus",
              "Chỉ chấp nhận các trường: Admin hoặc Employee hoặc Manager ",
              (role) => {
                if (
                  role.match("Admin") ||
                  role.match("Employee") ||
                  role.match("Manager")
                ) {
                  return true;
                }
                return false;
              }
            ),
        })}
        onSubmit={async (values, { setFieldError }) => {
          try {
            const result = await StaffApi.update(
              values.staffId,
              values.fullName,
              values.phone,
              values.email,
              values.departmentId,
              values.role
            );
            if (result == "success") {
              showSuccessNotification("Cập nhật nhân viên", ">>> Thành công");
            } else {
              showErrorNotification("Cập nhật nhân viên", ">>> Thất bại");
            }
            removeStaffInStorage();
            window.location.reload();
          } catch (error) {
            setFieldError(
              "errorForm",
              "Lỗi hệ thống, xin lỗi về sự bất tiện này"
            );
          }
        }}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ isSubmitting }) => (
          <Card>
            <CardBody>
              <div className="m-sm-4">
                <Form>
                  <FormGroup>
                    <FastField
                      label="Mã nhân viên"
                      bsSize="sm"
                      type="text"
                      name="staffId"
                      readonly="readonly"
                      component={ReactstrapInput}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FastField
                      label
                      label="Họ tên nhân viên"
                      bsSize="sm"
                      type="text"
                      name="fullName"
                      component={ReactstrapInput}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FastField
                      label="Số điện thoại"
                      bsSize="sm"
                      type="text"
                      name="phone"
                      component={ReactstrapInput}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FastField
                      bsSize="sm"
                      type="text"
                      label="Email"
                      name="email"
                      component={ReactstrapInput}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FastField
                      bsSize="sm"
                      type="text"
                      label="Phòng ban"
                      name="departmentId"
                      component={ReactstrapInput}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FastField
                      bsSize="sm"
                      type="text"
                      label="Cấp bậc"
                      name="role"
                      component={ReactstrapInput}
                    />
                  </FormGroup>
                  <ErrorMessage
                    name="errorForm"
                    component={"div"}
                    className="invalid-feedback"
                    style={{ display: "block" }}
                  />
                  <div style={{ float: "right" }}>
                    <Button
                      type="submit"
                      color="primary"
                      size="sm"
                      disabled={isSubmitting}
                    >
                      Cập nhật
                    </Button>
                    <Button
                      color="primary"
                      size="sm"
                      onClick={props.closeModal}
                    >
                      Đóng
                    </Button>
                  </div>
                </Form>
              </div>
            </CardBody>
          </Card>
        )}
      </Formik>
    </>
  );
};

export default UpdateStaffForm;
