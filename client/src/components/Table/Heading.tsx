import { FC } from 'react'
import { TableHeaderProps } from 'react-table'
import clsx from 'clsx'
import styles from './Table.module.css'

type Props = TableHeaderProps & {
  isSortable: boolean,
  isSortActive: boolean,
  sortDirection: 'asc' | 'desc' | undefined,
}

const AscIcon = ({ className }: { className?: string }) => (
  <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M1.5 6.75L7 1.25L12.5 6.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const DescIcon = ({ className }: { className?: string }) => (
  <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M1.5 1.25L7 6.75L12.5 1.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const TableHeading: FC<Props> = ({ children, isSortActive, sortDirection, isSortable, ...props }) => {
  return (
    <th {...props} className={styles.heading}>
      <div className={styles.headingContent}>
        {children}

        {isSortable && (
          <span className={styles.direction}>
            {!isSortActive && (
              <>
                <AscIcon className={styles.asc} />
                <DescIcon className={styles.desc} />
              </>
            )}

            {isSortActive && sortDirection === 'asc' && (
              <AscIcon className={clsx(styles.asc, styles.active)} />
            )}

            {isSortActive && sortDirection === 'desc' && (
              <DescIcon className={clsx(styles.asc, styles.active)} />
            )}
          </span>
        )}
      </div>
    </th>
  )
}
