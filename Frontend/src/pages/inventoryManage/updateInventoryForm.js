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
              showSuccessNotification("C???p nh???t thi???t b??? ", ">>> Th??nh c??ng");
            } else {
              showErrorNotification("C???p nh???t thi???t b??? ", ">>> Th???t b???i");
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
                    C???p nh???t thi???t b???
                  </Button>
                </div>
                <Form>
                  <FormGroup>
                    <FastField
                      label="M?? thi???t b???"
                      bsSize="sm"
                      type="text"
                      name="equipmentId"
                      readonly="readonly"
                      component={ReactstrapInput}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FastField
                      label="T??n thi???t b???"
                      bsSize="sm"
                      type="text"
                      name="equipmentName"
                      placeholder="??i???n v??o t??n thi???t b???"
                      component={ReactstrapInput}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FastField
                      bsSize="sm"
                      type="text"
                      label="Ph??n lo???i thi???t b???"
                      name="classify"
                      placeholder="Ph??n lo???i thi???t b???"
                      component={ReactstrapInput}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FastField
                      bsSize="sm"
                      type="text"
                      label="M?? t??? thi???t b???"
                      name="description"
                      placeholder="M?? t??? thi???t b???"
                      component={ReactstrapInput}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FastField
                      bsSize="sm"
                      type="text"
                      label="Th????ng hi???u"
                      name="brand"
                      placeholder="Th????ng hi???u"
                      component={ReactstrapInput}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FastField
                      bsSize="sm"
                      type="text"
                      label="Nh??n vi??n qu???n l??"
                      name="staffName"
                      readonly="readonly"
                      component={ReactstrapInput}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FastField
                      bsSize="sm"
                      type="text"
                      label="Th???i h???n b???o h??nh"
                      name="insurance"
                      placeholder="Th???i h???n b???o h??nh"
                      component={ReactstrapInput}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FastField
                      label="????n gi??"
                      bsSize="sm"
                      type="text"
                      name="unitPrice"
                      placeholder="????n gi?? thi???t b???"
                      component={ReactstrapInput}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FastField
                      label="S??? l?????ng"
                      bsSize="sm"
                      type="text"
                      name="quantity"
                      placeholder="S??? l?????ng thi???t b???"
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

export default UpdateInventoryForm;
