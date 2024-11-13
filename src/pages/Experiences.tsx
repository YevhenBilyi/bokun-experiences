import { useEffect, useState } from 'react';
import { getExperiences } from '../services/experienceService';
import { Experience } from '../types/experienceTypes';
import { Link } from 'react-router-dom';

const Experiences = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch experiences from API
    async function fetchExperiences() {
      try {
        const data = await getExperiences();
        setExperiences(data);
      } catch (err) {
        setError('Failed to fetch experiences');
      } finally {
        setLoading(false);
      }
    }

    fetchExperiences();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Experiences</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {experiences.map((experience) => (
            <Link to={`/experiences/${experience.id}`} key={experience.id}>
                <div className="border p-4 rounded shadow-sm hover:shadow-md transition-shadow">
                    <img src={experience.imageUrl} alt={experience.title} className="w-full h-48 object-cover mb-2 rounded" />
                    <h2 className="text-xl font-semibold">{experience.title}</h2>
                    <p>Rating: {experience.rating}</p>
                </div>
            </Link>
        ))}
      </div>
    </div>
  );
};

export default Experiences;
