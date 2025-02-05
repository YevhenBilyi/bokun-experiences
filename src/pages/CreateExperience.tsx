
import { useCreateExperience } from '../services/experienceMutations';
import { useNavigate } from 'react-router-dom';
import ExperienceForm from '../components/ExperienceForm';
import BackButton from '../components/BackButton';


const CreateExperience = () => {
  const navigate = useNavigate();
  const mutation = useCreateExperience();

  const handleCreateExperience = async (data: {
    title: string;
    rating: number;
    description: string;
    imageUrl: string;
  }) => {
    mutation.mutate(data, {
        onSuccess: () => {
            navigate('/experiences');
        },
        onError: (error) => {
            alert('Failed to create experience: ' + error.message);
        }
    });

  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white">
      <BackButton />
      <h1 className="text-2xl font-bold mb-4">Create New Experience</h1>
      <ExperienceForm
        onSubmit={handleCreateExperience}
        buttonText="Create Experience"
        isSubmitting={mutation.isPending}
      />
    </div>
  );
};

export default CreateExperience;
