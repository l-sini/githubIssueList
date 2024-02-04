import React from 'react';
import { css } from '@emotion/react';

interface Props {
  data: string;
}

export const LoadingBox: React.FC<Props> = ({ data }) => {
  return (
    <>
      <div css={rootBoxStyle}>
        <span>{data}</span> 로딩중...
      </div>
    </>
  );
};

const rootBoxStyle = css`
  /* height: 100%; */
  height: calc(100vh - 100px);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: #505050;
  span {
    font-weight: 700;
    color: #212121;
    margin-right: 4px;
  }
`;
