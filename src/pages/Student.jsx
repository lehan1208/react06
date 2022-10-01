import React, { useEffect, useState } from 'react';
import studentService from '../services/studentService';

function Student() {

  const [students, setStudents] = useState([])

  useEffect(() => {
    loadData()
    console.log('Student page loaded');
  }, []);

  const loadData = () => {
    studentService.list().then((res) => {
      setStudents(res.data);
    });
  };


  <div className='container mt-4'>
      <div className='card border-primary bt-5'>
        <div className='card-header'>
          <div className='row'>
            <div className='col'>
              <h3 className='card-title'>
                Students <small className='text-muted'>list</small>
              </h3>
            </div>
            <div className='col-auto'>
              {/* <button type='button' className='btn btn-primary' onClick={(e) => showEditPage(e, 0)}>
                <i className='bi-plus-lg' /> Add
              </button> */}
            </div>
          </div>
        </div>
        <div className='card-body'>
          <div className='table-responsive'>
            <table className='table table-bordered border-primary table-hover table-striped'>
              <thead>
                <tr className='table-primary border-primary'>
                  <th style={{ width: 50 }}>#</th>
                  <th>Student Name</th>
                  <th style={{ width: 80 }} />
                </tr>
              </thead>
              <tbody>
                {students &&
                  students.length > 0 &&
                  students.map((m, i) => (
                    <tr key={m.id}>
                      <td>{i + 1}</td>
                      <td>{m.name}</td>
                      <td>
                        {/* <a href='/#' onClick={(e) => showEditPage(e, m.id)}>
                          <i className='bi-pencil-square text-primary' />
                        </a>
                        <a href='/#' onClick={(e) => handleDeleteMajor(e, m.id)}>
                          <i className='bi-trash text-danger' />
                        </a> */}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
}

export default Student;
