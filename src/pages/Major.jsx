import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import * as Yup from "yup";
import Input from "../components/Input";
import majorService from "../services/majorService";

function Major() {
  const [majors, setMajors] = useState([]);
  const [isShowModal, setIsShowModal] = useState(false);
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      id: 0,
      name: "",
    },
    validationSchema: Yup.object({
      id: Yup.number().required(""),
      name: Yup.string()
        .required("Name is required")
        .min(3, "Name must be at least 5 characters"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  const handleCloseModal = () => setIsShowModal(false);
  const handleShowModal = () => setIsShowModal(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    majorService.list().then((res) => {
      setMajors(res.data);
    });
  };

  const handleEdit = (e, id) => {
    if (e) e.preventDefault();
    if (Number(id) === 0) {
      formik.resetForm();
      handleShowModal();
    } else {
      majorService.get(id).then((res) => {
        if (res.errorCode === 0) {
          formik.setValues(res.data);
          handleShowModal();
        } else {
          toast.error("Load major failed!");
        }
      });
    }
  };

  const handleSubmit = (data) => {
    if (data.id !== 0) {
      //update
      majorService.update(data.id, data).then((res) => {
        if (res.errorCode === 0) {
          loadData();
          handleCloseModal();
          toast.success("Update major successfully");
        } else {
          toast.error("Update major failed");
        }
      });
    } else {
      majorService.add(data).then((res) => {
        if (res.errorCode === 0) {
          loadData();
          handleCloseModal();
          toast.success("Add major successfully");
        } else {
          toast.error("Add major failed");
        }
      });
    }
  };

  const handleDeleteMajor = (e, id) => {
    if (e) e.preventDefault();
    // confirm before delete
    majorService.delete(id).then((res) => {
      if (res.errorCode === 0) {
        loadData();
        toast.warn("Delete major successfully");
      } else {
        toast.error("Delete major failed");
      }
    });
  };

  return (
    <>
      <Container className="mt-4">
        <Card className="border-primary bt-5">
          <Card.Header>
            <Row>
              <Col>
                <h3 className="card-title">
                  Major <small className="text-muted">list</small>
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
            <Table
              hover
              stripped="true"
              bordered
              responsive
              className="border-primary"
            >
              <thead>
                <tr className="table-primary border-primary">
                  <th style={{ width: 50 }}>#</th>
                  <th>Major Name</th>
                  <th style={{ width: 80 }}></th>
                </tr>
              </thead>
              <tbody>
                {majors &&
                  majors.length > 0 &&
                  majors.map((row, index) => (
                    <tr key={row.id}>
                      <td>{index + 1}</td>
                      <td>{row.name}</td>
                      <td className="text-center">
                        <a
                          href="/#"
                          className="me-1"
                          onClick={(e) => handleEdit(e, row.id)}
                        >
                          <i className="bi-pencil-square text-primary" />
                        </a>
                        <a
                          href="/#"
                          onClick={(e) => handleDeleteMajor(e, row.id)}
                        >
                          <i className="bi-trash text-danger" />
                        </a>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
      <Modal show={isShowModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {formik.values.id === 0 ? "Add" : "Edit"} Major
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <Input
              required
              lastRow
              type="text"
              label={t("majorName")}
              id="txtMajor"
              {...formik.getFieldProps("name")}
            />
            {formik.errors.name && (
              <div className="invalid-feedback">{formik.errors.name}</div>
            )}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            {t("close")}
          </Button>
          <Button
            variant="primary"
            disabled={!formik.dirty || !formik.isValid}
            onClick={formik.handleSubmit}
          >
            {t("save")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Major;
