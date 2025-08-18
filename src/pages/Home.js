import React, { useState, useContext } from 'react'
import ListContext from '../context/ListContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
    const [search, setSearch] = useState("");
    const { list, setList, fetchList } = useContext(ListContext);

    const deleteTask = async (id) => {
        try {
            if (!localStorage.getItem('authToken')) {
                console.error("No auth token found");
                return;
            }

            //console.log(`https://localhost:5000/list/delete/${id}`);
            const response = await axios.delete(`https://to-do-app-backend-ib5y.onrender.com/list/delete/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': localStorage.getItem('authToken') // Assuming you store the token in localStorage
                }
            });

            if (response.status === 200) {
                setList((prevList) => prevList.filter((item) => item._id !== id));
                fetchList(); // Refresh the list after deletion
            }
            // refresh after delete
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    return (
        <>
            <div className="container mt-5">
                <h3>Welcome back Sohail!</h3>
                <p>Here you can manage your tasks efficiently.</p>
                <form
                    className="d-flex my-3 w-50 container"
                    role="search"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className="btn btn-outline-success" type="submit">
                        Search
                    </button>
                </form>

                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col" className="text-center">Title</th>
                                <th scope="col" className="text-center">Type</th>
                                <th scope="col" className="text-center">Status</th>
                                <th scope="col" className="text-center">Priority</th>
                                <th scope="col" className="text-center">Description</th>
                                <th scope="col" className="text-center">Expire Date</th>
                                <th scope="col" className="text-center">Expire Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list
                                .filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
                                .map((item) => (
                                    <tr key={item._id}>
                                        <td>{item.title}</td>
                                        <td className="text-center">{item.type}</td>
                                        <td className="text-center">{item.status}</td>
                                        <td className="text-center">{item.priority}</td>
                                        <td className="px-1">{item.description}</td>
                                        <td className="text-center">
                                            {new Date(item.expireDate).toISOString().split("T")[0]}
                                        </td>
                                        <td className="text-center">{item.time || "--"}</td>
                                        <td>
                                            <Link to={`/update/${item.taskId}`}>
                                                <button className="btn btn-primary">Edit</button>
                                            </Link>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => deleteTask(item._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    )
}

export default Home
