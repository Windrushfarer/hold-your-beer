import { FC } from 'react'
import styles from './Pagination.module.css'

type Props = {
  hasPrev: boolean,
  hasNext: boolean,
  onPrevClick: () => void,
  onNextClick: () => void,
}

const NextIcon = ({ className }: { className?: string }) => (
  <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} >
    <path d="M1.25 12.5L6.75 7L1.25 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const PrevIcon = ({ className }: { className?: string }) => (
  <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M6.75 12.5L1.25 7L6.75 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const Pagination: FC<Props> = ({ hasPrev, hasNext, onNextClick, onPrevClick }) => {
  return (
    <div className={styles.pagination}>
      <button className={styles.button} disabled={!hasPrev} onClick={onPrevClick}>
        <PrevIcon className={styles.prevIcon} />
        Previous
      </button>
      <button className={styles.button} disabled={!hasNext} onClick={onNextClick}>
        Next
        <NextIcon className={styles.nextIcon} />
      </button>
    </div>
  )
}
