const BASE_URL = 'https://demo.bokun.me/dh11wztfthaipksb8bvcodzn';

export async function getExperiences() {
  const response = await fetch(`${BASE_URL}/experiences`);
  return response.json();
}

export async function getExperienceById(id: string) {
  const response = await fetch(`${BASE_URL}/experiences/${id}`);
  return response.json();
}

export async function createExperience(data: any) {
  const response = await fetch(`${BASE_URL}/experiences`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function updateExperience(id: string, data: any) {
  const response = await fetch(`${BASE_URL}/experiences/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function deleteExperience(id: string) {
  const response = await fetch(`${BASE_URL}/experiences/${id}`, {
    method: 'DELETE',
  });
  return response.ok;
}
