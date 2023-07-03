import React, { useContext, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
    const { title, description, tag, _id } = props.note;

    const context = useContext(noteContext);
    const { deleteNote, editNote } = context;

    const deleteNoteClicked = () => {
        deleteNote(_id);
    }

    const [note, setNote] = useState({title: title, description: description, tag: tag});

    const onChange = (e) => {
        setNote({...note, [e.target.id]: e.target.value});
    }

    const editSuccess = useRef(null);

    const editNoteClicked = async () => {
        let isSuccess = await editNote(_id, note.title, note.description, note.tag);
        if (isSuccess) editSuccess.current.click();
    }

    return (
        <div className='col-md-3'>
            <div className="card my-3" style={{ width: "18rem" }}>
                <div className="card-body">
                    <div className='d-flex align-items-center'>
                        <h5 className="card-title">{title}</h5>
                        <i className="fa-solid fa-trash-can mx-2" onClick={deleteNoteClicked}></i>
                        <i className="fa-solid fa-pen-to-square mx-2" data-bs-toggle="modal" data-bs-target={`#id${_id}`}></i>
                    </div>
                    <p className="card-text">{description}</p>
                </div>
            </div>
            <div className="modal fade" id={`id${_id}`} tabIndex="-1" aria-labelledby={`label${_id}`} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={`label${_id}`}>Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">Title</label>
                                    <input type="text" className="form-control" id="title" value={note.title} onChange={onChange}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">Description</label>
                                    <input type="text" className="form-control" id="description" value={note.description} onChange={onChange}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">Tag</label>
                                    <input type="text" className="form-control" id="tag" value={note.tag} onChange={onChange}/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={editSuccess} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={editNoteClicked}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoteItem