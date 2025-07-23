import { useEffect, useState } from 'react';
import type { DriveFile, UseDriveImagesResult } from '../types/drive_image_fetcher';

export function useDriveImages(folderId: string | null, apiKey: string | null): UseDriveImagesResult {
  const [images, setImages] = useState<DriveFile[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      setError(null);

      try {
        const query = `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`;
        const url = `${import.meta.env.VITE_GOOGLE_APIS}/drive/v3/files?q=${encodeURIComponent(query)}&key=${apiKey}&fields=files(id,name,mimeType)`;

        const res = await fetch(url);
        if (!res.ok) throw new Error(`Error: ${res.status} ${res.statusText}`);

        const data = await res.json();
        setImages(data.files || []);

        // Optional: Log URLs
        data.files.forEach((file: DriveFile) => {
          const imageUrl = `${import.meta.env.VITE_DRIVE_GOOGLE}/uc?id=${file.id}`;
          console.log(`Image: ${file.name}`, imageUrl);
        });
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    if (folderId && apiKey) {
      fetchImages();
    }
  }, [folderId, apiKey]);

  return { images, loading, error };
}
