import React from 'react'
import Skeleton from 'react-loading-skeleton';

function Loader() {
    return (
        <div className="container mt-5">
            <h3><Skeleton width={200} /></h3>
            <p><Skeleton width={300} /></p>

            {/* Search bar skeleton */}
            <form className="d-flex my-3 w-50 container">
                <Skeleton height={38} width={400} className="me-2" />
                <Skeleton height={38} width={100} />
            </form>

            {/* Table skeleton */}
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
                            <th scope="col" className="text-center">Edit</th>
                            <th scope="col" className="text-center">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <tr key={index}>
                                <td><Skeleton width={120} /></td>
                                <td className="text-center"><Skeleton width={80} /></td>
                                <td className="text-center"><Skeleton width={80} /></td>
                                <td className="text-center"><Skeleton width={80} /></td>
                                <td className="px-1"><Skeleton width={150} /></td>
                                <td className="text-center"><Skeleton width={100} /></td>
                                <td className="text-center"><Skeleton width={80} /></td>
                                <td className="text-center"><Skeleton width={60} height={30} /></td>
                                <td className="text-center"><Skeleton width={70} height={30} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Loader
