interface DriveImageFetcherProps {
  folderId: string;
  apiKey: string;
}

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
}

interface UseDriveImagesResult {
  images: DriveFile[];
  loading: boolean;
  error: string | null;
}

export type { DriveImageFetcherProps, DriveFile, UseDriveImagesResult };