import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createExperience } from '../services/experienceService';

const CreateExperience = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState<number | ''>('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title || !rating || !description || !imageUrl) {
      setError('All fields are required.');
      return;
    }

    try {
      await createExperience({ title, rating: Number(rating), description, imageUrl });
      navigate('/experiences');
    } catch (err) {
      setError('Failed to create experience.');
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Create New Experience</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />
        </label>
        <label className="block mb-2">
          Rating:
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value ? Number(e.target.value) : '')}
            className="w-full p-2 border rounded mb-4"
            min="0"
            max="10"
            step="0.1"
          />
        </label>
        <label className="block mb-2">
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            rows={4}
          />
        </label>
        <label className="block mb-2">
          Image URL:
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />
        </label>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Create Experience
        </button>
      </form>
    </div>
  );
};

export default CreateExperience;
