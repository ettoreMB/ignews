import styles from './styles.module.scss'
import {SigninButton } from '../SigninButton/index'

export function Header() {
  return(
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="images/logo.svg" alt="ig.news"/>
        <nav>
          <a  className={styles.active}>Home</a>
          <a >Post</a>
        </nav>

        <SigninButton />
        </div>
    </header>
  );
}