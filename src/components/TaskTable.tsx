import React, { useState, useEffect } from "react";
import TaskModal from "./TaskModal";

interface TaskTableProps {
  token: string;
}

const TaskTable: React.FC<TaskTableProps> = ({ token }) => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [editTask, setEditTask] = useState<any | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const TASKS_PER_PAGE = 5;

  const fetchTasks = async () => {
    const res = await fetch("https://fullstacktask-974k.onrender.com/api/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const openAddModal = () => {
    setEditTask(null);
    setModalOpen(true);
  };

  const openEditModal = (task: any) => {
    setEditTask(task);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    await fetch(`https://fullstacktask-974k.onrender.com/api/tasks/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchTasks();
  };

  const handleSubmit = async (taskData: any) => {
    if (editTask) {
      await fetch(
        `https://fullstacktask-974k.onrender.com/api/tasks/${editTask._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(taskData),
        }
      );
    } else {
      await fetch("https://fullstacktask-974k.onrender.com/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(taskData),
      });
    }

    setModalOpen(false);
    fetchTasks();
  };

  const filteredTasks =
    filter === "all" ? tasks : tasks.filter((t) => t.status === filter);

  const start = (currentPage - 1) * TASKS_PER_PAGE;
  const paginatedTasks = filteredTasks.slice(start, start + TASKS_PER_PAGE);

  return (
    <div className="mt-6 px-2">
      
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-center mb-4">
        <button
          onClick={openAddModal}
          className="px-5 py-2 bg-green-500 text-white rounded-lg transition-all cursor-pointer
                     hover:bg-green-600"
        >
          Add Task
        </button>

        <select
          className="border p-2 rounded-lg cursor-pointer transition-all
                     focus:ring-2 focus:ring-blue-300 w-full sm:w-auto"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In-Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

    
      <div className="hidden sm:block">
        <table className="w-full border text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedTasks.map((task) => (
              <tr key={task._id} className="border">
                <td className="p-2 border">{task.title}</td>
                <td className="p-2 border">{task.description}</td>
                <td className="p-2 border capitalize">{task.status}</td>
                <td className="p-2 flex gap-2">
                  <button
                    onClick={() => openEditModal(task)}
                    className="px-3 py-1 bg-blue-500 text-white rounded-lg cursor-pointer
                               hover:bg-blue-600 transition-all"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(task._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg cursor-pointer
                               hover:bg-red-600 transition-all"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     
      <div className="sm:hidden space-y-4">
        {paginatedTasks.map((task) => (
          <div
            key={task._id}
            className="border rounded-lg p-3 shadow-sm bg-white"
          >
            <h3 className="font-semibold text-lg">{task.title}</h3>
            <p className="text-gray-600 text-sm">{task.description}</p>

            <span className="inline-block mt-2 px-3 py-1 text-sm rounded-full bg-gray-200">
              {task.status}
            </span>

            <div className="flex gap-3 mt-3">
              <button
                onClick={() => openEditModal(task)}
                className="flex-1 px-3 py-2 bg-blue-500 text-white rounded-lg cursor-pointer
                           hover:bg-blue-600 transition-all"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(task._id)}
                className="flex-1 px-3 py-2 bg-red-500 text-white rounded-lg cursor-pointer
                           hover:bg-red-600 transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

     
      <div className="flex justify-center gap-2 mt-5">
        {Array.from({
          length: Math.ceil(filteredTasks.length / TASKS_PER_PAGE),
        }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded cursor-pointer transition-all
              ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

    
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editTask || undefined}
      />
    </div>
  );
};

export default TaskTable;
