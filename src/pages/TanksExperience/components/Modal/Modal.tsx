import React, { forwardRef } from 'react';

import * as styles from './Modal.module.scss';

interface ModalProps {
  isActive?: boolean;
  top?: number;
  left?: number;
  isFullscreen?: boolean;
  children?: React.ReactNode;
}

// TODO block scroll

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ top = 0, left = 0, isActive, isFullscreen = false, children }, ref) => {
    return (
      <div
        ref={ref}
        className={`${styles.modal} ${isFullscreen ? styles.fullscreen : ''}`}
        style={{ top: top, left: left, opacity: isActive ? 1 : 1 }}
      >
        {children}
      </div>
    );
  }
);

Modal.displayName = 'Modal';

export default Modal;
