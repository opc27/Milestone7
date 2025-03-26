'use client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';
import { useScripture } from '../../contexts/ScriptureContext';

const StatusBar = () => (
  <header className={styles.statusBar}>
    <span className={styles.time}>9:41</span>
    <div className={styles.statusIcons} />
    <div
      dangerouslySetInnerHTML={{
        __html: `<svg id="I7:138;128:71948" layer-name="Levels" width="131" height="14" viewBox="0 0 131 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="flex-1"> <path fill-rule="evenodd" clip-rule="evenodd" d="M47.1151 2.03301C47.1151 1.39996 46.6376 0.88678 46.0485 0.88678H44.9818C44.3927 0.88678 43.9151 1.39996 43.9151 2.03301V11.967C43.9151 12.6 44.3927 13.1132 44.9818 13.1132H46.0485C46.6376 13.1132 47.1151 12.6 47.1151 11.967V2.03301ZM39.681 3.33206H40.7477C41.3368 3.33206 41.8144 3.85756 41.8144 4.5058V11.9395C41.8144 12.5877 41.3368 13.1132 40.7477 13.1132H39.681C39.0919 13.1132 38.6144 12.5877 38.6144 11.9395V4.5058C38.6144 3.85756 39.0919 3.33206 39.681 3.33206ZM35.3493 5.98111H34.2826C33.6935 5.98111 33.2159 6.5133 33.2159 7.16979V11.9245C33.2159 12.581 33.6935 13.1132 34.2826 13.1132H35.3493C35.9384 13.1132 36.4159 12.581 36.4159 11.9245V7.16979C36.4159 6.5133 35.9384 5.98111 35.3493 5.98111ZM30.0485 8.4264H28.9818C28.3927 8.4264 27.9151 8.95099 27.9151 9.5981V11.9415C27.9151 12.5886 28.3927 13.1132 28.9818 13.1132H30.0485C30.6376 13.1132 31.1151 12.5886 31.1151 11.9415V9.5981C31.1151 8.95099 30.6376 8.4264 30.0485 8.4264Z" fill="black"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M62.6864 3.30213C65.1736 3.30223 67.5656 4.22432 69.3681 5.8778C69.5038 6.00545 69.7208 6.00384 69.8544 5.87419L71.1519 4.61072C71.2196 4.54496 71.2574 4.45588 71.2568 4.3632C71.2562 4.27052 71.2174 4.18187 71.1489 4.11688C66.4179 -0.257833 58.9542 -0.257833 54.2232 4.11688C54.1547 4.18183 54.1158 4.27044 54.1152 4.36313C54.1145 4.45581 54.1522 4.54491 54.2198 4.61072L55.5177 5.87419C55.6513 6.00404 55.8684 6.00565 56.0041 5.8778C57.8068 4.22421 60.1991 3.30212 62.6864 3.30213ZM62.6831 7.5224C64.0404 7.52232 65.3493 8.03406 66.3554 8.95819C66.4915 9.08934 66.7059 9.0865 66.8385 8.95178L68.1258 7.63247C68.1936 7.56327 68.2312 7.46939 68.2302 7.37184C68.2292 7.27429 68.1898 7.18121 68.1206 7.11342C65.0568 4.22257 60.312 4.22257 57.2482 7.11342C57.179 7.18121 57.1395 7.27434 57.1386 7.37192C57.1377 7.4695 57.1754 7.56337 57.2434 7.63247L58.5303 8.95178C58.6629 9.0865 58.8773 9.08934 59.0134 8.95819C60.0188 8.03467 61.3267 7.52297 62.6831 7.5224ZM65.2075 10.316C65.2094 10.4213 65.1724 10.5229 65.1051 10.5967L62.9284 13.0514C62.8646 13.1236 62.7776 13.1642 62.6868 13.1642C62.5961 13.1642 62.5091 13.1236 62.4453 13.0514L60.2682 10.5967C60.201 10.5228 60.164 10.4212 60.166 10.3159C60.168 10.2105 60.2088 10.1108 60.2788 10.0401C61.6689 8.72625 63.7048 8.72625 65.0949 10.0401C65.1648 10.1108 65.2056 10.2106 65.2075 10.316Z" fill="black"></path> <rect opacity="0.35" x="78.7568" y="1" width="24" height="12" rx="3.8" stroke="black"></rect> <path opacity="0.4" d="M104.257 5.28113V9.3566C105.062 9.01143 105.585 8.20847 105.585 7.31886C105.585 6.42926 105.062 5.6263 104.257 5.28113Z" fill="black"></path> <rect x="80.2568" y="2.5" width="21" height="9" rx="2.5" fill="black"></rect> </svg>`,
      }}
    />
  </header>
);

