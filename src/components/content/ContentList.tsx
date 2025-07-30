import React from "react";
import TextButton from "../common/TextButton";
import type { ContentListProps } from "@/types/content";

const ContentList: React.FC<ContentListProps> = ({ items, onEdit, onDelete }) => {
  return (
    <div>
      {items.length === 0 && <p>No content available.</p>}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.id} className="border p-4 my-2 rounded-xl bg-black text-white">
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-300">Status: <span className="text-green-400 font-bold uppercase">{item.status}</span></p>
            <div className="mt-2 space-x-2">
              <TextButton label="Edit" onClick={()=> onEdit(item)}/>
              <TextButton label="Delete" colorClass="text-red-600" onClick={() => onDelete(item.id)}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentList;
