interface PostsState {
  postsData: postsDataType[];
  currentPage: number;
  searchTerm: string;
  postsPerPage: number;
}

interface postsDataType {
  id: string;
  title: string;
  content: string;
  timestamp: string;
}
