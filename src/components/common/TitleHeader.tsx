import React from 'react';
import { css } from '@emotion/react';

interface Props {
  owner: string;
  repoName: string;
}

export const TitleHeader: React.FC<Props> = ({ owner, repoName }) => {
  return (
    <>
      <div css={rootBoxStyle}>
        <p className='owner'>{owner}</p>
        <p className='repo'>[{repoName}]</p>
      </div>
    </>
  );
};

const rootBoxStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 14px 0;
  & > .owner {
    font-size: 20px;
    font-weight: 700;
    line-height: 30px;
    color: #212121;
  }
  & > .repo {
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    color: #505050;
  }
`;
