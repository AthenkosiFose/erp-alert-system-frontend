// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all'); // new state for filter

  useEffect(() => {
    axios.get('http://localhost:5000/api/baths') // Adjust port as needed
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching bath data:', error);
      });
  }, []);

  // Filtered data based on filterStatus
  const filteredData = data.filter(record => {
    if (filterStatus === 'all') return true;
    return record.status === filterStatus;
  });

  return (
    <div className="erp-dashboard">
      <header className="dashboard-header">
        <h1>ERP Mining Dashboard</h1>
        <p>Real-time Monitoring: Bath Performance</p>
      </header>

      <section className="dashboard-content">
        {/* Filter Dropdown */}
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="statusFilter" style={{ marginRight: '0.5rem', fontWeight: '600', color: '#ccc' }}>
            Filter by Status:
          </label>
          <select
            id="statusFilter"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              padding: '6px 10px',
              borderRadius: '6px',
              border: '1px solid #444',
              backgroundColor: '#1e2a38',
              color: '#eee',
            }}
          >
            <option value="all">All</option>
            <option value="pass">Pass</option>
            <option value="fail">Fail</option>
          </select>
        </div>

        <div className="dashboard-card">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Bath</th>
                <th>Measure</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="3" style={{ textAlign: 'center', color: '#bbb' }}>
                    No records found.
                  </td>
                </tr>
              ) : (
                filteredData.map((record, index) => (
                  <tr key={index}>
                    <td>{record.bath_name}</td>
                    <td>{record.measure}</td>
                    <td>
                      {record.status === 'pass' ? (
                        <FaCheckCircle className="status-icon pass" />
                      ) : (
                        <FaTimesCircle className="status-icon fail" />
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
