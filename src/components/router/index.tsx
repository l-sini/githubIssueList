import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { GitHubIssue } from '../../page/GitHubIssue';
import { IssueDetail } from '../../page/IssueDetail';
import { GitHubIssueV2 } from '../../page/GitHubIssueV2';

interface Props {}

export const PageRouter: React.FC<Props> = () => {
  return (
    <>
      <Routes>
        <Route path='*' element={<GitHubIssue />} />
        <Route path='/' element={<GitHubIssue />}>
          <Route path=':id' element={<IssueDetail />} />
        </Route>
        <Route path='/v2' element={<GitHubIssueV2 />}>
          <Route path=':id' element={<IssueDetail />} />
        </Route>
      </Routes>
    </>
  );
};
