import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';

interface IModalProps {
  children?: React.ReactNode;
  onClose?: () => void;
}

const NOOP = () => { };

export function Modal({ children, onClose = NOOP }: IModalProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (event.target instanceof Node && !ref.current?.contains(event.target)) {
        onClose()
      }
    }

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    }
  }, []);


  const node = document.querySelector('#modal_root');
  if (!node) return null;

  return ReactDOM.createPortal((
    <div className={styles.wrapper} >
      <div className={styles.modal} ref={ref} onClick={e => e.stopPropagation()} >
        {children}
      </div>
    </div>
  ), node
  );
}
