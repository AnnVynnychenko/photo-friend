export const getPosts = (state) => state.posts.posts;
export const getCommentsForPost = (state, postId) => {
  const post = state.posts.posts.find((post) => {
    return post.id === postId;
  });
  return post.comments;
};
