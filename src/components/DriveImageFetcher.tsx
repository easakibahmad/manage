import React, { useEffect, useState } from "react";

import type { DriveFile, DriveImageFetcherProps } from "../types/drive_image_fetcher";

const DriveImageFetcher: React.FC<DriveImageFetcherProps> = ({ folderId, apiKey }) => {
  const [images, setImages] = useState<DriveFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      setError(null);

      try {
        // Query files that are images in the folder and not trashed
        const query = `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`;
        const url = `${import.meta.env.VITE_GOOGLE_APIS}/drive/v3/files?q=${encodeURIComponent(query)}&key=${apiKey}&fields=files(id,name,mimeType)`;

        const res = await fetch(url);
        if (!res.ok) throw new Error(`Error: ${res.status} ${res.statusText}`);

        const data = await res.json();
        console.log("data", data);
        setImages(data.files || []);

        // Log URLs for each image
        data.files.forEach((file: DriveFile) => {
          const imageUrl = `${import.meta.env.VITE_DRIVE_GOOGLE}/uc?id=${file.id}`;
          console.log(`Image: ${file.name}`, imageUrl);
        });
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    if (folderId && apiKey) {
      fetchImages();
    }
  }, [folderId, apiKey]);

  if (loading) return <p>Loading images...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h3 className="bg-yellow-300 rounded-md pl-2 my-6">Images in folder (iframe preview):</h3>
      {images.length === 0 && <p>No images found.</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 image-grid">
        {images.map((file) => (
          <iframe
            key={file.id}
            src={`${import.meta.env.VITE_DRIVE_GOOGLE}/file/d/${file.id}/preview`}
            width="100%"
            height="300"
            allow="autoplay"
            className="rounded shadow"
          />
        ))}
      </div>
    </div>
  );
};

export default DriveImageFetcher;
