import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import JobPostForm from "./JobPostForm.tsx";
import JobList from "./JobList.tsx";
import './App1.css';

interface Job {
  id: number;
  title: string;
  category: string;
  salary: number;
}

const App1: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]); // Job型の配列として型指定

  const addJob = (job: Job) => {
    const updatedJobs = [...jobs, job];
    setJobs(updatedJobs);
  };

  return (
    <Router>
      <div>
        <header className="bg-navy p-5 flex justify-between items-center border-b-2 border-gray-200">
          <h1 className="text-2xl m-0 text-white font-bold">求人検索アプリ</h1>
          <nav className="text-lg">
            <Link className="mx-2 no-underline text-white hover:underline" to="/">求人一覧</Link> | 
            <Link className="mx-2 no-underline text-white hover:underline" to="/post">求人投稿</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<JobList jobs={jobs} />} />
          <Route path="/post" element={<JobPostForm addJob={addJob} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App1;
