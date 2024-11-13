import { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { updateExperience } from '../services/experienceService';
import { Experience } from '../types/experienceTypes';
import ExperienceForm from '../components/ExperienceForm';
import BackButton from '../components/BackButton';

const EditExperience = () => {
    const { experience_id } = useParams<{ experience_id: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const experience = location.state?.experience as Experience | undefined;
  
    const handleUpdateExperience = async (data: { title: string; rating: number; description: string; imageUrl: string }) => {
        // Compare current form data with the initial `experience` data
        if (
            data.title === experience?.title &&
            data.rating === experience?.rating &&
            data.description === experience?.description &&
            data.imageUrl === experience?.imageUrl
        ) {
            alert('No changes were made.');
            return;
        }
        try {
        await updateExperience(experience_id!, data);
        navigate(`/experiences/${experience_id}`);
        } catch {
        alert('Failed to update experience.');
        }
    };

    useEffect(() => {
    if (!experience) {
      // If no experience data was passed, redirect to experience details page
      navigate(`/experiences/${experience_id}`);
    }
  }, [experience, experience_id, navigate]);

  return (
    <div className="p-4 max-w-lg mx-auto bg-white">
        <BackButton />
        <h1 className="text-2xl font-bold mb-4">Edit Experience</h1>
        <ExperienceForm
        initialData={experience}
        onSubmit={handleUpdateExperience}
        buttonText="Update Experience"
        />
    </div>
  );
};

export default EditExperience;
