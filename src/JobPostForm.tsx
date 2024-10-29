import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Job {
  id: number;
  title: string;
  category: string;
  salary: number;
}

interface JobPostFormProps {
  addJob: (job: Job) => void;
}

const JobPostForm: React.FC<JobPostFormProps> = ({ addJob }) => {
  const [category, setCategory] = useState("");
  const [salary, setSalary] = useState<number | "">("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // if (salary === "" || salary <= 0 || /^0\d+/.test(salary.toString())) {
    //   alert("年収では負の値や、0で始まる数値は許可されていません。\n正しい値を入力してください。");
    //   return;
    // }    

    const newJob: Job = { id: Date.now(), category, salary: Number(salary), title };
    addJob(newJob);
    navigate("/");
  };

  return (
    <div className="my-5 mx-12">
      <h2 className="text-xl block mb-5 font-bold">求人投稿</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <div className="block mb-2">求人カテゴリ選択</div>
          <select className="border border-black rounded mb-5" value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">カテゴリを選択</option>
            <option value="事務">事務</option>
            <option value="エンジニア">エンジニア</option>
            <option value="営業">営業</option>
            <option value="デザイン">デザイン</option>
            <option value="マーケティング">マーケティング</option>
            <option value="財務・経理">財務・経理</option>
            <option value="人事">人事</option>
            <option value="カスタマーサポート">カスタマーサポート</option>
            <option value="製造">製造</option>
            <option value="医療・介護">医療・介護</option>
          </select>
        </label>

        <label>
          <div className="block mb-2">年収（万円）</div>
          <input className="border border-black rounded mb-5" type="number" value={salary} onChange={(e) => setSalary(Number(e.target.value))} required min="0" />
        </label>

        <label>
          <div className="block mb-2">求人タイトル</div>
          <input className="border border-black rounded mb-5 w-1/2" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <div>
         <button className="bg-navy text-white text-base py-2 px-16 rounded transition-colors duration-300 ease-in-out hover:bg-opacity-80" type="submit">投稿</button>
        </div>
      </form>
    </div>
  );
}

export default JobPostForm;
