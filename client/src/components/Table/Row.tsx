import { FC, ReactNode } from 'react'
import { TableRowProps, Cell } from 'react-table'
import { Beer } from '../../shared/types/domain'
import styles from './Table.module.css'

type Props = TableRowProps & {
  cells: Cell<Beer>[]
}

export const TableRow: FC<Props> = ({ cells, ...props }) => {
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
