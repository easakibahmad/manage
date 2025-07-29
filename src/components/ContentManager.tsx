import React, { useState } from "react";
import ContentList from "./ContentList";
import ContentEditor from "./ContentEditor";
import { v4 as uuidv4 } from "uuid";
import type { ContentItem } from "../types/content";

const ContentManager: React.FC = () => {
  const [contents, setContents] = useState<ContentItem[]>([
    {
      id: uuidv4(),
      title: "Welcome Post",
      body: "This is the first dummy post.",
      status: "published",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleSave = (item: ContentItem) => {
    setContents((prev) =>
      prev.some((c) => c.id === item.id)
        ? prev.map((c) => (c.id === item.id ? item : c))
        : [...prev, item]
    );
    setEditingItem(null);
    setIsCreating(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this content?")) {
      setContents((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Content Manager</h1>
      {isCreating && (
        <ContentEditor onSave={handleSave} onCancel={() => setIsCreating(false)} />
      )}
      {editingItem && (
        <ContentEditor
          initialData={editingItem}
          onSave={handleSave}
          onCancel={() => setEditingItem(null)}
        />
      )}
      {!isCreating && !editingItem && (
        <div className="mb-4">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={() => setIsCreating(true)}
          >
            + Create New Content
          </button>
        </div>
      )}
      <ContentList items={contents} onEdit={setEditingItem} onDelete={handleDelete} />
    </div>
  );
};

export default ContentManager;
