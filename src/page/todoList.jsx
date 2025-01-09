import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

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
                        onKeyPress={handleEnter}
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
        { text: "Task 1", isChecked: false },
        { text: "Task 2", isChecked: false },
        { text: "Task 3", isChecked: false },
        { text: "Task 4", isChecked: false },
        { text: "Task 5", isChecked: false },
        { text: "Task 6", isChecked: false },

    ]);
    const [tasks, setTasks] = useState(allTasks);
    const [newTask, setNewTask] = useState("");
    const [editingTask, setEditingTask] = useState(null);

    const handleInputChange = (event) => {
        setNewTask(event.target.value);
    };

    const handleAddTask = () => {
        if (newTask.trim()) {
            const newTaskObj = { text: newTask, isChecked: false };
            setAllTasks([...allTasks, newTaskObj]);
            setTasks([...allTasks, newTaskObj]);
            setNewTask("");
        }
    };

    const handleDeleteTask = (index) => {
        const confirm = window.confirm("Có xóa không ?");
        if (confirm) {
            const updatedTasks = tasks.filter((_, i) => i !== index);
            setTasks(updatedTasks);
            setAllTasks(updatedTasks);
        }
    };

    const handleEditTask = (index, updatedTask) => {
        const updatedTasks = [...allTasks];
        updatedTasks[index].text = updatedTask;
        setAllTasks(updatedTasks);
        setTasks(updatedTasks);
    };

    const handleToggleComplete = (index) => {
        const updatedTasks = [...allTasks];
        updatedTasks[index].isChecked = !updatedTasks[index].isChecked;
        setAllTasks(updatedTasks);
        setTasks(updatedTasks);
    };

    const handleDeleteCompletedTasks = () => {
        const confirm = window.confirm("Có xóa không ?");
        if (confirm) {
            const updatedTasks = allTasks.filter((task) => !task.isChecked);
            setAllTasks(updatedTasks);
            setTasks(updatedTasks);
        }
    };

    const handleDeleteAllTasks = () => {
        const confirm = window.confirm("Có xóa không ?");
        if (confirm) {

            setAllTasks([]);
            setTasks([]);
        }
    };

    const handleFilterAll = () => {
        setTasks(allTasks);
    };

    const handleFilterDone = () => {
        setTasks(allTasks.filter((task) => task.isChecked));
    };

    const handleFilterTodo = () => {
        setTasks(allTasks.filter((task) => !task.isChecked));
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
                    onClick={handleFilterAll}
                    className="px-4 py-2 w-full bg-teal-500 text-white rounded-lg hover:bg-teal-600"
                >
                    ALL
                </button>
                <button
                    onClick={handleFilterDone}
                    className="px-4 py-2 w-full bg-teal-500 text-white rounded-lg hover:bg-teal-600"
                >
                    DONE
                </button>
                <button
                    onClick={handleFilterTodo}
                    className="px-4 py-2 w-full bg-teal-500 text-white rounded-lg hover:bg-teal-600"
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
                    {tasks.map((task, index) => (
                        <TaskItem
                            key={index}
                            task={task}
                            onDelete={() => handleDeleteTask(index)}
                            onEdit={(updatedTask) => handleEditTask(index, updatedTask)}
                            onToggleComplete={() => handleToggleComplete(index)}
                            isEditing={editingTask === task}
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
