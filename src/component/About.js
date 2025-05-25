// import React, { useContext } from "react";
// import noteContext from "../context/notes/noteContext";
import React from "react"


const About = () => {
  // const a=useContext(noteContext);
  return (
    <div>

      <h1 className="my-3" style={{ textAlign: "center", width: "100%" }}>
        Welcome to iNotebook – your personal digital notebook!
      </h1>
      <div className="container my-3">
        <h4>
          iNotebook is a secure, cloud-based note-taking application that allows users to
          create, edit, organize, and access their notes from anywhere. Whether you are a
          student, a professional, or just someone who loves jotting down ideas, iNotebook
          makes note management easy and efficient.
        </h4>

        <h4 className="my-3">✨ Key Features:</h4>
        <ul>
          <li>✅ <strong>Cloud Syncing</strong> – Access your notes from any device.</li>
          <li>✅ <strong>Rich Text Editing</strong> – Format text with bold, italics, lists, and more.</li>
          <li>✅ <strong>Secure & Private</strong> – Notes are encrypted for maximum security.</li>
          <li>✅ <strong>Categorization & Tags</strong> – Organize your notes effortlessly.</li>
          <li>✅ <strong>Search Functionality</strong> – Quickly find any note.</li>
          <li>✅ <strong>Dark Mode & Custom Themes</strong> – Personalize your experience.</li>
        </ul>



      </div>

    </div>
  )
}

export default About
