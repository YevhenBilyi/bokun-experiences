import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  goToExperiences?: boolean;
}

const BackButton: React.FC<BackButtonProps> = ({ goToExperiences = false }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (goToExperiences) {
      navigate('/experiences');
    } else {
      navigate(-1); // Go back to the previous page
    }
  };

  return (
    <button
      onClick={handleClick}
      className="text-blue-500 hover:underline mb-4 inline-block"
    >
      ← Back
    </button>
  );
};

export default BackButton;
