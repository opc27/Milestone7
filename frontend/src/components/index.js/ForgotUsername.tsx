import { useState } from 'react';

const ForgotCredentials = () => {
  const [email, setEmail] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Recovery email submitted:', email);
  };

  return (
    <div>
      <h2>Forgot Username/Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Enter your email address: </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ForgotCredentials;
