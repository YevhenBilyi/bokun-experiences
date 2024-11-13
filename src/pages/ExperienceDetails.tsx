import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getExperienceById } from '../services/experienceService';
import { Experience } from '../types/experienceTypes';
import { Link } from 'react-router-dom';

const ExperienceDetails = () => {
  const { experience_id } = useParams<{ experience_id: string }>();
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!experience) return <p>No experience found</p>;

  return (
    <div className="p-4 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
        <Link to="/experiences" className="text-blue-500 hover:text-blue-700 underline transition duration-150 mb-4 inline-block">← Back to Experiences</Link>
        <img src={experience.imageUrl} alt={experience.title} className="w-full h-auto max-h-96 mb-4 rounded object-contain" />
        <h1 className="text-3xl font-bold mb-2 text-gray-800">{experience.title}</h1>
        <p className="text-lg font-semibold mb-2 text-gray-600">Rating: {experience.rating}</p>
        <p className="text-base mb-4 text-gray-700">{experience.description}</p>
        <Link to={`/experiences/${experience.id}/edit`} className="text-blue-500 hover:text-blue-700 underline transition duration-150 mt-4 inline-block">Edit Experience</Link>
    </div>

  );
};

export default ExperienceDetails;
