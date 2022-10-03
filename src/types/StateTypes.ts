export interface AuthReducerState {
  user: User | null;
  loading: boolean;
  error: Error | null;
  passwordChangeRequired: boolean;
  passwordUpdated: boolean;
}

export interface LatetsNewsState {
  loading: boolean;
  error: Error | null;
  latestNews: LatestNews[];
  postLoading: boolean;
  postError: Error | null;
  postSuccess: boolean;
  myPostsLoading: boolean;
  myPostsError: Error | null;
  myPosts: LatestNews[];
  likedNews: LatestNews[];
  favNews: LatestNews[];
  likedOrFavNewsError: Error | null;
}

export interface User {
  name: string;
  email: string;
  id: string;
  lastLoggedIn: string;
  lastPasswordChanged: string;
  isDisabled: boolean;
  noOfDaysLeftToChangePassword: number;
  token: string;
  expiresIn: string;
  passwordChangeRequired: boolean;
}

export interface Error {
  message: string;
  statusCode: number;
  requestStatus: "Fail";
}

export interface LatestNews {
  _id: string;
  title: string;
  description: string;
  userId: string;
  createdDate: string;
  userPhoto: string;
  photoUrls: string[];
  likedUsers: string[];
  favUsers: string[];
}
