import React, { Fragment, useEffect, useRef } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { css } from '@emotion/react';
import { useFindAllIssueListV2 } from '../api/issue/useGetIssue';
import { TitleHeader } from '../components/common/TitleHeader';
import { LoadingBox } from '../components/common/LoadingBox';
import { IssueItem } from '../components/issue/IssueItem';

interface Props {}

export const DEFAULT_DATA = { owner: 'angular', repoName: 'angular-cli' };

export const GitHubIssueV2: React.FC<Props> = () => {
  const { id } = useParams();
  const scrollRef = useRef<any>();
  const loadingRef = useRef<any>();

  const { data, refetch, fetchNextPage, isFetching, hasNextPage, remove } =
    useFindAllIssueListV2({
      ...DEFAULT_DATA,
      param: { page: 1, per_page: 10 },
    });

  const onClickAd = () => {
    const a = document.createElement('a');
    a.href = 'https://thingsflow.com/ko/home';
    a.target = '_blank';
    a.click();
    document.body.removeChild(a);
  };

  const onClickReset = () => {
    remove();
    refetch();
  };

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (!isFetching) {
      setTimeout(() => {
        scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight);
      }, 100);
    } else {
      loadingRef.current?.scrollIntoView();
    }
  }, [isFetching]);

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
              {data?.pages.map((page, idx) => (
                <Fragment key={idx.toString()}>
                  {page?.map(item => <IssueItem key={item.id} item={item} />)}
                  <div css={adImgBoxStyle}>
                    <img
                      src='https://hellobot-test.s3.ap-northeast-2.amazonaws.com/image/01fdd797-0477-4717-8d70-8551150463f7'
                      alt=''
                      onClick={onClickAd}
                    />
                  </div>
                </Fragment>
              ))}
              {isFetching && (
                <div ref={loadingRef}>
                  <LoadingBox data='issue 10개' />
                </div>
              )}
            </div>
            <div css={buttonBoxStyle}>
              <button
                onClick={() => hasNextPage && fetchNextPage()}
                className='load'
              >
                load
              </button>
              <button onClick={onClickReset} className='reset'>
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
