import React, { forwardRef } from 'react';

import * as styles from './Modal.module.scss';

interface ModalProps {
  isActive?: boolean;
  top?: number;
  left?: number;
  isFullscreen?: boolean;
  children?: React.ReactNode;
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ top = 0, left = 0, isActive, isFullscreen = false, children }, ref) => {
    return (
      <div
        ref={ref}
        className={`${isFullscreen ? styles.fullscreen : styles.modal}`}
        style={{ top: top, left: left, opacity: isActive ? 1 : 0.5 }}
      >
        {children}
      </div>
    );
  }
);

Modal.displayName = 'Modal';

export default Modal;
