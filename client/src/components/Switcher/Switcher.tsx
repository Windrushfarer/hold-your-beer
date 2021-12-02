import { FC } from 'react'
import { View } from '../../shared/types/domain'

import styles from './Switcher.module.css'

type Props = {
  value: View,
  onChange: (value: View) => void,
}

export const Switcher: FC<Props> = ({ value, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value as View)
  }

  return (
    <div className={styles.switcher}>
      <input
        className={styles.input}
        type="radio"
        id="beers"
        name="beers"
        value="beers"
        checked={value === 'beers'}
        onChange={handleChange}
      />
      <label htmlFor="beers" className={styles.label}>
        Beers 🍻
      </label>
      <input
        className={styles.input}
        type="radio"
        id="breweries"
        name="breweries"
        value="breweries"
        checked={value === 'breweries'}
        onChange={handleChange}
      />
      <label htmlFor="breweries" className={styles.label}>
        Breweries 🏠
      </label>
    </div>
  )
}
