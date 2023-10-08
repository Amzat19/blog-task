interface PostsState {
  postsData: postsDataType[];
  currentPage: number;
  searchTerm: string;
  postsPerPage: number;
}

interface postsDataType {
  id: number;
  title: string;
  content: string;
  timestamp: string;
}
