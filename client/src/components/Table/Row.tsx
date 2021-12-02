import { FC, ReactNode } from 'react'
import { TableRowProps, Cell } from 'react-table'
import styles from './Table.module.css'

type Props<T extends object> = TableRowProps & {
  cells: Cell<T>[]
}

export function TableRow<T extends object>({ cells, ...props }: Props<T>) {
  return (
    <tr {...props} className={styles.row}>
      {cells.map(cell => (
        <td {...cell.getCellProps()} className={styles.cell}>
          <div className={styles.content}>
            {cell.render('Cell')}
          </div>
        </td>
      ))}
    </tr>
  )
}
