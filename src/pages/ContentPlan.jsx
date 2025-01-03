import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import syllabusData from '../data/syllabus.json';
import { toast } from 'react-toastify';

function PlanContent() {
  const { class: cls, subject } = useParams();
  const [syllabus, setSyllabus] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedSubTopics, setSelectedSubTopics] = useState([]);
  const [schedule, setSchedule] = useState({});
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load syllabus from JSON
    const key = `${cls}_${subject}`;
    const data = syllabusData[key];
    if (data) {
      setSyllabus(data.topics);
    } else {
      toast.error('Syllabus not found!', { position: 'top-center' });
    }
    setLoading(false);
  }, [cls, subject]);

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    setSelectedSubTopics([]);
  };

  const handleSubTopicToggle = (subTopic) => {
    setSelectedSubTopics((prev) =>
      prev.includes(subTopic)
        ? prev.filter((st) => st !== subTopic)
        : [...prev, subTopic]
    );
  };

  const handleSchedule = (subTopic, date) => {
    setSchedule((prev) => ({
      ...prev,
      [subTopic]: date,
    }));
  };

  const toggleProgress = (subTopic) => {
    setProgress((prev) => ({
      ...prev,
      [subTopic]: !prev[subTopic],
    }));
  };

  const saveProgress = () => {
    toast.success('Progress saved temporarily!', { position: 'top-center' });
  };

  if (loading) {
    return <div className="text-center mt-5">Loading syllabus...</div>;
  }

  return (
    <div className="container mt-5">
      <h2>{subject} - Class {cls}</h2>
      <p>Manage your syllabus, schedule topics, and track progress.</p>

      <div className="mb-5">
        <h4>Syllabus</h4>
        <ul className="list-group">
          {syllabus.map((topic, index) => (
            <li
              key={index}
              className={`list-group-item ${selectedTopic === topic ? 'active' : ''}`}
              onClick={() => handleTopicSelect(topic)}
              style={{ cursor: 'pointer' }}
            >
              {topic.name}
            </li>
          ))}
        </ul>
      </div>

      {selectedTopic && (
        <div className="mb-5">
          <h4>{selectedTopic.name} - Subtopics</h4>
          <ul className="list-group">
            {selectedTopic.subTopics.map((subTopic, index) => (
              <li key={index} className="list-group-item">
                <div className="d-flex justify-content-between align-items-center">
                  <span>
                    <input
                      type="checkbox"
                      checked={selectedSubTopics.includes(subTopic)}
                      onChange={() => handleSubTopicToggle(subTopic)}
                    />{' '}
                    {subTopic}
                  </span>
                  <div>
                    <label htmlFor={`date-${subTopic}`} className="me-2">
                      Schedule:
                    </label>
                    <input
                      type="date"
                      id={`date-${subTopic}`}
                      value={schedule[subTopic] || ''}
                      onChange={(e) => handleSchedule(subTopic, e.target.value)}
                    />
                  </div>
                  <button
                    className={`btn btn-sm ${progress[subTopic] ? 'btn-success' : 'btn-outline-success'}`}
                    onClick={() => toggleProgress(subTopic)}
                  >
                    {progress[subTopic] ? 'Completed' : 'Mark Complete'}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="d-grid">
        <button className="btn btn-primary" onClick={saveProgress}>
          Save Progress
        </button>
      </div>
    </div>
  );
}

export default PlanContent;
