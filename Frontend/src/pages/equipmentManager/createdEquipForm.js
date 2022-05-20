import React from "react";
import { Button, Card, CardBody, FormGroup } from "reactstrap";
import { Formik, FastField, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ReactstrapInput } from "reactstrap-formik";
import Storage from "../../Storage/Storage";
import { toastr } from "react-redux-toastr";
import EquipmentApi from "../../api/EquipmentApi";

const CreateEquipmentForm = (props) => {
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
  return (
    <>
      <Formik
        initialValues={{
          equipmentId: "",
          equipmentName: "",
          classify: "",
          description: "",
          brand: "",
          staffName:
            Storage.getUserInfo().firstName +
            " " +
            Storage.getUserInfo().lastName,

          insurance: "",
          equipmentStatus: "",
        }}
        validationSchema={Yup.object({
          equipmentId: Yup.string()
            .max(20, "Must be less than 20 characters or equal")
            .required("Required")
            .test(
              "checkUniqueEquipmentId",
              "This equipmentId is already exists.",
              async (equipmentId) => {
                const isExists = await EquipmentApi.existsByEquipmentId(
                  equipmentId
                );
                return !isExists;
              }
            ),

          equipmentName: Yup.string()
            .max(50, "Must be less than 100 characters or equal")
            .required("Required")
            .test(
              "checkUniqueEquipmentName",
              "This equipmentName is already exists.",
              async (equipmentName) => {
                const isExists = await EquipmentApi.existsByEquipmentName(
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
          equipmentStatus: Yup.string()
            .required("Required")
            .test(
              "checkformequipmentStatus",
              "Vui lòng nhập vào 'READY' , 'USING' , 'BROKEN' hoặc 'REPAIR'",
              (equipmentStatus) => {
                if (
                  equipmentStatus.match("READY") ||
                  equipmentStatus.match("USING") ||
                  equipmentStatus.match("BROKEN") ||
                  equipmentStatus.match("REPAIR")
                ) {
                  return true;
                }
                return false;
              }
            ),
        })}
        onSubmit={async (values, { setFieldError }) => {
          try {
            // call api
            await EquipmentApi.create(
              values.equipmentId,
              values.equipmentName,
              values.classify,
              values.description,
              values.brand,
              values.staffName,
              values.insurance,
              values.equipmentStatus
            );

            showSuccessNotification(
              "Create Equipment",
              "Create Equipment Successfully!"
            );
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
                <Form>
                  <FormGroup>
                    <FastField
                      label="Mã thiết bị"
                      bsSize="sm"
                      type="text"
                      name="equipmentId"
                      placeholder="Điền vào mã thiết bị"
                      component={ReactstrapInput}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FastField
                      label="Trạng thái"
                      bsSize="sm"
                      type="text"
                      name="equipmentStatus"
                      placeholder="Trạng thái của thiết bị"
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
                      Thêm thiết bị
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

export default CreateEquipmentForm;
