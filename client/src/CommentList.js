
const CommentList = ({ comments }) => {

  const renderedComments = comments.map(comment => {
    return <li key={comment.id}>{comment.content}</li>;
  });

  return <ul>{renderedComments}</ul>;
}


export default CommentList;


//! fetch comments is no longer needed because we are passing the comments as a prop from PostList because we are using Query microservice that provides the all the comments for each post
// import { useState, useEffect } from 'react';
// import axios from 'axios';


// const CommentList = ({ postId }) => {

//   const [comments, setComments] = useState([]);

//   const fetchComments = async () => {
//     const response = await axios.get(`http://localhost:4001/posts/${postId}/comments`);
//     setComments(response.data);
//   };

//   useEffect(() => {
//     fetchComments();
//   }, []);

//   const renderedComments = comments.map(comment => {
//     return <li key={comment.id}>{comment.content}</li>;
//   });

//   return <ul>{renderedComments}</ul>;
// }


// export default CommentList;