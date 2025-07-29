export type ContentStatus = "draft" | "published";

export interface ContentItem {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  status: ContentStatus;
}
