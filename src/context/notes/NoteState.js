import { useState, useContext } from "react";
import NoteContext from "./noteContext";
import AlertContext from '../alert/alertContext';
import cloneDeep from 'lodash/cloneDeep';
import UserContext from "../user/userContext";

const NoteState = (props) => {
    const host = "http://localhost:3000";
    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);

    const ctx = useContext(AlertContext);
    const { setAlertMessage } = ctx;

    const usrCntxt = useContext(UserContext);
    const { user } = usrCntxt;

    // Get all notes
    const getNotes = async () => {
        try {
            const url = `${host}/api/notes/fetchallnotes`;
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": user.authToken
                }
            });
            const responseData = await response.json();

            if (responseData.success) {
                setNotes(responseData.notes);
            }
            else {
                if (Object.prototype.toString.call(responseData.message) === '[object Array]') {
                    let totalMsg = [];
                    for (let index = 0; index < responseData.message.length; index++) {
                        totalMsg.push(responseData.message[index].msg);
                    }
                    setAlertMessage(totalMsg, 'warning');
                }
                else if (Object.prototype.toString.call(responseData.message) === '[object String]') {
                    setAlertMessage([responseData.message], 'warning');
                }
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }

    // Add a note
    const addNote = async (title, description, tag) => {
        try {
            let note = {
                "title": title,
                "description": description,
                "tag": tag
            };
            const url = `${host}/api/notes/addnote`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": user.authToken
                },
                body: JSON.stringify({ note })
            });
            const responseData = await response.json();

            if (responseData.success) {
                setAlertMessage(["Note added successfully."], "success");
                setNotes(notes.concat(responseData.note));
            }
            else {
                if (Object.prototype.toString.call(responseData.message) === '[object Array]') {
                    let totalMsg = [];
                    for (let index = 0; index < responseData.message.length; index++) {
                        totalMsg.push(responseData.message[index].msg);
                    }
                    setAlertMessage(totalMsg, "warning");
                }
                else if (Object.prototype.toString.call(responseData.message) === '[object String]') {
                    setAlertMessage([responseData.message], "warning");
                }
            }
            return responseData.success;
        }
        catch (err) {
            console.log(err.message);
        }
    }

    // Delete a note
    const deleteNote = async (id) => {
        try {
            const url = `${host}/api/notes/deletenote/${id}`;
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": user.authToken
                }
            });
            const responseData = await response.json();

            if (responseData.success) {
                setAlertMessage(["Note deleted."], "success");
                setNotes(notes.filter(note => note._id !== id));
            }
            else {
                if (Object.prototype.toString.call(responseData.message) === '[object Array]') {
                    let totalMsg = [];
                    for (let index = 0; index < responseData.message.length; index++) {
                        totalMsg.push(responseData.message[index].msg);
                    }
                    setAlertMessage(totalMsg, "warning");
                }
                else if (Object.prototype.toString.call(responseData.message) === '[object String]') {
                    setAlertMessage([responseData.message], "warning");
                }
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }

    // Edit a note
    const editNote = async (id, title, description, tag) => {
        try {
            let note = {
                "title": title,
                "description": description,
                "tag": tag
            };
            const url = `${host}/api/notes/updatenote/${id}`;
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": user.authToken
                },
                body: JSON.stringify({ note })
            });
            const responseData = await response.json();

            if (responseData.success) {
                let newNotes = cloneDeep(notes);
                for (let index = 0; index < notes.length; index++) {
                    const element = notes[index];
                    if (element._id === id) {
                        element.title = title;
                        element.description = description;
                        element.tag = tag;
                        newNotes.splice(index, 1, element)
                        break;
                    }
                }
                setAlertMessage(["Note updated successfully."], "success");
                setNotes(newNotes);
            }
            else {
                if (Object.prototype.toString.call(responseData.message) === '[object Array]') {
                    let totalMsg = [];
                    for (let index = 0; index < responseData.message.length; index++) {
                        totalMsg.push(responseData.message[index].msg);
                    }
                    setAlertMessage(totalMsg, "warning");
                }
                else if (Object.prototype.toString.call(responseData.message) === '[object String]') {
                    setAlertMessage([responseData.message], "warning");
                }
            }
            return responseData.success;
        }
        catch (err) {
            console.log(err.message);
        }
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;