import React from "react";
import { Button, Card, CardBody, FormGroup } from "reactstrap";
import { Formik, FastField, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ReactstrapInput } from "reactstrap-formik";
import { toastr } from "react-redux-toastr";
import Storage from "../../Storage/Storage";
import EquipmentApi from "../../api/EquipmentApi";

const UpdateEquipmentForm = (props) => {
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
          equipmentId: sessionStorage.getItem("equipmentId"),
          equipmentName: sessionStorage.getItem("equipmentName"),
          classify: sessionStorage.getItem("classify"),
          description: sessionStorage.getItem("description"),
          brand: sessionStorage.getItem("brand"),
          staffName: sessionStorage.getItem("staffName"),
          insurance: sessionStorage.getItem("insurance"),
          equipmentStatus: sessionStorage.getItem("equipmentStatus"),
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
              "Vui l??ng nh???p v??o 'READY' , 'USING' , 'BROKEN' ho???c 'REPAIR'",
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
            await EquipmentApi.update(
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
              "Update Equipment",
              "Update Equipment Successfully!"
            );
            Storage.removeEquipmentInfo();
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
                      label="M?? thi???t b???"
                      bsSize="sm"
                      type="text"
                      readonly="readonly"
                      name="equipmentId"
                      component={ReactstrapInput}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FastField
                      label="Tr???ng th??i"
                      bsSize="sm"
                      type="text"
                      name="equipmentStatus"
                      component={ReactstrapInput}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FastField
                      label="T??n thi???t b???"
                      bsSize="sm"
                      type="text"
                      name="equipmentName"
                      component={ReactstrapInput}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FastField
                      bsSize="sm"
                      type="text"
                      label="Ph??n lo???i thi???t b???"
                      name="classify"
                      component={ReactstrapInput}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FastField
                      bsSize="sm"
                      type="text"
                      label="M?? t??? thi???t b???"
                      name="description"
                      component={ReactstrapInput}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FastField
                      bsSize="sm"
                      type="text"
                      label="Th????ng hi???u"
                      name="brand"
                      component={ReactstrapInput}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FastField
                      bsSize="sm"
                      type="text"
                      label="Nh??n vi??n qu???n l??"
                      name="staffName"
                      component={ReactstrapInput}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FastField
                      bsSize="sm"
                      type="text"
                      label="Th???i h???n b???o h??nh"
                      name="insurance"
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
                      color="warning"
                      size="sm"
                      disabled={isSubmitting}
                    >
                      C???p nh???t
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

export default UpdateEquipmentForm;
