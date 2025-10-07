import React, { forwardRef } from 'react';

import xIcon from '@/assets/icons/x-45.png';

import * as styles from './Modal.module.scss';

interface ModalProps {
  isActive?: boolean;
  top?: number;
  left?: number;
  isFullscreen?: boolean;
  children?: React.ReactNode;
  handleClose?: () => void;
}

// TODO block scroll

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ top = 0, left = 0, isActive, isFullscreen = false, children, handleClose }, ref) => {
    return (
      <div
        ref={ref}
        className={`${styles.modal} ${isFullscreen ? styles.fullscreen : ''}`}
        style={{
          top: top,
          left: left,
          opacity: isActive ? 1 : 1,
        }}
      >
        {children}
        <button
          className={styles.closeButton}
          style={{ display: isFullscreen ? 'flex' : 'none' }}
          onClick={() => {
            if (!handleClose) return;
            handleClose();
          }}
        >
          <img src={xIcon} alt="Close" />
        </button>
      </div>
    );
  }
);

Modal.displayName = 'Modal';

export default Modal;
