import React, { useState, useEffect } from 'react';

function ClubEventsCount() {
  const [clubEventCounts, setClubEventCounts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4400/club_events_count')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setClubEventCounts(data))
      .catch((err) => setError(err));
  }, []);

  if (error) {
    return (
      <div style={styles.errorContainer}>
        <h2 style={styles.errorText}>Error: {error.message}</h2>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Number of Events Hosted by Each Club</h2>
      <table style={styles.table}>
        <thead style={styles.tableHeader}>
          <tr>
            <th style={styles.tableHeaderCell}>Club ID</th>
            <th style={styles.tableHeaderCell}>Club Name</th>
            <th style={styles.tableHeaderCell}>Event Count</th>
          </tr>
        </thead>
        <tbody>
          {clubEventCounts.map((clubEvent) => (
            <tr key={clubEvent.clubid} style={styles.tableRow}>
              <td style={styles.tableCell}>{clubEvent.clubid}</td>
              <td style={styles.tableCell}>{clubEvent.ClubName}</td>
              <td style={styles.tableCell}>{clubEvent.event_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    border: '1px solid #ddd',
    backgroundColor: 'white',
  },
  tableHeader: {
    backgroundColor: '#3498db',
    color: 'white',
  },
  tableHeaderCell: {
    padding: '10px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
    fontWeight: 'bold',
  },
  tableRow: {
    backgroundColor: '#f9f9f9',
  },
  tableCell: {
    padding: '10px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
  },
  errorContainer: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  errorText: {
    fontSize: '24px',
    marginBottom: '20px',
    color: 'red',
  },
};

export default ClubEventsCount;
