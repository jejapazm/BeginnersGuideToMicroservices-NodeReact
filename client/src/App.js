import PostCreate from "./PostCreate";
import PostList from "./PostList";

const App = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="tab-pane">
          <div className="card cardHover">
            <div className="card-body">
              <h1>Create Post</h1>
              <PostCreate />
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="tab-pane">
          <div className="card cardHover">
            <div className="card-body">
              <h1>Posts</h1>
              <PostList />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;