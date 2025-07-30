import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import ContentList from "./ContentList";
import ContentEditor from "./ContentEditor";
import TextButton from "../common/TextButton";

import type { ContentItem } from "@/types/content";

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
    <div className="mx-auto p-4">
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
          <TextButton onClick={() => setIsCreating(true)} label="+ Create New Content" colorClass="bg-black text-md text-yellow-400 py-2 px-4 rounded-xl"/>
        </div>
      )}
      <ContentList items={contents} onEdit={setEditingItem} onDelete={handleDelete} />
    </div>
  );
};

export default ContentManager;
