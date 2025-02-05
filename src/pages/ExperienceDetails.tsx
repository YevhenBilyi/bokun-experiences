import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getExperienceById } from '../services/experienceService';
import { Experience } from '../types/experienceTypes';
import { Link } from 'react-router-dom';
import BackButton from '../components/BackButton';
import { useDeleteExperience } from '../services/experienceMutations';

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

  const deleteMutation = useDeleteExperience();

  const handleDelete = async () => {
    if (!experience_id) return;
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this experience?'
    );
    if (!confirmDelete) return;

    deleteMutation.mutate(experience_id, {
        onSuccess: () => {
            navigate('/experiences');
        },
        onError: (error) => {
            alert('Failed to delete experience: ' + error.message);
        }
    });
  };

  if (loading) return <div className="text-center text-gray-500 text-lg">Loading experience details...</div>;
  if (error) return <p>{error}</p>;
  if (!experience) return <p>No experience found</p>;

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
      <BackButton goToExperiences={true} />
      <img
        src={experience.imageUrl}
        alt={experience.title}
        className="w-full h-56 md:h-72 lg:h-96 object-cover rounded shadow-md"
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
          className="mt-4 px-6 py-3 rounded-lg text-white text-lg tracking-wide transition-all shadow-md active:scale-95 
             bg-primary hover:bg-primaryHover"
        >
          Edit Experience
        </Link>
        <button 
            onClick={handleDelete}
            disabled={deleteMutation.isPending} 
            className={`mt-4 px-6 py-3 rounded-lg text-white text-lg tracking-wide transition-all shadow-md active:scale-95 ${deleteMutation.isPending ? "bg-disabled" : "bg-danger hover:bg-dangerHover"}`}
            >
            {deleteMutation.isPending ? "Deleting..." : "Delete Experience"}
        </button>
      </div>
    </div>
  );
};

export default ExperienceDetails;
