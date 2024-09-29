"use client";

import React from "react";
import Create from "@/components/blogs/create";

const Page = () => {
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-left">Create New Blog</h2>
      </div>
      <Create />
    </div>
  );
};

export default Page;
