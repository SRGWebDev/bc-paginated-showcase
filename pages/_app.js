import Head from 'next/head'
import '../styles/globals.css'; // TODO use ThemeProvider
import styles from '../styles/Showcase.module.css';

function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.container}>
        <Head>
          <title>SRG Showcase Demo</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>

          <h1 className="title">
            Showcases
          </h1>

          <Component {...pageProps} />

        </main>

        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '}
            <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
          </a>
        </footer>
      </div>
  );
}

export default MyApp
