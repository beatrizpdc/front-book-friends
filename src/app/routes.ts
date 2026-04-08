import { createBrowserRouter } from "react-router";
import Home from "./components/Home";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import ProfileSettings from "./components/ProfileSettings";
import BookDetail from "./components/BookDetail";
import AddBook from "./components/AddBook";
import Matches from "./components/Matches";
import Messages from "./components/Messages";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Root from "./components/Root";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    Component: ProtectedRoute,
    children: [
      {
        path: "/",
        Component: Root,
        children: [
          { index: true, Component: Home },
          { path: "feed", Component: Feed },
          { path: "profile/:userId?", Component: Profile },
          { path: "profile-settings", Component: ProfileSettings },
          { path: "book/:bookId", Component: BookDetail },
          { path: "add-book", Component: AddBook },
          { path: "matches", Component: Matches },
          { path: "messages/:conversationId?", Component: Messages },
        ],
      },
    ],
  },
]);
