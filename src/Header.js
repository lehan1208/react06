import React, { useState } from 'react';

function Header() {
  const [input, setInput] = useState('')
  return (
    <>
    <header className='top'>
      <div className='container mt-30 header'>
        <div className='row'>
          <div className='col-3-4'>
            <h2 className='ml-15'>
              <img src='img/staff-icon.png' style={{ marginBottom: '-8px' }} alt='' />{' '}
              <span>Sale System</span>
            </h2>
          </div>
          <div className='col-1-4 text-right'>
            <a href='/#' className='log-out'>
              Logout
            </a>
          </div>
        </div>
      </div>
    </header>
    <input value ={input}
    onChange={e => setInput(e.target.value.trim())}
    />
    </>
  );
}

export default Header;
