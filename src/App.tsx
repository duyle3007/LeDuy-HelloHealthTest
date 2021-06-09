import './App.scss';
import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Pagination, Spin, notification } from 'antd';
import axios from 'axios';

import nameIcon from './assets/nameIcon.png';
import emailIcon from './assets/emailIcon.png';
import positionIcon from './assets/positionIcon.png';

interface ListData {
  name: string;
  email: string;
  position: string;
}

function App() {
  const [tab, setTab] = useState('counter')
  const [tableData, setTableData] = useState([])
  const [counter, setCounter] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [loadingCreateUser, setLoadingCreateUser] = useState(false)
  const pageSize = 5

  useEffect(() => {
    axios.get('https://609940d499011f00171407d6.mockapi.io/api/tesst/Employess')
      .then(function (response) {
        if (response?.status === 200) {
          setTableData(response?.data)
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }, [])

  const changePage = (page: number) => {
    setCurrentPage(page)
  }

  const onAddNewUser = () => {
    setLoadingCreateUser(true)
    axios.post('https://60bf926697295a0017c433e8.mockapi.io/api/tesst/createEmployeee')
      .then(function (response) {
        console.log(response);

        if (response?.status === 201) {
          notification.success({
            message: 'Success',
            description: 'Add employee success',
            placement: 'bottomRight'
          });
        }
        setLoadingCreateUser(false)
      })
      .catch(err => {
        console.log('Add fail', err)
        setLoadingCreateUser(false)
      })
  }
  const renderCounter = () => {
    return (
      <div className="counterDiv">
        <div className="counterNumber">
          {counter}
        </div>

        <div className="buttonRow">
          <button className="resetBtn" onClick={() => setCounter(0)}>Reset</button>
          <button className="increaseBtn" onClick={() => setCounter(counter + 1)}>Increase</button>
        </div>
      </div>
    )
  }

  const renderTable = () => {
    return (
      <div className="tableDiv">
        <h2>Employees</h2>
        <table>
          <thead>
            <tr>
              <th><img src={nameIcon} className="icon" alt="" />Name</th>
              <th><img src={emailIcon} className="emailicon" alt="" />Email</th>
              <th><img src={positionIcon} className="positionicon" alt="" />Position</th>
            </tr>
          </thead>

          <tbody>
            {tableData?.length > 0 && tableData.slice((currentPage - 1) * pageSize, pageSize * currentPage).map((data: ListData, index) =>
              <tr>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.position}</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="new" onClick={() => onAddNewUser()}>
          {loadingCreateUser ? <Spin /> : '➕'}  <div className="newWord">New</div>
        </div>
        <Pagination pageSize={pageSize} onChange={changePage} total={tableData?.length} />
      </div>
    )
  }

  return (
    <div className="App">
      <div className="tabSwitch">
        <div className={tab === 'counter' ? "counter active" : "counter"} onClick={() => setTab('counter')}>Counter</div>
        <div className={tab === 'table' ? "Table active" : "Table"} onClick={() => setTab('table')}>Table</div>
      </div>

      {tab === 'counter'
        ? renderCounter()
        : renderTable()
      }
    </div>
  );
}

export default App;
