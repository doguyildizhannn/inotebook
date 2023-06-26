import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const notesInitial = [
        {
          "_id": "64973dbfee676d33c2114cc0",
          "title": "NoteToBeDeleted1",
          "description": "test test test",
          "tag": "HomeWork2",
          "userId": "64973d37ee676d33c2114cb2",
          "date": "2023-06-24T19:02:23.187Z",
          "__v": 0
        },
        {
          "_id": "64973dc3ee676d33c2114cc2",
          "title": "NoteToBeDeleted2",
          "description": "test test test",
          "tag": "HomeWork2",
          "userId": "64973d37ee676d33c2114cb2",
          "date": "2023-06-24T19:02:27.932Z",
          "__v": 0
        },
        {
            "_id": "64973dbfee676d33c2114cc0",
            "title": "NoteToBeDeleted1",
            "description": "test test test",
            "tag": "HomeWork2",
            "userId": "64973d37ee676d33c2114cb2",
            "date": "2023-06-24T19:02:23.187Z",
            "__v": 0
          },
          {
            "_id": "64973dc3ee676d33c2114cc2",
            "title": "NoteToBeDeleted2",
            "description": "test test test",
            "tag": "HomeWork2",
            "userId": "64973d37ee676d33c2114cb2",
            "date": "2023-06-24T19:02:27.932Z",
            "__v": 0
          },
          {
            "_id": "64973dbfee676d33c2114cc0",
            "title": "NoteToBeDeleted1",
            "description": "test test test",
            "tag": "HomeWork2",
            "userId": "64973d37ee676d33c2114cb2",
            "date": "2023-06-24T19:02:23.187Z",
            "__v": 0
          },
          {
            "_id": "64973dc3ee676d33c2114cc2",
            "title": "NoteToBeDeleted2",
            "description": "test test test",
            "tag": "HomeWork2",
            "userId": "64973d37ee676d33c2114cb2",
            "date": "2023-06-24T19:02:27.932Z",
            "__v": 0
          }
      ];
      const [notes, setNotes] = useState(notesInitial);
    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;