import React from 'react'

const NoteItem = (props) => {
    const { title, description } = props.note;
    return (
        <div className='col-md-3'>
            <div class="card my-3" style={{ width: "18rem;" }}>
                <div class="card-body">
                    <h5 class="card-title">{title}</h5>
                    <p class="card-text">{description}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem