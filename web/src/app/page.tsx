import Link from "next/link";
import styles from "./styles.module.css";

export default function Page() {
  return (
    <main className={styles.main}>
      <h1>lofextra (beta)</h1>
      <h3>local-first expense tracker</h3>
      <Link href="/dashboard">
        <button>to app</button>
      </Link>
      <ul>
        <li>retain full ownership of your data securely and privately</li>
        <li>real-time e2e encrypted updates between multiple devices</li>
        <li>use mnemonic phrase as key to your account</li>
        <li>no registration, no email, no password</li>
        <li>install the app to get the native app feel</li>
        <li>works offline</li>
      </ul>
    </main>
  );
}
