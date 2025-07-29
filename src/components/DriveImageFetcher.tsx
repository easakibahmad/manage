import React from "react";

import { useDriveImages } from "../custom_hooks/drive_hook";
import type { DriveImageFetcherProps } from "../types/drive";

const DriveImageFetcher: React.FC<DriveImageFetcherProps> = ({ folderId, apiKey }) => {
  const { images, loading, error } = useDriveImages(folderId, apiKey);

  if (loading) return <p>Loading images...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h3 className="bg-yellow-300 rounded-md pl-2 my-6">Images in folder (iframe preview):</h3>
      {images.length === 0 && <p>No images found.</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 image-grid">
        {images.map((file: { id: string }) => (
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
