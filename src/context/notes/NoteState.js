import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  // const notesInitial =[]

  const [notes, setNotes] = useState([]);

  //Fetching notes 
  //Adding a note
  const fetchNote = async () => {
    // TODO: api calls 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json =await response.json();
    setNotes(json);
  }


//Adding a note
const addNote = async (title, description, tag) => {
  //api calls 
  const response = await fetch(`${host}/api/notes/addnote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem('token')
    },
    body: JSON.stringify({ title,description,tag }),
  });
  const json=await response.json();

  //We can also use this method to add notes
  // setNotes(notes.concat(json));
  // console.log(json);

  const note = {
    // "_id": "67b74f48bd6a70ff222aaa41aa",
    // "user": "678b6d0766537b459c3bec9d",
    // "title": title,
    // "description": description,
    // "tag": tag,
    // "date": "2025-02-20T15:50:32.843Z",
    // "__v": 0
    _id: json._id, 
    user: json.user,
    title: json.title,
    description: json.description,
    tag: json.tag,
    date: json.date,
    __v: 0
  }
  setNotes(notes.concat(note));
}

  //Deleting note
  const deleteNote = async (id) => {
    // API calls
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    // console.log(response.json());

    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);

  }

  //Editing note
  const editNote = async (id, title, description, tag) => {
    //API calls
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag}),
      // ...
    });
    const json =await response.json();
    console.log(json);
    
    let newNotes=JSON.parse(JSON.stringify(notes));

    //Logics to edit in clients
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote ,fetchNote}} >
      {props.children};
    </NoteContext.Provider>
  )

}
export default NoteState;










//Adding a note
  // 
//   const addNote = async (title, description, tag) => {
//     const response = await fetch(`${host}/api/notes/addnote`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc4YjZkMDc2NjUzN2I0NTljM2JlYzlkIn0sImlhdCI6MTczNzIwNjg3OH0.yLzieTTd-B1a8GqGyvSchoWjqXrzjDDsoCAnObZg2EA"
//         },
//         body: JSON.stringify({ title, description, tag }),
//     });

//     const result = await response.json();
//     // console.log("Server Response:", result);  // 🔍 Check what the server returns

//     if (response.ok) {
//         const note = {
//             "_id": result._id, // Ensure you're using the real ID from the server
//             "user": result.user,
//             "title": title,
//             "description": description,
//             "tag": tag,
//             "date": result.date,
//             "__v": 0
//         };
//         setNotes(notes.concat(note));
//     }
// };