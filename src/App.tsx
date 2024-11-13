import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Experiences from './pages/Experiences';
import ExperienceDetails from './pages/ExperienceDetails';
import CreateExperience from './pages/CreateExperience';
import EditExperience from './pages/EditExperience';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Experiences />} />
        <Route path="/experiences" element={<Experiences />} />
        <Route path="/experiences/:experience_id" element={<ExperienceDetails />} />
        <Route path="/experiences/new" element={<CreateExperience />} />
        <Route path="/experiences/:experience_id/edit" element={<EditExperience />} />
      </Routes>
    </Router>
  );
}

export default App;
