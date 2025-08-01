import React, { useState } from "react";

const Admin = () => {
  const [blocks, setBlocks] = useState([
    { id: "1", color: "bg-green-600" },
    { id: "2", color: "bg-red-600" },
    { id: "3", color: "bg-yellow-600" },
    { id: "4", color: "bg-sky-600" },
    { id: "5", color: "bg-emerald-600" },
    { id: "6", color: "bg-cyan-600" },
    { id: "7", color: "bg-indigo-600" },
    { id: "8", color: "bg-violet-600" },
  ]);

  const [draggingId, setDraggingId] = useState<string | null>(null);

  const handleDragStart = (id: string) => {
    setDraggingId(id);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.preventDefault();
    if (draggingId === null || draggingId === id) return;

    const draggingIndex = blocks.findIndex((b) => b.id === draggingId);
    const overIndex = blocks.findIndex((b) => b.id === id);

    const newBlocks = [...blocks];
    const [draggedItem] = newBlocks.splice(draggingIndex, 1);
    newBlocks.splice(overIndex, 0, draggedItem);

    setBlocks(newBlocks);
  };

  const handleDragEnd = () => {
    setDraggingId(null);
  };

  return (
    <div className="grid grid-cols-4 gap-6 p-6 min-h-screen bg-gray-100">
      {blocks.map((block) => (
        <div
          key={block.id}
          draggable
          onDragStart={() => handleDragStart(block.id)}
          onDragOver={(e) => handleDragOver(e, block.id)}
          onDragEnd={handleDragEnd}
          className={`draggable w-full h-full rounded-lg cursor-move shadow-md transition-all duration-300 ${
            block.color
          } ${draggingId === block.id ? "opacity-40 scale-95 ring-2 ring-gray-400" : ""}`}
        ></div>
      ))}
    </div>
  );
};

export default Admin;
