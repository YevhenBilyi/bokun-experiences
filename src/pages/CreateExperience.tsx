import { useNavigate } from 'react-router-dom';
import { createExperience } from '../services/experienceService';
import ExperienceForm from '../components/ExperienceForm';
import BackButton from '../components/BackButton';

const CreateExperience = () => {
    const navigate = useNavigate();

    const handleCreateExperience = async (data: { title: string; rating: number; description: string; imageUrl: string }) => {
      try {
        await createExperience(data);
        navigate('/experiences');
      } catch {
        alert('Failed to create experience.');
      }
    };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white">
        <BackButton />
        <h1 className="text-2xl font-bold mb-4">Create New Experience</h1>
        <ExperienceForm
        onSubmit={handleCreateExperience}
        buttonText="Create Experience"
        />
    </div>
  );
};

export default CreateExperience;
