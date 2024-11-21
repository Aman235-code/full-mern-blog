import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Header from "./components/Header";
import FooterCom from "./components/FooterCom";
import PrivateRoute from "./components/PrivateRoute";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute";
import CreatePost from "./pages/CreatePost";
import UpdatePost from "./pages/UpdatePost";
import PostPage from "./pages/PostPage";
import Search from "./pages/Search";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/about" element={<About />}></Route>
        <Route exact path="/sign-in" element={<Signin />}></Route>
        <Route exact path="/sign-up" element={<Signup />}></Route>
        <Route exact path="/search" element={<Search />}></Route>
        <Route exact element={<PrivateRoute />}>
          <Route exact path="/dashboard" element={<Dashboard />}></Route>
        </Route>

        <Route exact element={<OnlyAdminPrivateRoute />}>
          <Route exact path="/create-post" element={<CreatePost />}></Route>
          <Route
            exact
            path="/update-post/:postId"
            element={<UpdatePost />}
          ></Route>
        </Route>
        <Route exact path="/projects" element={<Projects />}></Route>
        <Route exact path="/post/:postslug" element={<PostPage />}></Route>
      </Routes>
      <FooterCom />
    </>
  );
}

export default App;
