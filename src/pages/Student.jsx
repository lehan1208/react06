import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import studentService from "../services/studentService";
import * as Yup from "yup";
import {
  Button,
  Card,
  Col,
  Container,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import { toast } from "react-toastify";
import Input from "../components/Input";
import Select from "../components/Select";
import majorService from "../services/majorService";

function Student() {
  const [studentList, setStudentList] = useState([]);
  const [isShowModal, setIsShowModal] = useState(false);
  const [majorList, setMajorList] = useState([]);
  const formik = useFormik({
    initialValues: {
      id: 0,
      stuId: "",
      firstName: "",
      lastName: "",
      gender: null,
      phone: "",
      email: "",
      majorId: 0,
    },
    validationSchema: Yup.object({
      id: Yup.number().required(""),
      stuId: Yup.string()
        .required("Required")
        .min(5, "Must be 5 characters or more"),
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      gender: Yup.number().required("Please select gender"),
      phone: Yup.string()
        .required("Required")
        .matches(/^(\d{10,11})$/, "Phone number is not valid"),
      email: Yup.string().email("Email is invalid"),
      majorId: Yup.number().required(1, "Please select major"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
      console.log("🚀 ~ file: Student.jsx ~ line 50 ~ Student ~ values", values)
    },
  });

  useEffect(() => {
    loadData();
    majorService.list().then((res) => {
      setMajorList(res.data);
    });
  }, []);

  const loadData = () => {
    studentService.list().then((res) => {
      setStudentList(res.data);
    });
  };

  const handleDeleteStudent = (e, id) => {
    if (e) e.preventDefault();
    studentService.delete(id).then((res) => {
      if (res.errorCode === 0) {
        toast.success("Delete student successfully!");
        loadData();
      } else {
        toast.error("Delete student failed!");
      }
    });
  };

  const handleEdit = (e, id) => {
    if (e) e.preventDefault();
    if (id === 0) {
      // add
      formik.resetForm();
      setIsShowModal(true);
    } else {
      // update
      studentService.get(id).then((res) => {
        if (res.errorCode === 0) {
          formik.setValues(res.data);
          setIsShowModal(true);
        } else {
          toast.error("Load student failed!");
        }
      });
    }
  };

  const handleSubmit = (data) => {
    if (data.id === 0) {
      // add
      studentService.add(data).then((res) => {
        if (res.errorCode === 0) {
          toast.success("Add student successfully!");
          setIsShowModal(false);
          loadData();
        } else {
          toast.error("Add student failed!");
        }
      });
    } else {
      // update
      studentService.update(data.id, data).then((res) => {
        if (res.errorCode === 0) {
          toast.success("Update student successfully!");
          setIsShowModal(false);
          loadData();
        } else {
          toast.error("Update student failed!");
        }
      });
    }
  };
  return (
    <>
      <Container className="mt-4">
        <Card className="border-primary bt-5">
          <Card.Header>
            <Row>
              <Col>
                <h3 className="card-title">
                  Student <small className="text-muted">list</small>
                </h3>
              </Col>
              <Col sm="auto">
                <Button color="primary" onClick={() => handleEdit(null, 0)}>
                  <i className="bi-plus-lg me-1"> Add</i>
                </Button>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <Table striped bordered hover responsive className="border-primary">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Student ID</th>
                  <th>First Name</th>
                  <th>Gender</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th style={{ width: "80px" }}></th>
                </tr>
              </thead>
              <tbody>
                {studentList &&
                  studentList.length > 0 &&
                  studentList.map((stu, index) => (
                    <tr key={stu.id}>
                      <td>{index + 1}</td>
                      <td>{stu.stuId}</td>
                      <td>
                        {stu.lastName} {stu.firstName}
                      </td>
                      <td className="text-center">
                        <i
                          className={`${
                            stu.gender
                              ? "bi-gender-male text-success"
                              : "bi-gender-female text-warning"
                          }`}
                        ></i>
                      </td>
                      <td>{stu.phone}</td>
                      <td>{stu.email}</td>
                      <td className="text-center">
                        <a
                          href="/#"
                          className="me-1"
                          onClick={(e) => handleEdit(e, stu.id)}
                        >
                          <i className="bi-pencil-square text-primary"></i>
                        </a>
                        <a
                          href="/#"
                          onClick={(e) => handleDeleteStudent(e, stu.id)}
                        >
                          <i className="bi-trash text-danger"></i>
                        </a>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
      <Modal
        show={isShowModal}
        onHide={() => setIsShowModal(false)}
        size="lg"
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {formik.values.id === 0 ? "Add " : "Update"} Student
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm="4">{/*  */}</Col>
            <Col sm>
              <Input
                type="text"
                id="stuId"
                label="Student ID"
                maxLength="30"
                inputSize={10}
                required
                formField={formik.getFieldProps("stuId")}
                err={formik.touched.stuId && formik.errors.stuId}
                errMessage={formik.errors.stuId}
              />
            </Col>
            <div className="col-sm mb-3">
              <label
                htmlFor="txtLastName"
                className="col-sm-3 col-form-label required"
              >
                Full name
              </label>
              <div className="col-sm col-lg-6">
                <input
                  type="text"
                  className={`form-control ${
                    formik.touched.lastName && formik.errors.lastName
                      ? "is-invalid"
                      : ""
                  }`}
                  id="txtLastName"
                  placeholder="Last name"
                  {...formik.getFieldProps("lastName")}
                />
                <div className="invalid-feedback">{formik.errors.lastName}</div>
              </div>
              <div className="col-sm col-lg-6">
                <input
                  type="text"
                  className={`form-control ${
                    formik.touched.firstName && formik.errors.firstName
                      ? "is-invalid"
                      : ""
                  }`}
                  id="txtFirstName"
                  placeholder="First name"
                  {...formik.getFieldProps("firstName")}
                />
                <div className="invalid-feedback">
                  {formik.errors.firstName}
                </div>
              </div>
              <div className="row mb-3">
                <label
                  className="col-sm-3 col-form-label required"
                  htmlFor="radioMale"
                >
                  Gender
                </label>
                <div className="col-sm">
                  <div className="col-form-label">
                    <div className="form-check form-check-inline">
                      <input
                        type="radio"
                        name="gender"
                        id="radioMale"
                        className={`form-check-input ${
                          formik.errors.gender ? "is-invalid" : ""
                        }`}
                        onChange={() => formik.setFieldValue("gender", 1)}
                        checked={formik.values.gender === 1}
                      />
                      <label htmlFor="radioMale" className="form-check-label">
                        Male
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        type="radio"
                        name="gender"
                        id="radioFemale"
                        className={`form-check-input ${
                          formik.errors.gender ? "is-invalid" : ""
                        }`}
                        onChange={() => formik.setFieldValue("gender", 0)}
                        checked={formik.values.gender === 0}
                      />
                      <label htmlFor="radioFemale" className="form-check-label">
                        Female
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <Input
                type="text"
                id="phone"
                label="Phone number"
                maxLength="10"
                inputSize={6}
                required
                autoComplete="off"
                formField={formik.getFieldProps("phone")}
                err={formik.touched.phone && formik.errors.phone}
                errMessage={formik.errors.phone}
              />
              <Input
                type="emial"
                id="email"
                label="Email"
                required
                autoComplete="off"
                formField={formik.getFieldProps("email")}
                err={formik.touched.email && formik.errors.email}
                errMessage={formik.errors.email}
              />
              <Select
                id="drpMajor"
                label="Major"
                values={majorList}
                inputSize={6}
                required
                lastRow
                formField={formik.getFieldProps("majorId")}
                err={formik.touched.majorId && formik.errors.majorId}
                errMessage={formik.errors.majorId}
              />
            </div>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setIsShowModal(false);
            }}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={formik.handleSubmit}
            disabled={!formik.dirty || !formik.isValid}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Student;
