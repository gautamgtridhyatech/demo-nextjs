"use client";

import { apiCall } from "@/lib/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const List = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const data = await apiCall("/api/blogs", { method: 'GET' });
        setBlogs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmDelete) return;

    const newBlogs = blogs.filter((blog) => blog.id !== id);
    setBlogs(newBlogs);

    try {
      await apiCall(`/api/blogs/${id}`, { method: 'DELETE' });
    } catch (err) {
      setBlogs(blogs);
      setError(err.message);
    }
  };

  if (loading) return <div className="alert alert-info">Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (blogs.length === 0) return <div className="alert alert-warning">No blogs found!</div>;

  return (
    <div className="row">
      {blogs.map((blog) => (
        <div className="col-md-4 d-flex align-items-stretch mb-4" key={blog?.id}>
          <div className="card text-left w-100">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">{blog?.title}</h5>
              <div>
                <Link href={`/blogs/edit/${blog?.id}`} className="btn btn-light me-2">
                  <i className="bi bi-pencil"></i>
                </Link>
                <button
                  className="btn btn-light"
                  onClick={() => handleDelete(blog?.id)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </div>
            <div className="card-body d-flex flex-column">
              <p className="card-text flex-grow-1">{blog?.description}</p>
              <div className="d-flex justify-content-between align-items-center">
                <Link href={`/blogs/show/${blog?.id}`} className="btn btn-primary">
                  Read More
                </Link>
                <span className="text-muted">
                  {new Date(blog?.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;
