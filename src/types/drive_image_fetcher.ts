interface DriveImageFetcherProps {
  folderId: string;
  apiKey: string;
}

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
}

export type { DriveImageFetcherProps, DriveFile };