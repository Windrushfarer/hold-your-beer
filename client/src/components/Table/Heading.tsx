import { FC } from 'react'
import { TableHeaderProps } from 'react-table'
import styles from './Table.module.css'

type Props = TableHeaderProps & {
  isSortActive: boolean,
  sortDirection: 'asc' | 'desc' | undefined,
}

export const TableHeading: FC<Props> = ({ children, isSortActive, sortDirection, ...props }) => {
  return (
    <th {...props} className={styles.heading}>
      {children}
      <span className={`${styles.direction} ${isSortActive ? styles.visible : ''}`.trim()}>
        {sortDirection === 'asc' ? ' ▲' : ' ▼'}
      </span>
    </th>
  )
}
