"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiCall } from "@/lib/utils";

const Show = ({ id }) => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      setLoading(true);

      try {
        const data = await apiCall(`/api/blogs/${id}`, { method: "GET" });
        setBlog(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="alert alert-info">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning">Blog not found!</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center">
          <span
            className="bi bi-arrow-left me-3"
            style={{ cursor: "pointer" }}
            onClick={() => router.back()}
            aria-label="Go Back"
          ></span>
          <h2 className="mb-0">{blog.title}</h2>
        </div>
        <small className="text-muted">
          Created on: {new Date(blog.createdAt).toLocaleDateString()}
        </small>
      </div>
      <div dangerouslySetInnerHTML={{ __html: blog.content }} />
    </div>
  );
};

export default Show;
