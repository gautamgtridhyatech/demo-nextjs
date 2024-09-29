"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiCall } from "@/lib/utils";

const Edit = ({ id }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await apiCall(`/api/blogs/${id}`, { method: "GET" });
        setTitle(data.title);
        setDescription(data.description);
        setContent(data.content);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!title.trim() || !description.trim() || !content.trim()) {
      setError("Title, description, and content are required.");
      return;
    }

    const updatedBlog = { title, description, content };

    try {
      await apiCall(`/api/blogs/${id}`, {
        method: "PUT",
        body: updatedBlog,
      });
      router.push("/blogs");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    if (loading) return <div className="alert alert-info">Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          id="description"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="content" className="form-label">
          Content
        </label>
        <textarea
          className="form-control"
          id="content"
          rows="5"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary">
        Update
      </button>
    </form>
  );
};

export default Edit;
