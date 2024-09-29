"use client";

import React from "react";
import Edit from "@/components/blogs/edit";

const Page = ({ params }) => {
    const { id } = params;
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-left">Edit Blog</h2>
      </div>
      <Edit id={id} />
    </div>
  );
};

export default Page;
