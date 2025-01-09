import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

/* eslint-disable react/prop-types */
const TaskItem = ({ task, onDelete, onEdit, onToggleComplete, isEditing, setEditingTask }) => {
    const [editedTask, setEditedTask] = useState(task.text);

    const handleEdit = () => {
        setEditingTask(task);
    };

    const handleCancelEdit = () => {
        setEditingTask(null);
        setEditedTask(task.text);
    };

    const handleEnter = (e) => {
        if (e.key === "Enter" && editedTask.trim() !== "") {
            e.preventDefault();
            onEdit(editedTask);
            setEditingTask(null);
        }
    };

    return (
        <tr className={`${task.isChecked ? "bg-gray-200" : "bg-white"} border-b`}>
            <td className={`p-2 ${task.isChecked ? "line-through text-red-500" : "text-black"}`}>
                {isEditing ? (
                    <input
                        type="text"
                        value={editedTask}
                        onChange={(e) => setEditedTask(e.target.value)}
                        onKeyDown={handleEnter}
                        className="border rounded px-2 py-1"
                    />
                ) : (
                    <span>{task.text}</span>
                )}
            </td>
            <td className="p-2 text-center">
                <input
                    type="checkbox"
                    checked={task.isChecked}
                    onChange={onToggleComplete}
                    className="w-4 h-4"
                />
            </td>
            <td className="p-2 text-center">
                {isEditing ? (
                    <button
                        onClick={handleCancelEdit}
                        className="px-3 py-1 bg-gray-500 text-white rounded"
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                ) : (
                    <button
                        onClick={handleEdit}
                        className="w-8 h-8 flex items-center justify-center bg-yellow-400 text-white rounded-lg"
                    >
                        <FontAwesomeIcon icon={faEdit} />
                    </button>
                )}
            </td>
            <td className="p-2 text-center">
                <button
                    onClick={onDelete}
                    className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-lg"
                >
                    <FontAwesomeIcon icon={faTrashAlt} />
                </button>
            </td>
        </tr>
    );
};

const ToDoList = () => {
    const [allTasks, setAllTasks] = useState([
        { id: "e166ea51-8620-47b0-8134-fb02cdcc4fb1", text: "Task 1", isChecked: false },
        { id: "1aa3e3a6-878c-4c94-a8e7-13921e2487e8", text: "Task 2", isChecked: false },
        { id: "6bb6fd58-5489-4df1-b6b8-493f31d75083", text: "Task 3", isChecked: false },
        { id: "eb817ce4-65aa-4f8b-9fec-9242b0497421", text: "Task 4", isChecked: false },
        { id: "c0062684-1707-4270-91ce-639e19a73d72", text: "Task 5", isChecked: false },
        { id: "b320dac3-e9cf-45fc-8120-557774eaf824", text: "Task 6", isChecked: false },

    ]);
    const [newTask, setNewTask] = useState("");
    const [editingTask, setEditingTask] = useState(null);
    const [filter, setFilter] = useState("all");

    const handleInputChange = (event) => {
        setNewTask(event.target.value);
    };

    const handleAddTask = () => {
        if (newTask.trim()) {
            const newTaskObj = { id: uuidv4(), text: newTask, isChecked: false };
            setAllTasks([...allTasks, newTaskObj]);
            setNewTask("");
        }
    };

    const handleDeleteTask = (id) => {
        if (window.confirm("Có xóa không?")) {
            setAllTasks(allTasks.filter((task) => task.id !== id));
        }
    };

    const handleEditTask = (id, updatedTask) => {
        setAllTasks(
            allTasks.map((task) =>
                task.id === id ? { ...task, text: updatedTask } : task
            )
        );
    };

    const handleToggleComplete = (id) => {
        setAllTasks(
            allTasks.map((task) =>
                task.id === id ? { ...task, isChecked: !task.isChecked } : task
            )
        );
    };

    const handleDeleteCompletedTasks = () => {
        const confirm = window.confirm("Có xóa không ?");
        if (confirm) {
            setAllTasks(allTasks.filter((task) => !task.isChecked));
        }
    };

    const handleDeleteAllTasks = () => {
        const confirm = window.confirm("Có xóa không ?");
        if (confirm) {
            setAllTasks([]);
        }
    };

    const getFilter = () => {
        if (filter === "done") {
            return allTasks.filter((task) => task.isChecked);
        } else if (filter === "todo") {
            return allTasks.filter((task) => !task.isChecked);
        } else {
            return allTasks;
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-5 bg-white rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-5">TODO INPUT</h1>
            <div className="flex gap-2 mb-4 flex-col border border-gray-400 p-4 rounded-sm">
                <input
                    type="text"
                    value={newTask}
                    placeholder="New Todo"
                    onChange={handleInputChange}
                    className="flex-1 px-3 py-2 border rounded-lg outline-none shadow-sm"
                />
                <button
                    onClick={handleAddTask}
                    className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
                >
                    Add new task
                </button>
            </div>

            <h1 className="text-2xl font-bold text-center mb-5">TODO LIST</h1>
            <div className="flex flex-row gap-3 justify-center mb-10">
                <button
                    onClick={() => setFilter("all")}
                    className={`px-4 py-2 w-full rounded-lg ${filter === "all" ? "bg-teal-500" : "bg-teal-700"} text-white hover:bg-teal-600`}
                >
                    ALL
                </button>
                <button
                    onClick={() => setFilter("done")}
                    className={`px-4 py-2 w-full rounded-lg ${filter === "done" ? "bg-teal-500" : "bg-teal-700"} text-white hover:bg-teal-600`}
                >
                    DONE
                </button>
                <button
                    onClick={() => setFilter("todo")}
                    className={`px-4 py-2 w-full rounded-lg ${filter === "todo" ? "bg-teal-500" : "bg-teal-700"} text-white hover:bg-teal-600`}
                >
                    TODO
                </button>
            </div>

            <table className="min-w-full border">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2 text-left">Task</th>
                        <th className="border p-2 text-center">Complete</th>
                        <th className="border p-2 text-center">Edit</th>
                        <th className="border p-2 text-center">Delete</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y">
                    {getFilter().map((task) => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onDelete={() => handleDeleteTask(task.id)}
                            onEdit={(updatedTask) => handleEditTask(task.id, updatedTask)}
                            onToggleComplete={() => handleToggleComplete(task.id)}
                            isEditing={editingTask?.id === task.id}
                            setEditingTask={setEditingTask}
                        />
                    ))}
                </tbody>
            </table>

            <div className="mt-5 flex gap-2">
                <button
                    onClick={handleDeleteCompletedTasks}
                    className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                    Delete done tasks
                </button>
                <button
                    onClick={handleDeleteAllTasks}
                    className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                    Delete all tasks
                </button>
            </div>
        </div>
    );
};

export default ToDoList;
