import { FC } from 'react'
import { Header } from '../Header'
import { BeersTable } from '../BeersTable'

import styles from './App.module.css'

type Props = {}

export const App: FC<Props> = ({ }) => {
  return (
    <div className={styles.app}>
      <Header />

      <main className={styles.content}>
        <BeersTable />
      </main>
    </div>
  )
}
