import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../services/firebase';
import { setDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { WithContext as ReactTags } from 'react-tag-input';

function Register() {
  const [step, setStep] = useState(1); // Step tracking
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [selectedClasses, setSelectedClasses] = useState([]); // For multiple class selections
  const [subjects, setSubjects] = useState([]);

  const classOptions = ['8','10'];
  const subjectSuggestions = [
    { id: 'English', text: 'English' },
    { id: 'Maths', text: 'Maths' },
    { id: 'Science', text: 'Science' },
    { id: 'Social Studies', text: 'Social Studies' },
    { id: 'Computer Science', text: 'Computer Science' },
    { id: 'Nepali', text: 'Nepali' },
    { id: 'Optional Maths', text: 'Optional Maths' },
  ];

  // Handle addition/removal of classes
  const handleClassChange = (cls) => {
    setSelectedClasses((prev) =>
      prev.includes(cls) ? prev.filter((item) => item !== cls) : [...prev, cls]
    );
  };

  // Subject handlers for ReactTags
  const handleDelete = (i) => {
    setSubjects(subjects.filter((_, index) => index !== i));
  };
  const handleAddition = (tag) => {
    setSubjects([...subjects, tag]);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user details to Firestore
      await setDoc(doc(db, 'Users', user.uid), {
        email,
        firstName: fname,
        lastName: lname,
        classes: selectedClasses,
        subjects: subjects.map((subject) => subject.text),
        photo: '',
      });

      toast.success('User Registered Successfully!', { position: 'top-center' });
    } catch (error) {
      toast.error(`Registration Failed: ${error.message}`, { position: 'bottom-center' });
    }
  };

  return (
    <div className="container mt-5 w-50">
      <form onSubmit={handleRegister}>
        <h3>Sign Up</h3>

        {/* Step 1: User Credentials */}
        {step === 1 && (
          <>
            <div className="mb-3">
              <label>First Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter first name"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label>Last Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter last name"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label>Email Address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="d-grid">
              <button type="button" className="btn btn-primary" onClick={() => setStep(2)}>
                Next
              </button>
            </div>
          </>
        )}

        {/* Step 2: Class and Subject Selection */}
        {step === 2 && (
          <>
            <div className="mb-3">
              <label>Select Classes</label>
              <div>
                {classOptions.map((cls) => (
                  <div key={cls}>
                    <input
                      type="checkbox"
                      id={`class-${cls}`}
                      value={cls}
                      checked={selectedClasses.includes(cls)}
                      onChange={() => handleClassChange(cls)}
                    />
                    <label htmlFor={`class-${cls}`}> {cls}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-3">
              <label>Subjects</label>
              <div className="form-control">
                <ReactTags
                  tags={subjects}
                  suggestions={subjectSuggestions}
                  handleDelete={handleDelete}
                  handleAddition={handleAddition}
                  inputFieldPosition="inline"
                  autocomplete
                />
              </div>
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </>
        )}

        <p className="forgot-password text-right">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
