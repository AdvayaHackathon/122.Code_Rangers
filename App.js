import React, { useState } from 'react';
import './App.css';

const translations = {
  english: {
    title: 'Rural Education App',
    update: 'Update Content',
    library: 'E-Library',
    study: 'Study Mode',
    questionnaire: 'Questionnaire',
    submit: 'Submit',
  },
  hindi: {
    title: 'ग्रामीण शिक्षा ऐप',
    update: 'सामग्री अपडेट करें',
    library: 'ई-लाइब्रेरी',
    study: 'अध्ययन मोड',
    questionnaire: 'प्रश्नावली',
    submit: 'जमा करें',
  },
  kannada: {
    title: 'ಗ್ರಾಮೀಣ ಶಿಕ್ಷಣ ಆಪ್',
    update: 'ವಿಷಯವನ್ನು ನವೀಕರಿಸಿ',
    library: 'ಇ-ಗ್ರಂಥಾಲಯ',
    study: 'ಅಧ್ಯಯನ ಮೋಡ್',
    questionnaire: 'ಪ್ರಶ್ನಾವಳಿ',
    submit: 'ಸಲ್ಲಿಸಿ',
  },
};

function App() {
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [responses, setResponses] = useState({});
  const [language, setLanguage] = useState('english');

  const t = translations[language];
  const questions = [
    { id: 'grade', label: t.grade || 'What is your grade?', type: 'text' },
    { id: 'subject', label: t.subject || 'Favorite subject?', type: 'text' },
    { id: 'language', label: t.language || 'Preferred language?', type: 'text' },
  ];

  const handleSubmit = async () => {
    try {
      const res = await fetch('http://localhost:3000/update-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(responses),
      });
      const data = await res.json();
      localStorage.setItem('content', JSON.stringify(data.package));
      alert('Content updated!');
      setShowQuestionnaire(false);
    } catch (error) {
      localStorage.setItem('pendingResponses', JSON.stringify(responses));
      alert('No internet. Saved for later.');
    }
  };

  return (
    <div>
      <h1>{t.title}</h1>
      <select onChange={(e) => setLanguage(e.target.value)}>
        <option value="english">English</option>
        <option value="hindi">Hindi</option>
        <option value="kannada">Kannada</option>
      </select>
      <br />
      <button onClick={() => setShowQuestionnaire(true)}>{t.update}</button>
      <button>{t.library}</button>
      <button>{t.study}</button>

      {showQuestionnaire && (
        <div>
          <h2>{t.questionnaire}</h2>
          {questions.map((q) => (
            <div key={q.id}>
              <label>{q.label}</label>
              <input
                type={q.type}
                onChange={(e) => setResponses({ ...responses, [q.id]: e.target.value })}
              />
            </div>
          ))}
          <button onClick={handleSubmit}>{t.submit}</button>
        </div>
      )}
    </div>
  );
}

export default App;