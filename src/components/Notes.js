import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem';
import AddNote from './AddNote';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, getNotes } = context;

    useEffect(() => {
        getNotes();
        // eslint-disable-next-line
    }, []);

    return (
        <div className='mt-5'>
            <AddNote />
            <div className="row my-3">
                <h2>Your Notes</h2>
                <div className='container mx-2'>
                    {notes.length === 0 && 'No notes to display.'}
                </div>
                {notes.map((note) => {
                    return <NoteItem key={note._id} note={note} />;
                })}
            </div>
        </div>
    )
}

export default Notes