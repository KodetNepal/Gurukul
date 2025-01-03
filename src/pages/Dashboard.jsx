import React, { useState, useEffect } from 'react';
import { auth, db } from '../services/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          toast.error('User not logged in!', { position: 'top-center' });
          navigate('/login'); // Redirect to login if not logged in
          return;
        }

        const docRef = doc(db, 'Users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          toast.error('User data not found!', { position: 'top-center' });
        }
      } catch (error) {
        toast.error(`Error fetching data: ${error.message}`, { position: 'bottom-center' });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (!userData) {
    return <div className="text-center mt-5">No user data available</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Welcome, {userData.firstName} {userData.lastName}</h2>
      <h5>Your Dashboard</h5>
      <div className="row">
        {/* Loop through classes and subjects to create cards */}
        {userData.classes.map((cls) =>
          userData.subjects.map((subject, index) => (
            <div className="col-md-4 mb-4" key={`${cls}-${subject}-${index}`}>
              <div className="card shadow">
                <div className="card-body">
                  <h5 className="card-title">{subject}</h5>
                  <p className="card-text">Class {cls}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/plan-content/${cls}/${subject}`)}
                  >
                    Plan Content
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;
