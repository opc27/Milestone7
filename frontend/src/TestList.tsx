import {user} from './types/user.ts';
import {useEffect, useState} from "react";

function TestList () {
    const [users, setUsers] = useState<user[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('https://localhost:5000/Users');
            const data = await response.json();
            setUsers(data);
        };
        fetchUsers();
    }, []);

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>UserID</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>ProfilePicSrc</th>
                        <th>TempleId</th>
                        <th>CurrentModule</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u) => (
                        <tr key={u.userId}>
                            <td>{u.userId}</td>
                            <td>{u.username}</td>
                            <td>{u.password}</td>
                            <td>{u.firstname}</td>
                            <td>{u.lastname}</td>
                            <td>{u.profilePicSrc}</td>
                            <td>{u.templeName}</td>
                            <td>{u.currentModule}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default TestList;

