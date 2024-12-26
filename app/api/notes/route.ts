import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// LIRE TOUTES LES NOTES
export async function GET() {
  try {
    const notes = await prisma.note.findMany();
    return NextResponse.json(notes, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch notes' }, { status: 500 });
  }
}

// AJOUTER UNE NOTE
export async function POST(request: Request) {
  try {
    const { title, content } = await request.json();
    const newNote = await prisma.note.create({
      data: { title, content },
    });
    return NextResponse.json(newNote, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create note' }, { status: 500 });
  }
}

// MODIFIER UNE NOTE
export async function PATCH(request: Request) {
  try {
    const { id, title, content } = await request.json();
    if (!id || typeof id !== 'number') {
      return NextResponse.json({ error: 'ID is required and must be a number' }, { status: 400 });
    }

    const updatedNote = await prisma.note.update({
      where: { id },
      data: { title, content },
    });
    return NextResponse.json(updatedNote, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update note' }, { status: 500 });
  }
}

// SUPPRIMER UNE NOTE
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id || typeof id !== 'number') {
      return NextResponse.json({ error: 'ID is required and must be a number' }, { status: 400 });
    }

    const deletedNote = await prisma.note.delete({
      where: { id },
    });
    return NextResponse.json(deletedNote, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete note' }, { status: 500 });
  }
}
