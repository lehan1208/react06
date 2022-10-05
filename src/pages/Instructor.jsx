import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import instructorService from "./../services/instructorService";
import { useFormik } from "formik";
import * as Yup from "yup";

function Instructor() {
  const [isShowModal, setIsShowModal] = useState(false);
  const [instructorList, setInstructorList] = useState([]);

  const formik = useFormik({
    initialValues: {
      id: 0,
      code: "",
      firstName: "",
      lastName: "",
      gender: null,
      phone: "",
      email: "",
    },
    validationSchema: Yup.object({
      id: Yup.number().required(""),
      code: Yup.string()
        .required("Code is required")
        .min(5, "Code must be at least 5 characters"),
      firstName: Yup.string()

        .required("First name is required")
        .min(2, "First name must be at least 3 characters"),
      lastName: Yup.string()
        .required("Last name is required")
        .min(2, "Last name must be at least 3 characters"),
      gender: Yup.number().required("Please select gender"),
      phone: Yup.string()

        .matches(/^(\d{10,11})$/, "Phone number is invalid")
        .required("Phone is required"),
      email: Yup.string()
        .required("Email is required")
        .email("Email is invalid"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const loadData = () => {
    instructorService.list().then((res) => setInstructorList(res.data));
  };
  useEffect(() => {
    loadData();
  }, []);

  const handleEdit = (e, id) => {
    if (e) e.preventDefault();
    if (id === 0) {
      formik.resetForm();
      setIsShowModal(true);
    } else {
      instructorService.get(id).then((res) => {
        if (res.errorCode === 0) {
          formik.setValues(res.data);
          setIsShowModal(true);
        } else {
          toast.error("Load instructor failed!");
        }
      });
    }
  };

  const handleDeleteMajor = (e, id) => {
    if (e) e.preventDefault();
    instructorService.delete(id).then((res) => {
      if (res.errorCode === 0) {
        toast.success("Delete instructor successfully!");
        loadData();
      } else {
        toast.warning("Delete instructor failed!");
      }
    });
  };

  const handleSubmit = (data) => {
    if (data.id === 0) {
      instructorService.add(data).then((res) => {
        if (res.errorCode === 0) {
          toast.success("Add instructor successfully!");
          setIsShowModal(false);
          loadData();
        } else {
          toast.warning("Add instructor failed!");
        }
      });
    } else {
      // update
      instructorService.update(data.id, data).then((res) => {
        if (res.errorCode === 0) {
          toast.success("Update instructor successfully!");
          setIsShowModal(false);
          loadData();
        } else {
          toast.warning("Update instructor failed!");
        }
      });
    }
  };

  return (
    <>
      <Container className="mt-4">
        <Card className="border-primary bt-5">
          <Card.Header className="bg-primary text-white">
            <h4 className="text-center">Instructor List</h4>
          </Card.Header>
        </Card>
      </Container>
      <div className="container mt-4">
        <div className="card border-primary bt-5">
          <div className="card-header">
            <div className="row">
              <div className="col">
                <h3 className="card-title">
                  Instructor <small className="text-muted">list</small>
                </h3>
              </div>
              <div className="col-auto">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={(e) => handleEdit(null, 0)}
                >
                  <i className="bi-plus-lg" /> Add
                </button>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered border-primary table-hover table-striped">
                <thead>
                  <tr className="table-primary border-primary">
                    <th style={{ width: 50 }}>#</th>
                    <th>Instructor ID</th>
                    <th>Full name</th>
                    <th>Gender</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th style={{ width: 80 }} />
                  </tr>
                </thead>
                <tbody>
                  {instructorList &&
                    instructorList.length > 0 &&
                    instructorList.map((m, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{m.id}</td>
                        <td>
                          {m.lastName} {m.firstName}
                        </td>
                        <td className="text-center">
                          {m.gender === "male" ? (
                            <i className="bi bi-gender-male text-primary" />
                          ) : (
                            <i className="bi bi-gender-female text-danger"></i>
                          )}
                        </td>
                        <td>{m.phone}</td>
                        <td>{m.email}</td>
                        <td>
                          <a href="/#" onClick={(e) => handleEdit(e, m.id)}>
                            <i className="bi-pencil-square text-primary" />
                          </a>
                          <a
                            href="/#"
                            onClick={(e) => handleDeleteMajor(e, m.id)}
                          >
                            <i className="bi-trash text-danger" />
                          </a>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={isShowModal}
        size="lg"
        centered
        onHide={() => setIsShowModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {formik.values.id === 0 ? "New" : "Edit"} Instructor
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-row row mb-3">
              <label className="col-md-2 required align-items-center required">
                Intructor ID
              </label>
              <div className="col-md-5">
                <input
                  type="text"
                  className={`form-control ${
                    formik.errors.code ? "is-invalid" : ""
                  }`}
                  id="id"
                  name="'code"
                  placeholder="Intructor ID"
                  {...formik.getFieldProps("code")}
                />
                {formik.errors.code ? (
                  <div className="invalid-feedback">{formik.errors.code}</div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="form-group row mb-3">
              <label className="col-md-2 required">Full Name</label>
              <div className="col-md-5 col-12">
                <input
                  type="text"
                  className={`form-control ${
                    formik.errors.lastName ? "is-invalid" : ""
                  }`}
                  name="lastName"
                  placeholder="Last name"
                  {...formik.getFieldProps("lastName")}
                />
                {formik.errors.lastName ? (
                  <div className="invalid-feedback">
                    {formik.errors.lastName}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="col-md-5 col-12">
                <input
                  type="text"
                  name="firstName"
                  className={`form-control ${
                    formik.errors.firstName ? "is-invalid" : ""
                  }`}
                  placeholder="First name"
                  {...formik.getFieldProps("firstName")}
                />
                {formik.errors.firstName ? (
                  <div className="invalid-feedback">
                    {formik.errors.firstName}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="form-group row mb-3">
              <label className="col-form-label col-sm-2 required">Gender</label>
              <div className="col-sm-10 row">
                <div className="form-check col-sm-2">
                  <input
                    className={`form-check-input ${
                      formik.errors.gender ? "is-invalid" : ""
                    }`}
                    type="radio"
                    name="gender"
                    id="male"
                    checked={formik.values.gender === 1}
                    onChange={() => formik.setFieldValue("gender", 1)}
                  />
                  <label className="form-check-label" htmlFor="male">
                    Male
                  </label>
                </div>
                <div className="form-check col-sm-2">
                  <input
                    className={`form-check-input ${
                      formik.errors.gender ? "is-invalid" : ""
                    }`}
                    type="radio"
                    name="gender"
                    id="female"
                    checked={formik.values.gender === 0}
                    onChange={() => formik.setFieldValue("gender", 0)}
                  />
                  <label className="form-check-label" htmlFor="female">
                    Female
                  </label>
                </div>
              </div>
            </div>
            <div className="form-row row mb-3">
              <label className="col-md-2 required align-items-center">
                Phone
              </label>
              <div className="col-md-5 col-12">
                <input
                  type="text"
                  className={`form-control ${
                    formik.errors.phone ? "is-invalid" : ""
                  }`}
                  id="id"
                  name="phone"
                  maxLength={10}
                  placeholder="Enter phone Number"
                  {...formik.getFieldProps("phone")}
                />
                {formik.errors.phone ? (
                  <div className="invalid-feedback">{formik.errors.phone}</div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="form-row row">
              <label className="col-md-2 align-items-center">Email</label>
              <div className="col">
                <input
                  type="email"
                  className={`form-control ${
                    formik.errors.email ? "is-invalid" : ""
                  }`}
                  id="id"
                  name="email"
                  placeholder="Email address"
                  {...formik.getFieldProps("email")}
                />
                {formik.errors.email ? (
                  <div className="invalid-feedback">{formik.errors.email}</div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsShowModal(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => formik.handleSubmit()}
            disabled={!formik.dirty || !formik.isValid}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Instructor;
