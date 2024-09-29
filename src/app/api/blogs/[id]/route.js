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
});

const getFirstErrorPerField = (yupError) => {
  return yupError.inner.reduce((acc, curr) => {
    if (!acc[curr.path]) acc[curr.path] = curr.message;
    return acc;
  }, {});
};

export async function GET(req, { params }) {
  try {
    const [rows] = await pool.query('SELECT * FROM blogs WHERE id = ?', [params.id]);

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching blog' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const body = await req.json();

    try {
      await blogSchema.validate(body, { abortEarly: false });
    } catch (validationError) {
      const firstErrors = getFirstErrorPerField(validationError);
      return NextResponse.json({ errors: firstErrors }, { status: 400 });
    }

    const { title, content } = body;
    await pool.query('UPDATE blogs SET title = ?, content = ? WHERE id = ?', [title, content, params.id]);

    return NextResponse.json({ message: 'Blog updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Error updating blog' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const [rows] = await pool.query('SELECT * FROM blogs WHERE id = ?', [params.id]);

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    await pool.query('DELETE FROM blogs WHERE id = ?', [params.id]);
    return NextResponse.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting blog' }, { status: 500 });
  }
}
