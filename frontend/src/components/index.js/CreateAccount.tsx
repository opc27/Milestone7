import {useState} from "react"

const addUser = () => {
    const[user, setUser] = useState({
        name: "",
        password: "",
    })


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser ({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("user data:", user);
    }

    return (
        <div>
            <h2>Add User</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input type='text' name='name' value={user.name} onChange={handleChange} required></input>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name='password' value={user.password} onChange={handleChange} required></input>
                </div>
            </form>
        </div>
    )
}


export default addUser;