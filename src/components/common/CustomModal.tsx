import React from 'react';
import { css } from '@emotion/react';

interface Props {
  resultMessage: any;
  onCancel?: () => void;
  onConfirm: () => void;
  buttonText?: string;
  disabled?: boolean;
  cancelText?: string;
  titleStyle?: any;
}

export const CustomModal: React.FC<Props> = ({
  resultMessage,
  onCancel,
  onConfirm,
  buttonText = '확인',
  disabled = false,
  cancelText,
  titleStyle,
}) => {
  return (
    <div>
      <Modal
        resultMessage={resultMessage}
        onConfirm={onConfirm}
        buttonText={buttonText}
        disabled={disabled}
        onCancel={onCancel}
        cancelText={cancelText}
        titleStyle={titleStyle}
      />
    </div>
  );
};

const Modal = ({
  resultMessage,
  onCancel,
  onConfirm,
  buttonText = '확인',
  disabled = false,
  cancelText,
  titleStyle,
}: Props) => {
  return (
    <>
      <div css={modalStyle}>
        <div css={contentStyle} style={titleStyle}>
          {resultMessage}
        </div>
        <div className='buttonBox'>
          {onCancel && (
            <button onClick={onCancel} className='cancelButton'>
              {cancelText ?? '취소'}
            </button>
          )}
          <button
            onClick={onConfirm}
            className='confirmButton'
            disabled={disabled}
          >
            {buttonText}
          </button>
        </div>
      </div>
      <div className='shadow' css={shadowStyle}></div>
    </>
  );
};
const modalStyle = css`
  width: max-content;
  max-width: 80vw;
  padding: 14px;
  height: max-content;
  background-color: #ffffff;
  border-radius: 14px;
  position: absolute;
  z-index: 999;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .buttonBox {
    margin-top: 24px;
    width: 100%;
    display: flex;
    column-gap: 8px;
    align-items: center;
    justify-content: space-between;
    button {
      flex: 1;
      width: 50%;
      border-radius: 14px;
      padding: 14px 0;
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      line-height: 28px;
      &.cancelButton {
        background-color: #f0f0f0;
        color: #0c002c;
      }
      &.confirmButton {
        background-color: #1e88e5;
        color: #ffffff;
      }
    }
  }
`;
const contentStyle = css`
  padding: 8px 0;
  text-align: center;
  white-space: pre-wrap;
`;
const shadowStyle = css`
  display: block;
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 998;
  background-color: rgba(0, 0, 0, 0.5);
`;
