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
              "Vui l??ng nh???p v??o 'S???n s??ng' ho???c 'Ch??a s???n s??ng'.",
              (status) => {
                if (status.match("S???n s??ng") || status.match("Ch??a s???n s??ng")) {
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
                      label="M?? ph??ng ban"
                      bsSize="sm"
                      type="text"
                      name="departmentId"
                      placeholder="??i???n v??o m?? ph??ng ban"
                      component={ReactstrapInput}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FastField
                      label="T??n ph??ng ban"
                      bsSize="sm"
                      type="text"
                      name="departmentName"
                      placeholder="??i???n v??o t??n ph??ng ban"
                      component={ReactstrapInput}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FastField
                      label="M?? t???"
                      bsSize="sm"
                      type="text"
                      name="description"
                      placeholder="M?? t??? ph??ng ban"
                      component={ReactstrapInput}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FastField
                      label="Qu???n l?? ph??ng ban"
                      bsSize="sm"
                      type="text"
                      name="manager"
                      placeholder="Qu???n l?? ph??ng ban"
                      component={ReactstrapInput}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FastField
                      bsSize="sm"
                      type="text"
                      label="Tr???ng th??i ph??ng ban"
                      name="status"
                      placeholder="S???n s??ng/ Ch??a s???n s??ng"
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
                      T???o ph??ng ban
                    </Button>{" "}
                    <Button
                      color="primary"
                      size="sm"
                      onClick={props.closeModal}
                    >
                      ????ng
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
