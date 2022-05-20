import React from "react";
import { Button, Card, CardBody, FormGroup } from "reactstrap";
import { Formik, FastField, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ReactstrapInput } from "reactstrap-formik";
import Storage from "../../Storage/Storage";
import { toastr } from "react-redux-toastr";
import InventoryApi from "../../api/InventoryApi.js";
const UpdateInventoryForm = (props) => {
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
  return (
    <>
      <Formik
        initialValues={{
          equipmentId: sessionStorage.getItem("equipmentId"),
          equipmentName: sessionStorage.getItem("equipmentName"),
          classify: sessionStorage.getItem("classify"),
          description: sessionStorage.getItem("description"),
          brand: sessionStorage.getItem("brand"),
          staffName: sessionStorage.getItem("staffName"),
          insurance: sessionStorage.getItem("insurance"),
          unitPrice: sessionStorage.getItem("unitPrice"),
          quantity: sessionStorage.getItem("quantity"),
          errorForm: "",
        }}
        validationSchema={Yup.object({
          equipmentName: Yup.string()
            .max(50, "Must be less than 100 characters or equal")
            .required("Required")
            .test(
              "checkUniqueEquipmentName",
              "This equipmentName is already exists.",
              async (equipmentName) => {
                const isExists = await InventoryApi.existsByEquipmentName(
                  equipmentName
                );
                return !isExists;
              }
            ),
          classify: Yup.string()
            .max(5, "Must be lessthan 5 characters ")
            .required("Required"),
          description: Yup.string()
            .max(100, "Must be lessthan 100 characters ")
            .required("Required"),
          brand: Yup.string()
            .max(50, "Must be lessthan 50 characters ")
            .required("Required"),
          staffName: Yup.string()
            .max(50, "Must be lessthan 50 characters ")
            .required("Required"),
          insurance: Yup.string()
            .max(20, "Must be lessthan 20characters ")
            .required("Required"),
          unitPrice: Yup.string()
            .max(50, "Must be lessthan 50 characters ")
            .required("Required"),
          quantity: Yup.string()
            .max(20, "Must be lessthan 20 characters ")
            .required("Required"),
        })}
        onSubmit={async (values, { setFieldError }) => {
          try {
            /// call api
            const result = await InventoryApi.update(
              values.equipmentId,
              values.equipmentName,
              values.classify,
              values.description,
              values.brand,
              values.staffName,
              values.insurance,
              values.unitPrice,
              values.quantity
            );
            if (result == "success") {
              showSuccessNotification("Cập nhật thiết bị ", ">>> Thành công");
            } else {
              showErrorNotification("Cập nhật thiết bị ", ">>> Thất bại");
            }

            window.location.reload();
          } catch (error) {
            setFieldError("errorForm", "There is an error from the server");
            console.log(error);
          }
        }}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ isSubmitting }) => (
          <Card>
            <CardBody>
              <div className="m-sm-4">
                <div
                  class="text-center"
                  style={{ marginTop: "10px", marginBottom: "50px" }}
                >
                  <Button color="danger" size="lg">
                    Cập nhật thiết bị
                  </Button>
                </div>
                <Form>
                  <FormGroup>
                    <FastField
                      label="Mã thiết bị"
                      bsSize="sm"
                      type="text"
                      name="equipmentId"
                      readonly="readonly"
                      component={ReactstrapInput}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FastField
                      label="Tên thiết bị"
                      bsSize="sm"
                      type="text"
                      name="equipmentName"
                      placeholder="Điền vào tên thiết bị"
                      component={ReactstrapInput}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FastField
                      bsSize="sm"
                      type="text"
                      label="Phân loại thiết bị"
                      name="classify"
                      placeholder="Phân loại thiết bị"
                      component={ReactstrapInput}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FastField
                      bsSize="sm"
                      type="text"
                      label="Mô tả thiết bị"
                      name="description"
                      placeholder="Mô tả thiết bị"
                      component={ReactstrapInput}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FastField
                      bsSize="sm"
                      type="text"
                      label="Thương hiệu"
                      name="brand"
                      placeholder="Thương hiệu"
                      component={ReactstrapInput}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FastField
                      bsSize="sm"
                      type="text"
                      label="Nhân viên quản lý"
                      name="staffName"
                      readonly="readonly"
                      component={ReactstrapInput}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FastField
                      bsSize="sm"
                      type="text"
                      label="Thời hạn bảo hành"
                      name="insurance"
                      placeholder="Thời hạn bảo hành"
                      component={ReactstrapInput}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FastField
                      label="Đơn giá"
                      bsSize="sm"
                      type="text"
                      name="unitPrice"
                      placeholder="Đơn giá thiết bị"
                      component={ReactstrapInput}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FastField
                      label="Số lượng"
                      bsSize="sm"
                      type="text"
                      name="quantity"
                      placeholder="Số lượng thiết bị"
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
                    </Button>{" "}
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

export default UpdateInventoryForm;
