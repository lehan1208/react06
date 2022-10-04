import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import React, { useEffect, useState } from "react";
import majorService from "../services/majorService";
import Input from "../components/Input";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

function Major() {
  const [major, setMajor] = useState({ id: 0, name: "" });
  const [majors, setMajors] = useState("");
  const [isShowModal, setIsShowModal] = useState(false);
  const {t} = useTranslation();

  const formik = useFormik({
    initialValues: {
      id: 0,
      name: "",
    },
    validationSchema: Yup.object({
      id: Yup.number().required(""),
      name: Yup.string()
        .required("Name is required")
        .min(5, "Name must be at least 5 characters"),
    }),
    onSubmit: (values) => {
    },
  });

  const handleCloseModal = () => setIsShowModal(false);
  const handleShowModal = () => setIsShowModal(true);

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
  const handleChangeMajor = (e) => {
    const newMajor = { ...major };
    newMajor[e.target.name] = e.target.value;
    setMajor(newMajor);
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    majorService.list().then((res) => {
      setMajors(res.data);
    });
  };

  const handleDeleteMajor = (e, id) => {
    e.preventDefault();
    majorService.delete(id).then((res) => {
      if (res.errorCode === 0) {
        loadData();
        toast.warn("Delete major successfully");
      } else {
        toast.error("Delete major failed");
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(e);
    if (major.id !== 0) {
      majorService.update(major.id, major).then((res) => {
        if (res.errorCode === 0) {
          loadData();
          handleCloseModal();
          toast.success("Update major successfully");
        } else {
          toast.error("Update major failed");
        }
      });
    } else {
      majorService.add(major).then((res) => {
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

  return (
    <>
      <div className="container mt-4">
        <div className="card border-primary bt-5">
          <div className="card-header">
            <div className="row">
              <div className="col">
                <h3 className="card-title">
                  {t('major')} <small className="text-muted">{t('list')}</small>
                </h3>
              </div>
              <div className="col-auto">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleEdit(null, 0)}
                >
                  <i className="bi-plus-lg" />{t('add')}
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
                    <th>{t('majorName')}</th>
                    <th style={{ width: 80 }} />
                  </tr>
                </thead>
                <tbody>
                  {majors &&
                    majors.length > 0 &&
                    majors.map((m, i) => (
                      <tr key={m.id}>
                        <td>{i + 1}</td>
                        <td>{m.name}</td>
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
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Major{" "}
            <small className="text-muted">
              {formik.values.id > 0 ? "Edit" : "New"}
            </small>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input
            lastRow
            type="text"
            label={t('majorName')}
            id="txtMajor"
            formField={formik.getFieldProps("name")}
            errorMsg={formik.touched.name && formik.errors.name}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
          {t('close')}
          </Button>
          <Button
            variant="primary"
            disabled={!formik.dirty || !formik.isValid}
            onClick={formik.handleSubmit}
          >
            {t('save')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Major;
