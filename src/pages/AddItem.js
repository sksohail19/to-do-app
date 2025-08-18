import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import ListContext from '../context/ListContext';

function AddItem() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [status, setStatus] = useState(["Pending", "In Progress", "Completed", "Cancelled", "Backlog"]);
    const [priority, setPriority] = useState(["High", "Medium", "Low"]);
    const [description, setDescription] = useState('');
    const [expireDate, setExpireDate] = useState('');
    const [time, setTime] = useState('');
    const { fetchList } = useContext(ListContext)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !type || !status || !priority || !description || !expireDate) {
            alert("Please fill in all fields");
            return;
        }

        if (localStorage.getItem("authToken") === null) {
            alert("You must be logged in to add an item");
            window.location.href = "/login";  // Redirect to login page
            return;
        }
        try {
            const Item = await axios.post("https://to-do-app-backend-ib5y.onrender.com/list/add", {
                title,
                type,
                status,
                priority,
                description,
                expireDate,
                time
            }, {
                headers: { authToken: localStorage.getItem("authToken") }
            });
            
            if (Item.status === 201) {
                alert("Item added successfully");
                handleReset();
                navigate("/");
                fetchList();
            } else {
                alert("Failed to add item");
            }

        } catch (error) {
            if (error.response) {
                console.error("Error response from server:", error.response.data);
            }
            else {
                console.error("Error message:", error.message);
            }
            alert("An error occurred while submitting the form. Please try again.");
        }
    };
    const handleReset = () => {
        setTitle('');
        setType('');
        setStatus('');
        setPriority('');
        setDescription('');
        setExpireDate('');
        setTime('');
    }
    return (
        <>
            <h2 className="text-center">Add Item Page</h2>
            <form className="container w-75 mt-5" onSubmit={handleSubmit}>
                <div class="mb-3">
                    <label htmlFor="title" class="form-label">Title</label>
                    <input type="text" class="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div class="mb-3">
                    <label htmlFor="type" class="form-label">Type</label>
                    <input type="text" class="form-control" id="type" value={type} onChange={(e) => setType(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="status" className="form-label">Status</label>
                    <select className="form-select" id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="">Select Status</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Backlog">Backlog</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="priority" className="form-label">Priority</label>
                    <select className="form-select mb-3" id="priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
                        <option value="">Select Priority</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" rows="3" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>

                <div className="mb-3">
                    <label htmlFor="expireDate" className="form-label">Expire Date</label>
                    <input type="date" className="form-control" id="expireDate" value={expireDate} onChange={(e) => setExpireDate(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label htmlFor="time" className="form-label">Expire Time</label>
                    <input type="time" className="form-control" id="time" value={time} onChange={(e) => setTime(e.target.value) } />
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
                <button type="reset" class="btn btn-secondary ms-2">Reset</button>
                <button type="button" class="btn btn-danger ms-2" onClick={() => navigate("/")}>Cancel</button>
            </form>
        </>
    )
}

export default AddItem
