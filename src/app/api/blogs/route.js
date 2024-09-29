import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import * as Yup from 'yup';

const blogSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(255, 'Title can be at most 255 characters')
    .required('Title is required'),
  content: Yup.string()
    .min(10, 'Content must be at least 10 characters')
    .required('Content is required'),
  description: Yup.string()
    .min(10, 'Description must be at least 10 characters')
    .max(255, 'Description can be at most 255 characters')
    .required('Description is required'),
});

const formatYupErrors = (yupErrors) => {
  const errors = yupErrors.inner.reduce((acc, curr) => {
    if (!acc[curr.path]) {
      acc[curr.path] = curr.message;
    }
    return acc;
  }, {});

  return Object.entries(errors).map(([field, message]) => ({ field, message }));
};

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM blogs ORDER BY createdAt DESC');
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching blogs' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    try {
      await blogSchema.validate(body, { abortEarly: false });
    } catch (validationError) {
      const errors = formatYupErrors(validationError);
      return NextResponse.json({ errors }, { status: 400 });
    }

    const { title, content, description } = body;
    const [result] = await pool.query(
      'INSERT INTO blogs (title, content, description) VALUES (?, ?, ?)',
      [title, content, description]
    );

    const newBlog = {
      id: result.insertId,
      title,
      content,
      description,
      createdAt: new Date(),
    };

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating blog' }, { status: 500 });
  }
}
