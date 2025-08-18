import React, { useState, useContext, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import ListContext from '../context/ListContext';
import axios from 'axios';

function EditList() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { list, setList, fetchList } = useContext(ListContext);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [status, setStatus] = useState("");
    const [priority, setPriority] = useState("");
    const [expireDate, setExpireDate] = useState("");
    const [time, setTime] = useState("");

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const res = await axios.get(`https://to-do-app-backend-ib5y.onrender.com/list/get/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'authToken': localStorage.getItem("authToken")
                    }
                })

                if (res.status === 200) {
                    setTitle(res.data.title);
                    setDescription(res.data.description);
                    setType(res.data.type);
                    setStatus(res.data.status);
                    setPriority(res.data.priority);
                    setExpireDate(res.data.expireDate);
                }
                else {
                    alert("Failed to fetch note: " + res.data.message);
                    navigate("/");
                }
            }
            catch (err) {
                console.error("Error fetching note:", err);
                alert("Could not load note for editing.");
                navigate("/");
            }
        }
        fetchNote();
    }, [id, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Logic to handle note submission
        try {
            if (!!localStorage.getItem("authToken")) {
                // Assuming you have an API endpoint to handle note updates
                await axios.put(`https://to-do-app-backend-ib5y.onrender.com/list/update/${id}`, {
                    title,
                    description,
                    type,
                    status,
                    priority,
                    expireDate,
                    time
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'authToken': localStorage.getItem("authToken")
                    }
                });


                alert("Note updated successfully!");
                fetchList();
                navigate("/");
            } else {
                alert("Please login to update notes");
            }
            //const res = await axios.put()

        } catch (error) {
            if (error.response) {
                alert(`Login failed: ${error.response.data.message}`);
            } else {
                alert("Network error. Please try again.");
            }
            console.error("Error during login:", error);
        }
        //console.log("Note submitted:", { title, description, type, status, priority, expireDate });
    }
    
    return (
        <>
            <h2 className="text-center">Edit Item</h2>
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
                    <input type="time" className="form-control" id="time" value={time} onChange={(e) => setTime(e.target.value)} />
                </div>


                <button type="submit" class="btn btn-primary">Submit</button>
                <button type="button" class="btn btn-secondary ms-2" onClick={() => navigate("/")}>Cancel</button>
            </form>
        </>
    )
}



export default EditList
