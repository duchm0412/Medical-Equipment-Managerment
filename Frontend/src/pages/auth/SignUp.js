import React from "react";

import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { Formik, FastField, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ReactstrapInput } from "reactstrap-formik";
import UserApi from "../../api/UserApi";
import { useState } from "react";
import { Link, withRouter } from "react-router-dom";

const SignUp = (props) => {
  const [isOpenModal, setOpenModal] = useState(false);

  const [email, setEmail] = useState("");
  const [isDisabledResendEmailButton, setDisabledResendEmailButton] =
    useState(false);

  const handleCloseModel = () => {
    // open model
    setOpenModal(false);
    // redirect login page
    props.history.push("/auth/sign-in");
  };

  const resendEmailToActiveAccount = async () => {
    setDisabledResendEmailButton(true);
    // call api
    await UserApi.resendEmailToActiveAccount(email);
    setDisabledResendEmailButton(false);
  };

  return (
    <>
      <div className="text-center mt-4">
        {/* <img src="https://inhoangkien.vn/wp-content/uploads/2020/04/Logo-B%E1%BB%99-Y-t%E1%BA%BF-01-e1585994422207-300x213.png" alt=""
          width={200} height={130}></img> */}
        <br></br>
        <br></br>
        <p className="lead">
          Create an account to use the system{" "}
          <b> Medical Equipment Management</b>.
        </p>
      </div>

      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          userName: "",
          email: "",
          phone: "",
          address: "",
          password: "",
          confirmpassword: "",
          errorForm: "",
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(50, "Must be less than 50 characters or equal")
            .required("Required"),

          lastName: Yup.string()
            .max(50, "Must be less than 50 characters or equal")
            .required("Required"),
          phone: Yup.string()
            .max(11, "Must be lessthan 11 characters ")
            .min(10, "Must be morethan 10 characters ")
            .required("Required")
            .test(
              "checkUniquephonenumber",
              "This phone is exists.",
              async (phone) => {
                // call api check phone return boolean
                const isExists = await UserApi.existsByPhone(phone);

                return !isExists;
              }
            ),
          address: Yup.string()
            .max(800, "Must be lessthan 800 characters ")
            .required("Required"),

          userName: Yup.string()
            .required("Required")
            .max(50, "Must be between 6 to 50 characters")
            .min(6, "Must be between 6 to 50 characters")
            .test(
              "checkUniqueuserName",
              "This userName is already registered.",
              async (userName) => {
                // call api
                const isExists = await UserApi.existsByUsername(userName);
                return !isExists;
              }
            ),

          email: Yup.string()
            .required("Required")
            .max(50, "Must be between 6 to 50 characters")
            .min(6, "Must be between 6 to 50 characters")
            .email("Invalid email address")
            .test(
              "checkUniqueEmail",
              "This email is already registered.",
              async (email) => {
                // call api
                const isExists = await UserApi.existsByEmail(email);
                return !isExists;
              }
            ),
          phone: Yup.string()
            .required("Required")
            .max(10, "Must be 10 characters")

            .test(
              "checkUniquePhone",
              "This phone is already registered.",
              async (phone) => {
                // call api
                const isExists = await UserApi.existsByPhone(phone);
                return !isExists;
              }
            ),
          password: Yup.string()
            .max(50, "Must be between 6 to 50 characters")
            .min(6, "Must be between 6 to 50 characters")
            .required("Required"),

          confirmpassword: Yup.string()
            .when("password", {
              is: (value) => (value && value.length > 0 ? true : false),
              then: Yup.string().oneOf(
                [Yup.ref("password")],
                "Both password need to be the same"
              ),
            })
            .required("Required"),
        })}
        onSubmit={async (values, { setFieldError }) => {
          try {
            // call api
            await UserApi.create(
              values.userName,
              values.email,
              values.password,
              values.phone,
              values.firstName,
              values.lastName,
              values.address
            );
            // open model
            setOpenModal(true);
            setEmail(values.email);
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
              <div className="text-center">
                <img
                  src="https://inhoangkien.vn/wp-content/uploads/2020/04/Logo-B%E1%BB%99-Y-t%E1%BA%BF-01-e1585994422207-300x213.png"
                  width={250}
                  height={130}
                  alt="Chris Wood"
                  className="img-fluid rounded-circle"
                />
              </div>
              <div className="m-sm-4">
                <Form>
                  {/* Firstname */}
                  <FormGroup>
                    <FastField
                      label="First Name"
                      bsSize="lg"
                      type="text"
                      name="firstName"
                      placeholder="Enter your first name"
                      component={ReactstrapInput}
                    />
                  </FormGroup>

                  {/* lastName */}
                  <FormGroup>
                    <FastField
                      label="Last Name"
                      bsSize="lg"
                      type="text"
                      name="lastName"
                      placeholder="Enter your last name"
                      component={ReactstrapInput}
                    />
                  </FormGroup>

                  {/* userName */}
                  <FormGroup>
                    <FastField
                      label="Username"
                      bsSize="lg"
                      type="text"
                      name="userName"
                      placeholder="Enter your Username"
                      component={ReactstrapInput}
                    />
                  </FormGroup>
                  {/* ///////////////////////////////////////////////////////////////// */}
                  <FormGroup>
                    <FastField
                      bsSize="lg"
                      type="text"
                      label="Phone Number"
                      name="phone"
                      placeholder="Enter your phone number"
                      component={ReactstrapInput}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FastField
                      bsSize="lg"
                      type="text"
                      label="Address"
                      name="address"
                      placeholder="Enter your address"
                      component={ReactstrapInput}
                    />
                  </FormGroup>
                  {/* ///////////////////////////////////////////////////////////////// */}
                  {/* email */}
                  <FormGroup>
                    <FastField
                      label="Email"
                      bsSize="lg"
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      component={ReactstrapInput}
                    />
                  </FormGroup>

                  {/* password */}
                  <FormGroup>
                    <FastField
                      label="Password"
                      bsSize="lg"
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      component={ReactstrapInput}
                    />
                  </FormGroup>

                  {/* confirm password */}
                  <FormGroup>
                    <FastField
                      label="Confirm Password"
                      bsSize="lg"
                      type="password"
                      name="confirmpassword"
                      placeholder="Enter confirm password"
                      component={ReactstrapInput}
                    />
                    <small>
                      <Link to="/auth/sign-in">
                        {" "}
                        Do you have an account? Sign-in
                      </Link>
                    </small>
                  </FormGroup>

                  <ErrorMessage
                    name="errorForm"
                    component={"div"}
                    className="invalid-feedback"
                    style={{ display: "block" }}
                  />

                  {/* submit */}
                  <div className="text-center mt-3">
                    <Button
                      type="submit"
                      color="primary"
                      size="lg"
                      disabled={isSubmitting}
                    >
                      Sign up
                    </Button>
                  </div>
                </Form>
              </div>
            </CardBody>
          </Card>
        )}
      </Formik>

      <Modal isOpen={isOpenModal}>
        {/* header */}
        <ModalHeader>You need to confirm your account</ModalHeader>

        {/* body */}
        <ModalBody className="m-3">
          <p>
            We have sent an email to <b>{email}</b>.
          </p>
          <p>Please check your email to active account.</p>
        </ModalBody>

        {/* footer */}
        <ModalFooter>
          {/* resend */}
          <Button
            color="primary"
            onClick={resendEmailToActiveAccount}
            style={{ marginLeft: 10 }}
            disabled={isDisabledResendEmailButton}
          >
            Resend
          </Button>

          {/* login */}
          <Button color="primary" onClick={handleCloseModel} type="submit">
            Login
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default withRouter(SignUp);
