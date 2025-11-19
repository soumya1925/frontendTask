import React, { useState, useEffect } from "react";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: any) => void;
  initialData?: any;
}

const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "pending",
  });

  
  useEffect(() => {
    if (initialData) {
      setTask(initialData);
    } else {
      setTask({
        title: "",
        description: "",
        status: "pending",
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e: any) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

   
    if (!task.title.trim() || !task.description.trim() || !task.status.trim()) {
      alert("All fields are required!");
      return;
    }

    onSubmit(task);

    
    if (!initialData) {
      setTask({
        title: "",
        description: "",
        status: "pending",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-2xl animate-fadeIn">
        <h2 className="text-xl font-bold mb-4 text-center">
          {initialData ? "Edit Task" : "Add Task"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            value={task.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />

          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border p-2 rounded-lg h-24 resize-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <select
            name="status"
            value={task.status}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In-Progress</option>
            <option value="completed">Completed</option>
          </select>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {initialData ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
