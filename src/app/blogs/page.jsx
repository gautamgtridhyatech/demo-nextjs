"use client";
import React from "react";
import List from "@/components/blogs/list";
import Link from "next/link";

const Page = () => {
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-left">Blogs</h2>
        <Link href="/blogs/create">
          <button className="btn btn-success">Create New Blog</button>
        </Link>
      </div>
      <List />
    </div>
  );
};

export default Page;
