export interface User {
  username: string;
  id: string;
}
export interface AuthInterface {
  access?: string;
  user?: User;
}

export interface ProfileInterface {
  likedProblems: string[];
  dislikedProblems: string[];
  starredProblems: string[];
  solvedProblems: string[];
}
