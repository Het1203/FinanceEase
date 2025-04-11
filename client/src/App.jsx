import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './components/Landing';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './layouts/Dashboard';
import Home from './components/Home';
import Budget from './components/Budget';
import Investments from './components/Investments';
import Goals from './components/Goals';
import Profile from './components/Profile';
import Blogs from './components/Blogs';
import ExpertRegister from "./components/ExpertRegister";
import ExpertDashboard from './layouts/ExpertDashboard';
import ExpertProfile from './components/ExpertProfile';
import YourBlogs from './components/YourBlogs';
import AllBlogs from './components/AllBlogs';
import Connect from './components/Connect';
import SearchResults from './layouts/SearchResults';
import { Navigate } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/expert-register" element={<ExpertRegister />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="budget" element={<Budget />} />
          <Route path="investments" element={<Investments />} />
          <Route path="goals" element={<Goals />} />
          <Route path="profile" element={<Profile />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="search" element={<SearchResults />} />
        </Route>
        <Route path="/expert" element={<ExpertDashboard />}>
          <Route index element={<Navigate to="expert/profile" replace />} />
          <Route path="profile" element={<ExpertProfile />} />
          <Route path="your-blogs" element={<YourBlogs />} />
          <Route path="all-blogs" element={<AllBlogs />} />
          <Route path="connect" element={<Connect />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;