import React from "react";
import { Button, Card, CardBody, FormGroup } from "reactstrap";
import { Formik, FastField, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ReactstrapInput } from "reactstrap-formik";
import api from "../../api/DepartmentApi";
import { toastr } from "react-redux-toastr";

const CreateDepartmentForm = (props) => {
  const showSuccessNotification = (title, message) => {
    const options = {
      timeOut: 2500,
      showCloseButton: false,
      progressBar: false,
      position: "top-right",
    };
    toastr.success(title, message, options);
  };
  return (
    <>
      <Formik
        initialValues={{
          departmentId: "",
          departmentName: "",
          description: "",
          manager: "",
          status: "",
          errorForm: "",
        }}
        validationSchema={Yup.object({
          departmentId: Yup.string()
            .max(50, "Must be less than 50 characters or equal")
            .required("Required")
            .test(
              "checkUniqueDepartmentId",
              "This departmentId is already exists.",
              async (departmentId) => {
                const isExists = await api.existsByDepartmentId(departmentId);
                return !isExists;
              }
            ),

          departmentName: Yup.string()
            .max(50, "Must be less than 50 characters or equal")
            .required("Required")
            .test(
              "checkUniqueDepartmentName",
              "This departmentName is already exists.",
              async (departmentName) => {
                const isExists = await api.existsByDepartmentName(
                  departmentName
                );
                return !isExists;
              }
            ),
          description: Yup.string()
            .max(800, "Must be lessthan 800 characters ")
            .required("Required"),
          manager: Yup.string()
            .max(50, "Must be lessthan 50 characters ")
            .required("Required"),

          status: Yup.string()
            .required("Required")
            .test(
              "checkUniqueDepartmentName",
              "Vui lòng nhập vào 'Sẵn sàng' hoặc 'Chưa sẵn sàng'.",
              (status) => {
                if (status.match("Sẵn sàng") || status.match("Chưa sẵn sàng")) {
                  return true;
                }
                return false;
              }
            ),
        })}
        onSubmit={async (values, { setFieldError }) => {
          try {
            // call api
            await api.create(
              values.departmentId,
              values.departmentName,
              values.description,
              values.manager,
              values.status
            );

            showSuccessNotification(
              "Create Department",
              "Create Department Successfully!"
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
                      label="Mã phòng ban"
                      bsSize="sm"
                      type="text"
                      name="departmentId"
                      placeholder="Điền vào mã phòng ban"
                      component={ReactstrapInput}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FastField
                      label="Tên phòng ban"
                      bsSize="sm"
                      type="text"
                      name="departmentName"
                      placeholder="Điền vào tên phòng ban"
                      component={ReactstrapInput}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FastField
                      label="Mô tả"
                      bsSize="sm"
                      type="text"
                      name="description"
                      placeholder="Mô tả phòng ban"
                      component={ReactstrapInput}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FastField
                      label="Quản lý phòng ban"
                      bsSize="sm"
                      type="text"
                      name="manager"
                      placeholder="Quản lý phòng ban"
                      component={ReactstrapInput}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FastField
                      bsSize="sm"
                      type="text"
                      label="Trạng thái phòng ban"
                      name="status"
                      placeholder="Sẵn sàng/ Chưa sẵn sàng"
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
                      Tạo phòng ban
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

export default CreateDepartmentForm;
