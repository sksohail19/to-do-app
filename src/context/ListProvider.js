import React, { useState, useEffect } from 'react'
import ListContext from './ListContext';
import axios from 'axios';
import Loader from '../components/Loader';

const ListProvider = (props) => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchList = async () => {
        try {
            //console.log(localStorage.getItem('authToken'))
            setLoading(true);
            console.log("Fetching list items...");
            if (localStorage.getItem('authToken') !== null) {
                const response = await axios.get("https://to-do-app-backend-o5xs.onrender.com/list/getall", {
                    headers: {
                        'Content-Type': 'application/json',
                        'authToken': localStorage.getItem('authToken') // Assuming you store the token in localStorage
                    }
                })
                //console.log(response.data);

                if (response.status === 200) {
                    setList(response.data);
                }
            } else {
                console.error("Auth is null")
            }
        } catch (error) {
            console.error("Error fetching notes: ", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <ListContext.Provider value={{ list, setList, fetchList }}>
            {loading ? <Loader/> : props.children}
        </ListContext.Provider>
    )
}

export default ListProvider
