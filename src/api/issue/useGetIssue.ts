import { useInfiniteQuery, useQuery } from 'react-query';
import { xapi } from '../axiosConfig';
import { githubRepoPath } from './axiosPath';

export const useFindAllIssueList = (
  params: IIssueListDTO,
  enabled: boolean = false
) => {
  return useQuery<IIssue[]>(
    ['ƒindAllIssueList', params],
    async () => {
      const result = await xapi
        .get(`${githubRepoPath}/${params.owner}/${params.repoName}/issues`, {
          params: { ...params.param, sort: 'comments' },
        })
        .then(res => {
          return res?.data ?? [];
        })
        .catch(err => {
          console.log('err>>>', err);
          return undefined;
        });
      return result;
    },
    {
      enabled,
    }
  );
};

export const useFindAllIssueListV2 = (
  params: IIssueListDTO,
  enabled: boolean = false
) => {
  return useInfiniteQuery<IIssue[]>({
    queryKey: ['expertFavoriteItem', params],
    queryFn: async ({ pageParam }) => {
      const result = await xapi
        .get(`${githubRepoPath}/${params.owner}/${params.repoName}/issues`, {
          params: { ...params.param, sort: 'comments', page: pageParam ?? 1 },
        })
        .then(res => {
          return res?.data ?? [];
        })
        .catch(err => {
          console.log('err>>>', err);
          return undefined;
        });
      return result;
    },
    getNextPageParam: (lastPage: any, pages: any) => {
      return lastPage?.length ? pages.length + 1 : null;
    },
    enabled,
  });
};

export const useFindOneIssue = (
  params: IIssueDTO,
  enabled: boolean = false
) => {
  return useQuery<IIssue>(
    ['ƒindOneIssueDetail', params],
    async () => {
      const result = await xapi
        .get(
          `${githubRepoPath}/${params.owner}/${params.repoName}/issues/${params.issueNumber}`,
          {
            headers: {
              Accept: 'application/vnd.github.html+json',
            },
          }
        )
        .then(res => {
          return res?.data;
        })
        .catch(err => {
          console.log('err>>>', err);
          return undefined;
        });
      return result;
    },
    {
      enabled,
    }
  );
};

export interface IIssueListDTO {
  owner: string;
  repoName: string;
  param: {
    page: number;
    per_page: number;
  };
}

export interface IIssueDTO {
  owner: string;
  repoName: string;
  issueNumber: string;
}

export interface IIssue {
  active_lock_reason: any;
  assignee: any;
  assignees: any[];
  author_association: string;
  body?: string;
  body_html?: string;
  closed_at: Date | null;
  comments: number;
  comments_url: string;
  created_at: Date;
  draft: boolean;
  events_url: string;
  html_url: string;
  id: number;
  labels: {
    color: string;
    default: boolean;
    description: string;
    id: number;
    name: string;
    node_id: string;
    url: string;
  }[];
  labels_url: string;
  locked: boolean;
  milestone: any;
  node_id: string;
  number: number;
  performed_via_github_app: any;
  pull_request: {
    diff_url: string;
    html_url: string;
    merged_at: Date | null;
    patch_url: string;
    url: string;
  };
  reactions: {
    '+1': number;
    '-1': number;
    confused: number;
    eyes: number;
    heart: number;
    hooray: number;
    laugh: number;
    rocket: number;
    total_count: number;
  };
  repository_url: string;
  state: string;
  state_reason: any;
  timeline_url: string;
  title: string;
  updated_at: string;
  url: string;
  user: {
    avatar_url: string;
    events_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    gravatar_id: string;
    html_url: string;
    id: number;
    login: string;
    node_id: string;
    organizations_url: string;
    received_events_url: string;
    repos_url: string;
    site_admin: boolean;
    starred_url: string;
    subscriptions_url: string;
    type: string;
    url: string;
  };
}
