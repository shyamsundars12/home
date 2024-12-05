import React from 'react';

const YourComponent = () => {
  const bigCardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const cardStyle = {
    flex: 1,
    margin: '10px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    textAlign: 'center',
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#0074d9',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  };

  return (
    <div style={bigCardStyle}>
      <h2>OrderId:</h2>
      <div style={containerStyle}>
        <div style={cardStyle}>
          <h3>Employee Details</h3>
          <p>Column 1 description goes here.</p>
          <button style={buttonStyle}>Button 1</button>
        </div>
        <div style={cardStyle}>
          <h3>Service</h3>
          <p>Column 2 description goes here.</p>
          <button style={buttonStyle}>Button 2</button>
        </div>
        <div style={cardStyle}>
          <h3>customer Details</h3>
          <p>Column 3 description goes here.</p>
          <button style={buttonStyle}>Button 3</button>
        </div>
      </div>
      <button className="btn bg-warning"style={{width:100}}>Order Details</button>
    </div>
  );
};

export default YourComponent;
