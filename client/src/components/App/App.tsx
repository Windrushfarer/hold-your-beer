import { FC, useState } from 'react'
import { View } from '../../shared/types/domain'
import { Header } from '../Header'
import { BeersTable } from '../BeersTable'
import { BreweriesTable } from '../BreweriesTable'
import { Switcher } from '../Switcher'

import styles from './App.module.css'

export const App: FC = ({ }) => {
  const [view, setView] = useState<View>('beers')
  return (
    <div className={styles.app}>
      <Header />

      <div className={styles.switcher}>
        <Switcher
          value={view}
          onChange={setView}
        />
      </div>

      <main className={styles.content}>
        {view === 'beers' && <BeersTable />}
        {view === 'breweries' && <BreweriesTable />}
      </main>
    </div>
  )
}
