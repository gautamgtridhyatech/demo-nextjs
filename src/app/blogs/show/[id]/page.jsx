"use client";

import React from "react";
import Show from "@/components/blogs/show";

const Page = ({ params }) => {
  const { id } = params;
  return (
    <div className="container mt-4">
      <Show id={id} />
    </div>
  );
};

export default Page;
