import React, { useEffect, useRef, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { css } from '@emotion/react';
import { useFindAllIssueList } from '../api/issue/useGetIssue';
import { TitleHeader } from '../components/common/TitleHeader';
import { LoadingBox } from '../components/common/LoadingBox';
import { IssueItem } from '../components/issue/IssueItem';

interface Props {}

export const DEFAULT_DATA = { owner: 'angular', repoName: 'angular-cli' };

export const GitHubIssue: React.FC<Props> = () => {
  const { id } = useParams();
  const scrollRef = useRef<any>();
  const [page, setPage] = useState<number>(1);
  const { data, refetch, isFetched } = useFindAllIssueList({
    ...DEFAULT_DATA,
    param: { page, per_page: 10 },
  });

  const onClickAd = () => {
    const a = document.createElement('a');
    a.href = 'https://thingsflow.com/ko/home';
    a.target = '_blank';
    a.click();
    document.body.removeChild(a);
  };

  useEffect(() => {
    !id && refetch();
  }, [page]);

  useEffect(() => {
    if (isFetched) {
      scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight);
    }
  }, [isFetched]);

  return (
    <>
      <div css={rootBoxStyle}>
        <TitleHeader
          owner={DEFAULT_DATA.owner}
          repoName={DEFAULT_DATA.repoName}
        />
        {!id && (
          <>
            <div css={listBoxStyle} ref={scrollRef}>
              {isFetched && data && data?.length
                ? data?.map(item => <IssueItem key={item.id} item={item} />)
                : !isFetched && <LoadingBox data='issue 10개' />}
              <div css={adImgBoxStyle}>
                <img
                  src='https://hellobot-test.s3.ap-northeast-2.amazonaws.com/image/01fdd797-0477-4717-8d70-8551150463f7'
                  alt=''
                  onClick={onClickAd}
                />
              </div>
            </div>
            <div css={buttonBoxStyle}>
              <button onClick={() => setPage(pre => pre + 1)} className='load'>
                load
              </button>
              <button onClick={() => setPage(1)} className='reset'>
                초기화
              </button>
            </div>
          </>
        )}
      </div>
      <Outlet />
    </>
  );
};

const rootBoxStyle = css`
  position: relative;
  padding-top: 60px;
  overflow: hidden;
`;

const listBoxStyle = css`
  height: calc(100vh - 124px);
  overflow-y: auto;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
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
  }
  & > .load {
    background-color: #66bb6a;
  }
  & > .reset {
    background-color: #ff0000;
  }
`;

const adImgBoxStyle = css`
  width: 100%;
  padding: 8px 0;
  box-sizing: border-box;
  img {
    width: 100%;
    height: 100%;
    max-height: 240px;
    cursor: pointer;
  }
`;
