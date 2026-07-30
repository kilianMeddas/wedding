const API_URL = process.env.NEXT_PUBLIC_API_URL;
export async function getPhotos() {
  const response = await fetch(`${API_URL}/photos`);

  if (!response.ok) {
    throw new Error("Failed to get photos");
  }

  const photos = await response.json();

  return photos;
}

export async function uploadPhotos(album, files) {
  const formData = new FormData();

  for (const file of files) {
    formData.append("photos", file);
  }

  const url = `${API_URL}/photos/upload/${album}`;

  console.log("UPLOAD URL:", url);
  console.log("FILES:", files);

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  console.log("STATUS:", response.status);

  const responseText = await response.text();

  console.log("BACKEND RESPONSE:", responseText);

  if (!response.ok) {
    throw new Error("Failed to upload photos");
  }

  return JSON.parse(responseText);
}
