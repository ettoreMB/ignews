import styles from './styles.module.scss'
import {SigninButton } from '../SigninButton/index'
import { ActiveLink } from '../ActiveLink'

export function Header() {
  

  return(
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="ig.news"/>
        <nav>
          <ActiveLink href="/" activeClassName={styles.active}>
            <a>Home</a>
          </ActiveLink>
          <ActiveLink  href="/posts" prefetch activeClassName={styles.active}>
            <a>Post</a>
          </ActiveLink>
          
        </nav>

        <SigninButton />
        </div>
    </header>
  );
}