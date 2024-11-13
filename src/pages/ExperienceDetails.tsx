import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getExperienceById } from '../services/experienceService';
import { Experience } from '../types/experienceTypes';
import { Link } from 'react-router-dom';
import BackButton from '../components/BackButton';
import { deleteExperience } from '../services/experienceService';

const ExperienceDetails = () => {
  const { experience_id } = useParams<{ experience_id: string }>();
  const navigate = useNavigate();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch experience details from API
    async function fetchExperience() {
      try {
        const data = await getExperienceById(experience_id!);
        setExperience(data);
      } catch (err) {
        setError('Failed to fetch experience details');
      } finally {
        setLoading(false);
      }
    }

    fetchExperience();
  }, [experience_id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this experience?'
    );
    if (!confirmDelete) return;

    try {
      await deleteExperience(experience_id!);
      navigate('/experiences');
    } catch (error) {
      alert('Failed to delete experience');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!experience) return <p>No experience found</p>;

  return (
    <div className="p-4 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      <BackButton goToExperiences={true} />
      <img
        src={experience.imageUrl}
        alt={experience.title}
        className="w-full h-auto max-h-96 mb-4 rounded object-contain"
      />
      <h1 className="text-3xl font-bold mb-2 text-gray-800">
        {experience.title}
      </h1>
      <p className="text-lg font-semibold mb-2 text-gray-600">
        Rating: {experience.rating}
      </p>
      <p className="text-base mb-4 text-gray-700">{experience.description}</p>
      <div className="flex items-center justify-between">
        <Link
          to={`/experiences/${experience.id}/edit`}
          state={{ experience }}
          className="text-blue-500 hover:text-blue-700 underline transition duration-150 mt-4 inline-block"
        >
          Edit Experience
        </Link>
        <button
          onClick={handleDelete}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
        >
          Delete Experience
        </button>
      </div>
    </div>
  );
};

export default ExperienceDetails;
