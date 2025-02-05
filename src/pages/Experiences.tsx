import { useQuery } from '@tanstack/react-query';
import { getExperiences } from '../services/experienceService';
import { Experience } from '../types/experienceTypes';
import { Link } from 'react-router-dom';

const Experiences = () => {
    const { data: experiences, error, isLoading } = useQuery({
        queryKey: ['experiences'], // Unique key for caching
        queryFn: getExperiences,   // Fetch function
        staleTime: 1000 * 60 * 5,  // Cache data for 5 minutes
      });



      if (isLoading) return <p className="text-center text-gray-500">Loading experiences...</p>;
      if (error) return <p className="text-center text-red-500">Failed to load experiences.</p>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">Experiences</h1>
        <Link
          to="/experiences/new"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primaryHover transition-colors"
        >
          + Create New Experience
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {experiences?.map((experience: Experience) => (
          <Link to={`/experiences/${experience.id}`} key={experience.id}>
            <div className="border p-4 rounded shadow-sm hover:shadow-md transition-shadow">
              <img
                src={experience.imageUrl}
                alt={experience.title}
                className="w-full h-48 object-cover mb-2 rounded"
              />
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
