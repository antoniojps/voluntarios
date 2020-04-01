import React, { useLayoutEffect, useRef } from 'react'
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({ isOpen = false, toggle = () => {}, children = null, title = null }) => {
  const modalContent = useRef(null);

  useLayoutEffect(() => {
    if (isOpen) {
      disableBodyScroll(modalContent.current)
    } else {
      enableBodyScroll(modalContent.current);
    }
  }, [isOpen])

  useLayoutEffect(() => {
    return () => clearAllBodyScrollLocks();
  })

  const renderMobile = () => {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9}}
        animate={{ opacity: 1, scale: 1}}
        exit={{ opacity: 0, scale: 0.9}}
        key="modal"
        transition={{
          x: { type: "spring" },
        }}
        style={{width: '100%'}}
      >
        <div className="modal__container">
          <div className="modal__mobile-top">
            {title && <h3>{title}</h3>}
          </div>
          <div className="modal__mobile-content">
          {children}
          </div>
        </div>
        <style jsx>
          {`
            .modal {
              &__container {
                min-width: 26rem;
                z-index: 999;
                background-color: var(--bgElevated);
                border-radius: 5px;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                flex-direction: column;
                width: 100%;
                height: 100%;
                overflow-y: scroll;
                min-width: auto;
                padding: var(--spacing-xs3);
              }
              &__mobile-top {
                padding-top: var(--spacing-xs3);
                padding-bottom: var(--spacing-xs3);
                cursor: pointer;
              }
              &__mobile-content {
                width: 100%;
              }
            }
          `}
        </style>
      </motion.div>
    )
  }

  const renderDesktop = () => {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9}}
        animate={{ opacity: 1, scale: 1}}
        exit={{ opacity: 0, scale: 0.9}}
        transition={{
          x: { type: "spring", stiffness: 300, damping: 200 },
          opacity: { duration: 0.2 },
        }}
        style={{
          zIndex: 500,
        }}
        key="desktop"
      >
        <div className="modal__container">
          {title && <h3>{title}</h3>}
          {children}
        </div>
        <style jsx>
            {`
            .modal {
              &__container {
                  min-width: 26rem;
                  z-index: 500;
                  left: 0;
                  top: 0;
                  padding: var(--spacing-xs);
                  width: auto;
                  height: auto;
                  background-color: var(--bgElevated);
                  border-radius: 5px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  flex-direction: column;
                  width: 26rem;
                }
              }
            `}
          </style>
      </motion.div>
    )
  }

  return (
    <AnimatePresence initial={true}>
      {isOpen && (
        <div className="modal" ref={modalContent}>
          <motion.div
              onClick={toggle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.25 }}
              exit={{ opacity: 0 }}
              key="backdrop"
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                backgroundColor: '#000',
                opacity: 0.12,
                zIndex: 400,
              }}
              className="modal__backdrop"
          />
          <div className="modal-desktop">
            {renderDesktop()}
          </div>
          <div className="modal-mobile">
            {renderMobile()}
          </div>
        </div>
      )}
       <style jsx>{`
          @import "assets/styles/mixins.scss";
          .modal {
            position: fixed;
            display: flex;
            align-items: center;
            justify-content: center;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 999;

            &-mobile {
              display: none;
              @include screen(md) {
                position: absolute;
                z-index: 999;
                display: flex;
                width: 100%;
                height: 100%;
                bottom: 0;
              }
            }
            &-desktop {
              display: flex;
              z-index: 999;
              @include screen(md) {
                display: none;
                width: 100%;
                height: 100%;
              }
            }
            &__backdrop {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              background-color: #000;
              opacity: 0.12;
              z-index: 400;
            }
          }
          h3 {
            font-size: var(--size-xl4);;
            line-height: 1.6;
            font-weight: normal;
            text-align: center;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            word-break: break-word;
            text-transform: uppercase;
            color: var(--base);
            margin: 0px;
          }
        `}</style>
    </AnimatePresence>
  )
}

export default Modal