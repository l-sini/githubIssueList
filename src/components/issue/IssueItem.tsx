import React from 'react';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import { IIssue } from '../../api/issue/useGetIssue';
import { checkDayDate } from '../../util/dateConvert';

interface Props {
  item: IIssue;
}

export const IssueItem: React.FC<Props> = ({ item }) => {
  const navigate = useNavigate();
  return (
    <>
      <div css={rootBoxStyle} onClick={() => navigate(item.number.toString())}>
        <div css={noCommentBoxStyle}>
          <div css={titleBoxStyle}>
            <p className='number'>#{item.number}</p>
            <p className='title'>{item.title}</p>
          </div>
          <div css={userBoxStyle}>
            <p>작성자 {item.user.login}</p>
            <p>({checkDayDate(item.created_at)})</p>
          </div>
        </div>
        <div css={commentBoxStyle}>
          <p>코멘트 {item.comments}</p>
        </div>
      </div>
    </>
  );
};

const rootBoxStyle = css`
  padding: 14px;
  border-radius: 4px;
  border: 1px solid #c9c9c9;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const noCommentBoxStyle = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const commentBoxStyle = css`
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: #757575;
  white-space: nowrap;
`;

const titleBoxStyle = css`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 4px;
  font-size: 16px;
  line-height: 24px;
  & > .number {
    font-weight: 400;
    color: #505050;
    border: 1px solid #bdbdbd;
    border-radius: 4px;
    padding: 0 4px;
  }
  & > .title {
    font-weight: 500;
    color: #212121;
    word-break: break-all;
  }
`;

const userBoxStyle = css`
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: #505050;
`;
