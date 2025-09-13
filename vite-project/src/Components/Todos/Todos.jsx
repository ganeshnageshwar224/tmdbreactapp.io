import { useState, useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css'

const Todos = () => {
    const [addItem, setItems] = useState([]);
    const [name, setName] = useState("");
    const [editId, setEditId] = useState(null);

    const handleAddItems = () => {
        if (!name.trim()) return;

        if (editId) {
            // Update existing item
            const updatedItems = addItem.map((user) =>
                user.id === editId ? { ...user, name: name } : user
            );
            setItems(updatedItems);
            setEditId(null);
        } else {
            // Add new item
            const newItem = { id: Date.now(), name: name };
            setItems([...addItem, newItem]);
        }

        setName("");
    };

    const handleDeleteItems = (id) => {
        const updatedItems = addItem.filter((user) => user.id !== id);
        setItems(updatedItems);
    };

    const handleEditItems = (id, name) => {
        setEditId(id);
        setName(name); // 👈 this updates the input field correctly
    };

    const callApi = async () => {
        const data = await fetch("https://jsonplaceholder.typicode.com/users");
        const result = await data.json();
        setItems(result);
    };

    useEffect(() => {
        callApi();
    }, []);

    return (
        <div className="w-100 vh-100 bg-primary d-flex justify-content-center align-items-center">
            <div className="card bg-white w-50 vh-50">
                <div className="row px-5 py-3">
                    <div className="col-md-9">
                        <input
                            type="text"
                            className="form-control border-primary rounded-2"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Please Add Items"
                        />
                    </div>
                    <div className="col-md-3">
                        <div
                            className="btn btn-primary"
                            onClick={handleAddItems}
                        >
                            {editId ? "Update Item" : "Add Item"}
                        </div>
                    </div>
                </div>
                {addItem.map((user) => (
                    <div
                        key={user.id}
                        className="row mx-5 my-2 rounded-2 bg-info p-2 align-items-center"
                    >
                        <div className="col-md-9">{user.name}</div>
                        <div className="col-md-3 d-flex justify-content-between">
                            <span
                                className="btn btn-danger rounded-2 d-flex justify-content-center"
                                onClick={() => handleDeleteItems(user.id)}
                            >
                                <FaTrash />
                            </span>
                            <span
                                className="btn btn-primary rounded-2 d-flex justify-content-center"
                                onClick={() => handleEditItems(user.id, user.name)}
                            >
                                <FaEdit />
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Todos;
