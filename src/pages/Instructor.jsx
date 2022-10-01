import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import Input from "../components/Input";
import majorService from "../services/majorService";

function Instructor() {
  const [isShowModal, setIsShowModal] = useState(false);
  const [instructor, setInstructor] = useState({
    id: "0",
    firstName: "",
    lastName: "",
    gender: "",
    phone: "",
    email: "",
  });

  const initInstructorList = [
    {
      id: "01-03-9384",
      firstName: "Minh Tâm",
      lastName: "Trần ",
      gender: "male",
      phone: "0935875636",
      email: "tamtm@yahoo.com",
    },
    {
      id: "01-03-9344",
      firstName: "Thị Thanh",
      lastName: "Nguyễn ",
      gender: "female",
      phone: "0937938573",
      email: "thanhnt@yahoo.com",
    },
    {
      id: "01-04-9846",
      firstName: "Thanh Tuấn",
      lastName: "Lê ",
      gender: "male",
      phone: "0918373635",
      email: "tuantl@yahoo.com",
    },
    {
      id: "01-04-8363",
      firstName: "La Si",
      lastName: "Đinh ",
      gender: "male",
      phone: "0917628363",
      email: "sidl@yahoo.com",
    },
  ];
  const [instructorList, setInstructorList] = useState(initInstructorList)

  const handleCloseModal = () => setIsShowModal(false);
  const handleShowModal = () => setIsShowModal(true);

  const handleOnChange = (e, key) => {
    const newInstructor = { ...instructor };
    newInstructor[key] = e.target.value;
    setInstructor(newInstructor);
  };
  useEffect(() => {
    console.log("🚀 ~ file: Instructor.jsx ~ line 61 ~ handleOnChange ~ newInstructor",instructor);
  }, [instructor]);

  const handleAddInstructor = (e) => {
    e.preventDefault();
    const newInstructorList = [...instructorList];
    newInstructorList.push(instructor);
    setInstructorList(newInstructorList);
    handleCloseModal();
  }
  
  console.log("🚀 ~ file: Instructor.jsx ~ line 69 ~ handleAddInstructor ~ instructorList", instructorList)


  // const handleEdit = (e, id) => {
  //   if (e) e.preventDefault();
  //   if (Number(id) === 0) {
  //     setMajor({ id: 0, name: "" });
  //     handleShowModal();
  //   } else {
  //     majorService.get(id).then((res) => {
  //       if (res.errorCode === 0) {
  //         setMajor(res.data);
  //         handleShowModal();
  //       } else {
  //         toast.error("Load major failed!");
  //       }
  //     });
  //   }
  // };

  // const handleChangeMajor = (e) => {
  //   const newMajor = { ...major };
  //   newMajor[e.target.name] = e.target.value;
  //   setMajor(newMajor);
  // };

  // useEffect(() => {
  //   loadData();
  // }, []);

  // const loadData = () => {
  //   majorService.list().then((res) => {
  //     setMajors(res.data);
  //   });
  // };

  // const handleDeleteMajor = (e, id) => {
  //   e.preventDefault();
  //   majorService.delete(id).then((res) => {
  //     if (res.errorCode === 0) {
  //       loadData();
  //       toast.warn("Delete major successfully");
  //     } else {
  //       toast.error("Delete major failed");
  //     }
  //   });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault(e);
  //   if (major.id !== 0) {
  //     majorService.update(major.id, major).then((res) => {
  //       if (res.errorCode === 0) {
  //         loadData();
  //         handleCloseModal();
  //         toast.success("Update major successfully");
  //       } else {
  //         toast.error("Update major failed");
  //       }
  //     });
  //   } else {
  //     majorService.add(major).then((res) => {
  //       if (res.errorCode === 0) {
  //         loadData();
  //         handleCloseModal();
  //         toast.success("Add major successfully");
  //       } else {
  //         toast.error("Add major failed");
  //       }
  //     });
  //   }
  // };

  return (
    <>
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
                  onClick={() => setIsShowModal(true)}
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
                        <td>{m.lastName} {m.firstName}</td>
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
                          <a
                            href="/#"
                            // onClick={(e) => handleEdit(e, m.id)}
                          >
                            <i className="bi-pencil-square text-primary" />
                          </a>
                          <a
                            href="/#"
                            // onClick={(e) => handleDeleteMajor(e, m.id)}
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
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {instructor.id > 0 ? "Edit" : "New"} Instructor
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-row row mb-3">
              <label className="col-md-2 required align-items-center">
                Intructor ID
              </label>
              <div className="col-md-5">
                <input
                  type="text"
                  className="form-control"
                  id="id"
                  placeholder="Intructor ID"
                  onChange={(e) => handleOnChange(e, "id")}
                />
              </div>
            </div>
            <div className="form-group row mb-3">
              <label class="col-md-2 required">Full Name</label>
              <div class="col-md-5 col-12">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Last name"
                  onChange={(e) => handleOnChange(e, "lastName")}
                />
              </div>
              <div class="col-md-5 col-12">
                <input
                  type="text"
                  class="form-control"
                  placeholder="First name"
                  onChange={(e) => handleOnChange(e, "firstName")}
                />
              </div>
            </div>
            <div className="form-group row mb-3">
              <label class="col-form-label col-sm-2 required">Gender</label>
              <div class="col-sm-10 row">
                <div class="form-check col-sm-2">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="gridRadios"
                    id="male"
                    value="male"
                    checked={instructor.gender === "male"}
                    onChange={() =>
                      setInstructor({ ...instructor, gender: "male" })
                    }
                    // onClick={() => setInstructor({ ...instructor, gender: 'male' })}
                  />
                  <label class="form-check-label" htmlFor="male">
                    Male
                  </label>
                </div>
                <div class="form-check col-sm-2">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="gridRadios"
                    id="female"
                    value="female"
                    checked={instructor.gender === "female"}
                    onChange={() =>
                      setInstructor({ ...instructor, gender: "female" })
                    }
                  />
                  <label class="form-check-label" htmlFor="female">
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
                  className="form-control"
                  id="id"
                  placeholder="Phone number"
                  onChange={(e) => handleOnChange(e, "phone")}
                />
              </div>
            </div>
            <div className="form-row row">
              <label className="col-md-2 align-items-center">Email</label>
              <div className="col">
                <input
                  type="email"
                  className="form-control"
                  id="id"
                  placeholder="Email address"
                  onChange={(e) => handleOnChange(e, "email")}
                />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleAddInstructor}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Instructor;
