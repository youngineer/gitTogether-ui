import React from "react"
import { BrowserRouter, Route, Routes } from "react-router"
import Login from "./components/Login"
import Profile from "./components/Profile"
import Body from "./components/Body"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import Feed from "./components/Feed"


function App() {

  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="login" element={<Login />} />
              <Route path="profile" element={<Profile />} />
              <Route path="feed" element={<Feed />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
