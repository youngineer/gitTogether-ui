import React from "react"
import { BrowserRouter, Route, Routes } from "react-router"
import Login from "./components/Login"
import Profile from "./components/Profile"
import Body from "./components/Body"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import Feed from "./components/Feed"
import Connections from "./components/Connections"
import Requests from "./components/Requests"


function App() {

  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/feed" element={<Feed />} />
              <Route path="/profile/connections" element={<Connections />} />
              <Route path="/profile/requests" element={<Requests />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
