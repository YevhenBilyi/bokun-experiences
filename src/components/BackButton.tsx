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
      className="my-4 px-6 py-3 rounded-lg text-white text-lg tracking-wide transition-all shadow-md active:scale-95
                 bg-grayBase hover:bg-grayHover"
    >
      ← Back
    </button>
  );
};

export default BackButton;
