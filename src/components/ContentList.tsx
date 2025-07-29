import React from "react";
import type { ContentItem } from "../types/content";

type Props = {
  items: ContentItem[];
  onEdit: (item: ContentItem) => void;
  onDelete: (id: string) => void;
};

const ContentList: React.FC<Props> = ({ items, onEdit, onDelete }) => {
  return (
    <div>
      {items.length === 0 && <p>No content available.</p>}
      {items.map((item) => (
        <div key={item.id} className="border p-4 my-2 rounded-md bg-white">
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="text-sm text-gray-500">Status: {item.status}</p>
          <div className="mt-2 space-x-2">
            <button className="text-blue-600" onClick={() => onEdit(item)}>
              Edit
            </button>
            <button className="text-red-600" onClick={() => onDelete(item.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContentList;
