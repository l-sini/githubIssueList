import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { css } from '@emotion/react';
import { DEFAULT_DATA } from './GitHubIssue';
import { checkDayDate } from '../util/dateConvert';
import { useFindOneIssue } from '../api/issue/useGetIssue';
import { LoadingBox } from '../components/common/LoadingBox';

interface Props {}

export const IssueDetail: React.FC<Props> = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, refetch, isFetching } = useFindOneIssue({
    ...DEFAULT_DATA,
    issueNumber: id ?? '',
  });

  useEffect(() => {
    id && refetch();
  }, [id]);

  return (
    <>
      <div css={rootBoxStyle}>
        {isFetching && <LoadingBox data='issue info' />}
        {!isFetching && data && data?.number && (
          <>
            <div css={headBoxStyle}>
              <div>
                <div>
                  <img
                    src={data.user.avatar_url}
                    alt='avatar'
                    width={45}
                    height={45}
                  />
                </div>
                <div css={noCommentBoxStyle}>
                  <div css={titleBoxStyle}>
                    <p className='number'>#{data.number}</p>
                    <p className='title'>{data.title}</p>
                  </div>
                  <div css={userBoxStyle}>
                    <p>작성자 {data.user.login}</p>
                    <p>({checkDayDate(data.created_at)})</p>
                  </div>
                </div>
              </div>
              <div css={commentBoxStyle}>
                <p>코멘트 {data.comments}</p>
              </div>
            </div>
            <div
              css={bodyBoxStyle}
              dangerouslySetInnerHTML={{
                __html: data?.body_html ?? '',
              }}
            />
            <div css={buttonBoxStyle}>
              <button onClick={() => navigate(-1)}>목록으로</button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

const rootBoxStyle = css`
  padding: 14px;
  height: calc(100vh - 60px);
  overflow-y: auto;
  box-sizing: border-box;
`;

const headBoxStyle = css`
  padding: 14px;
  border-bottom: 1px solid #c9c9c9;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  & > div:first-of-type {
    display: flex;
    gap: 4px;
    align-items: flex-start;
  }
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

const bodyBoxStyle = css`
  color: #212121;
  font-size: 14px;
  line-height: 21px;
  padding: 14px;
  overflow-x: auto;
`;

const buttonBoxStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 8px;
  gap: 10px;
  box-sizing: border-box;
  border-top: 1px solid #78909c;
  button {
    color: #ffffff;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 400;
    line-height: 21px;
    padding: 8px;
    box-sizing: border-box;
    width: 100%;
    background-color: #1e88e5;
  }
`;
