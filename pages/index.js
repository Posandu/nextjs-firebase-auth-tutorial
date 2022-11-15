import { auth } from "../firebaseConfig";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";

export default function Home() {
	const [user, setUser] = useState(null);
	const [log, setLog] = useState("Logs...");
	const provider = new GoogleAuthProvider();

	const addLog = (log) => {
		setLog((prev) => prev + "\n" + JSON.stringify(log));
	};

	const signInWithGoogle = () => {
		signInWithPopup(auth, provider)
			.then((result) => {
				setUser(result);
			})
			.catch((error) => {
				addLog(error.message);
			});
	};

	return (
		<div>
			<h1>Firebase Auth Tutorial</h1>
			<p>This is a tutorial on how to use Firebase Auth in a Next.js app.</p>

			<p>Click the button below to sign in with Google.</p>

			<button
				onClick={() => {
					signInWithGoogle();
				}}
			>
				Sign in with Google
			</button>

			<p>Debug info:</p>

			{user && (
				<div>
					<h1>Welcome {user.user.displayName}</h1>
					<img src={user.user.photoURL} alt="user photo" />
				</div>
			)}

			<pre>
				<code>{log}</code>
			</pre>
		</div>
	);
}
