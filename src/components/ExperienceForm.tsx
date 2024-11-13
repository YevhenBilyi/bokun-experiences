import React, { useState } from 'react';
import { Experience } from '../types/experienceTypes';

interface ExperienceFormProps {
  initialData?: Partial<Experience>;
  onSubmit: (data: { title: string; rating: number; description: string; imageUrl: string }) => void;
  buttonText: string;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ initialData = {}, onSubmit, buttonText }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [rating, setRating] = useState<number | ''>(initialData.rating || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [imageUrl, setImageUrl] = useState(initialData.imageUrl || '');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title || !rating || !description || !imageUrl) {
      setError('All fields are required.');
      return;
    }

    onSubmit({
      title,
      rating: Number(rating),
      description,
      imageUrl,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      {error && <p className="text-red-500 mb-4">{error}</p>}
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
        {buttonText}
      </button>
    </form>
  );
};

export default ExperienceForm;
