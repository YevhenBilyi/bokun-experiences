import { Experience } from '../types/experienceTypes';

const BASE_URL = 'https://demo.bokun.me/dh11wztfthaipksb8bvcodzn';

// Utility function to fetch data with error handling
async function fetchData<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

export async function getExperiences(): Promise<Experience[]> {
  return fetchData<Experience[]>(`${BASE_URL}/experiences`);
}

export async function getExperienceById(id: string): Promise<Experience> {
  return fetchData<Experience>(`${BASE_URL}/experiences/${id}`);
}

export async function updateExperience(data: Experience): Promise<Experience> {
    return fetchData<Experience>(`${BASE_URL}/experiences/${data.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  }

export async function deleteExperience(id: string): Promise<boolean> {
  try {
    const response = await fetch(`${BASE_URL}/experiences/${id}`, { method: 'DELETE' });
    return response.ok;
  } catch (error) {
    console.error("Delete Error:", error);
    return false;
  }
}

export type ExperienceInput = Omit<Experience, 'id'>;

export async function createExperience(data: ExperienceInput): Promise<Experience> {
  return fetchData<Experience>(`${BASE_URL}/experiences`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

