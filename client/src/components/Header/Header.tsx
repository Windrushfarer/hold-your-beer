import { FC } from 'react'
import styles from './Header.module.css'

type Props = {}

export const Header: FC<Props> = ({ }) => {
  return (
    <header className={styles.header}>
      <div className={styles.first}>
        Hold your
      </div>
      <div className={styles.second}>
        beer
      </div>
      <div className={styles.icons}>
        🍻 🤘
      </div>
    </header>
  )
}
