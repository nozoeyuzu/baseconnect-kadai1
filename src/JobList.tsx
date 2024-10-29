import React, { useState } from "react";
import Pagination from "./Pagination.tsx";

interface Job {
  id: number;
  title: string;
  category: string;
  salary: number;
}

interface SidebarProps {
  handleCategoryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  minSalary: string;
  handleMinSalaryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface JobCardProps {
  job: Job;
}

interface JobListProps {
  jobs: Job[];
}

const Sidebar: React.FC<SidebarProps> = ({ handleCategoryChange, minSalary, handleMinSalaryChange }) => {
  const categories = ["事務", "エンジニア", "営業", "デザイン", "マーケティング", "財務・経理", "人事", "カスタマーサポート", "製造", "医療・介護"];
  return (
    <aside className="mr-5 w-64 bg-gray-100 p-5 border-r-2 border-gray-200 flex-shrink-0">
      <h3 className="text-lg mb-2 font-bold">求人カテゴリ</h3>
      {categories.map((category, index) => (
        <div key={index}>
          <label>
            <input type="checkbox" value={category} onChange={handleCategoryChange} />
            {category}
          </label>
        </div>
      ))}
      <h3 className="text-lg mb-2 font-bold">年収</h3>
      <div>
        <label>
          <input className="border border-black rounded" type="number" value={minSalary} onChange={handleMinSalaryChange} placeholder="〇〇万円以上" min="0" />
        </label>
      </div>
    </aside>
  );
};

const JobCard: React.FC<JobCardProps> = ({ job }) => (
  <div className="border border-gray-300 rounded-lg p-4 mb-5 bg-white">
    <div className="text-lg font-bold mb-2">{job.title}</div>
    <div className="text-sm mb-2">カテゴリ: {job.category}</div>
    <div className="text-sm mb-2">年収: {job.salary}万円</div>
  </div>
);

const JobList: React.FC<JobListProps> = ({ jobs }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minSalary, setMinSalary] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const category = event.target.value;
    setSelectedCategories(event.target.checked ? [...selectedCategories, category] : selectedCategories.filter((c) => c !== category));
  };

  const handleMinSalaryChange = (event: React.ChangeEvent<HTMLInputElement>) => setMinSalary(event.target.value);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const filteredJobs = jobs.filter((job) => {
    const salary = parseInt(job.salary.toString(), 10);
    const min = minSalary ? parseInt(minSalary, 10) : -Infinity;
    return (selectedCategories.length === 0 || selectedCategories.includes(job.category)) && salary >= min;
  });

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  return (
    <div className="flex min-h-screen" style={{ display: "flex" }}>
      <Sidebar handleCategoryChange={handleCategoryChange} minSalary={minSalary} handleMinSalaryChange={handleMinSalaryChange} />
      <div className="flex-grow p-5">
        <h2 className="text-xl block font-bold">求人一覧</h2>
        <p className="mb-5">該当件数: {filteredJobs.length}件</p>
        {currentJobs.length > 0 ? currentJobs.map((job) => <JobCard key={job.id} job={job} />) : <p>該当する求人情報がありません</p>}
        <Pagination jobsPerPage={jobsPerPage} totalJobs={filteredJobs.length} paginate={paginate} currentPage={currentPage} />
      </div>
    </div>
  );
}

export default JobList;
