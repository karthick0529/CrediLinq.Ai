import React, { useEffect, useState } from "react";
import axios from "axios"; // Make sure axios is installed
import "../App.css";

function Submissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/submissions");
        setSubmissions(response.data);
      } catch (error) {
        console.error("Error fetching submissions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <h2 className="submissions-header">Submissions</h2>
      {submissions.length === 0 ? (
        <p className="no-submissions">No submissions yet.</p>
      ) : (
        <table className="submissions-table">
          <thead>
            <tr>
              <th>ID</th> 
              <th>Company UEN</th>
              <th>Company Name</th>
              <th>Full Name</th>
              <th>Position</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission, index) => (
              <tr key={submission._id}> 
              <td>{index + 1}</td> 
                <td>{submission.companyUEN}</td>
                <td>{submission.companyName}</td>
                <td>{submission.fullName}</td>
                <td>{submission.position}</td>
                <td>{submission.email}</td>
                <td>{submission.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Submissions;
