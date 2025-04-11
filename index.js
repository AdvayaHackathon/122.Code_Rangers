const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Mock content package
const contentPackage = {
  subjects: [
    {
      name: 'Math',
      chapters: [{ name: 'Algebra', pdf: 'algebra.pdf' }],
    },
    {
      name: 'Science',
      chapters: [{ name: 'Physics', pdf: 'physics.pdf' }],
    },
  ],
  quizzes: [
    { question: 'What is 2+2?', options: ['3', '4', '5'], answer: '4' },
  ],
};

app.post('/update-content', (req, res) => {
  const responses = req.body;
  console.log('Received body:', responses);
  if (!responses) {
    return res.status(400).json({ error: 'No data provided' });
  }
  res.json({ package: contentPackage });
});

// Serve static PDFs
app.use('/files', express.static('files'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));