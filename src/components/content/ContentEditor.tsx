import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import type { ContentItem } from "@/types/content";


type Props = {
  initialData?: ContentItem | null;
  onSave: (item: ContentItem) => void;
  onCancel: () => void;
};

const ContentEditor: React.FC<Props> = ({ initialData, onSave, onCancel }) => {
  const isEditing = !!initialData;

  const [title, setTitle] = useState(initialData?.title || "");
  const [body, setBody] = useState(initialData?.body || "");
  const [status, setStatus] = useState<"draft" | "published">(initialData?.status || "draft");

  const handleSubmit = () => {
    const now = new Date().toISOString();
    const item: ContentItem = {
      id: initialData?.id || uuidv4(),
      title,
      body,
      status,
      createdAt: initialData?.createdAt || now,
      updatedAt: now,
    };
    onSave(item);
  };

  return (
    <div className="border p-4 my-4 bg-gray-100 rounded-md">
      <h2 className="text-xl mb-2">{isEditing ? "Edit Content" : "New Content"}</h2>
      <input
        className="block w-full border p-2 mb-2"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="block w-full border p-2 mb-2"
        placeholder="Body"
        rows={6}
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <select
        className="block border p-2 mb-2"
        value={status}
        onChange={(e) => setStatus(e.target.value as "draft" | "published")}
      >
        <option value="draft">Draft</option>
        <option value="published">Published</option>
      </select>
      <div className="space-x-2">
        <button className="bg-blue-600 text-white px-4 py-1 rounded" onClick={handleSubmit}>
          {isEditing ? "Update" : "Create"}
        </button>
        <button className="bg-gray-300 px-4 py-1 rounded" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ContentEditor;
