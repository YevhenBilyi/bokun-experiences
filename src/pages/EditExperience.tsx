import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useUpdateExperience } from '../services/experienceMutations';
import { Experience } from '../types/experienceTypes';
import ExperienceForm from '../components/ExperienceForm';
import BackButton from '../components/BackButton';
import { getExperienceById } from '../services/experienceService';

const EditExperience = () => {
  const { experience_id } = useParams<{ experience_id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [experience, setExperience] = useState<Experience | null>(
    location.state?.experience || null
  );
  const mutation = useUpdateExperience();

  const handleUpdateExperience = async (data: {
    title: string;
    rating: number;
    description: string;
    imageUrl: string;
  }) => {
    if (!experience_id) {
      alert('Invalid experience ID.');
      navigate('/experiences');
      return;
    }
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
    const updatedExperience: Experience = {
      id: experience_id,
      ...data,
    };
    mutation.mutate(updatedExperience, {
      onSuccess: () => {
        navigate(`/experiences/${experience_id}`);
      },
      onError: (error) => {
        alert('Failed to update experience: ' + error.message);
      },
    });
  };

  useEffect(() => {
    async function fetchExperience() {
      if (!experience) {
        try {
          const data = await getExperienceById(experience_id!);
          setExperience(data);
        } catch {
          navigate(`/experiences/${experience_id}`);
        }
      }
    }
    fetchExperience();
  }, [experience, experience_id, navigate]);

  return (
    <div className="p-4 max-w-lg mx-auto bg-white">
      <BackButton />
      <h1 className="text-2xl font-bold mb-4">Edit Experience</h1>
      <ExperienceForm
        initialData={experience || {}}
        onSubmit={handleUpdateExperience}
        buttonText="Update Experience"
        isSubmitting={mutation.isPending}
      />
    </div>
  );
};

export default EditExperience;