const LoginForm = () => {
  const [username, setUsername] = useState('AnnaMarie401@byuis.com');
  const [password, setPassword] = useState('●●●●●●●●●●●●');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { refreshScripture } = useScripture();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const loginData = { username, password };

    try {
      //I have no idea why but it gives a CORS error if it's http and https; this way it throws different errors that make more sense.
      const response = await fetch('https://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'An error occurred');
      } else {
        const data = await response.json();
        console.log('Login successful', data);
        setError(null); // Reset error on success
        
        // Fetch a new random scripture
        await refreshScripture();
        
        // You can store the user ID or token here if needed
        // localStorage.setItem("userId", data.userId);
        
        // Navigate to the home page after successful login
        navigate('/home');
      }
    } catch (err) {
      setError('There was an issue with the request.');
    }
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <button type="button" className={styles.churchButton}>
        Sign in with church account
      </button>

      <div className={styles.divider}>
        <div className={styles.dividerLine} />
        <span className={styles.dividerText}>OR</span>
      </div>

      <div className={styles.formFields}>
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>Email/Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>Password</label>
          <div className={styles.passwordInput}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
            />
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/8202247ca2ff90810a7781a94eb0917d16755504"
              alt=""
              className={styles.passwordToggle}
            />
          </div>
        </div>
      </div>

      <button type="submit" className={styles.signInButton}>
        Sign In
      </button>
    </form>
  );
};

// const HelpSection = () => (
//   <nav className={styles.helpLinks}>
//     <div className={styles.accountLinks}>
//       <a href="#" className={styles.link}>
//         Forgot username/password?
//       </a>
//       <a href="#" className={styles.link}>
//         Create an Account
//       </a>
//     </div>
//     <div className={styles.supportLinks}>
//       <a href="#" className={styles.smallLink}>
//         Need Help?
//       </a>
//       <a href="#" className={styles.smallLink}>
//         Contact Support
//       </a>
//     </div>
//   </nav>
// );

const HelpSection = () => {
  const navigate = useNavigate();

  return (
    <nav className={styles.helpLinks}>
      <div className={styles.accountLinks}>
        <a href="#" className={styles.link}>
          Forgot username/password?
        </a>
        <a
          href="#"
          className={styles.link}
          onClick={(e) => {
            e.preventDefault(); // Prevent default link behavior
            navigate('"/index/CreateAccount"'); // Redirect to CreateAccount page
          }}
        >
          Create an Account
        </a>
      </div>
      <div className={styles.supportLinks}>
        <a href="#" className={styles.smallLink}>
          Need Help?
        </a>
        <a href="#" className={styles.smallLink}>
          Contact Support
        </a>
      </div>
    </nav>
  );
};

const ChatButton = () => (
  <div className={styles.chatButton}>
    <button className={styles.chatButtonInner} aria-label="Open chat">
      <div
        dangerouslySetInnerHTML={{
          __html: `<svg id="I1:510;51525:5017" layer-name="Unselected-icon" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-[24px] h-[24px]"> <path d="M22.5 22.5V4.5C22.5 3.95 22.3042 3.47917 21.9125 3.0875C21.5208 2.69583 21.05 2.5 20.5 2.5H4.5C3.95 2.5 3.47917 2.69583 3.0875 3.0875C2.69583 3.47917 2.5 3.95 2.5 4.5V16.5C2.5 17.05 2.69583 17.5208 3.0875 17.9125C3.47917 18.3042 3.95 18.5 4.5 18.5H18.5L22.5 22.5Z" fill="#FFF9FF"></path> </svg>`,
        }}
      />
    </button>
  </div>
);

const LoginPage = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        <StatusBar />

        <main className={styles.mainContent}>
          <h2 className={styles.welcomeText}>Welcome to</h2>
          <h1 className={styles.title}>TEMPLE PREP</h1>

          <LoginForm />
          <HelpSection />
        </main>

        <ChatButton />
      </div>
    </div>
  );
};

export default LoginPage;
