import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="text-blue-500 hover:underline mb-4 inline-block"
    >
      ← Back
    </button>
  );
};

export default BackButton;
