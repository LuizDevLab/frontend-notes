import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note"
import "../styles/Home.css"

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((error) => alert(error));
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}`)
      .then((res) => {
        if (res.status === 204) alert("a anotação foi deletada!");
        else alert("Falha ao deletar");
        getNotes();
      })
      .catch((error) => alert(error));
  };

  const createNote = (event) => {
    event.preventDefault();

    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) {
          alert("Anotação criada!");
        } else {
          alert("Falha ao criar a Anotação!");
          getNotes();
        }
      })
      .catch((error) => alert(error));
  };

  return (
    <div>
      <div>
        <h2>Anotações</h2>
        {notes.map((note) => (
          <Note note={note} onDelete={deleteNote} key={note.id} />
        ))}
      </div>
      <h2>Criar anotações</h2>
      <form onSubmit={createNote}>
        <label htmlFor="title">Título: </label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          required
          onChange={(event) => setTitle(event.target.value)}
          value={title}
        />
        <label htmlFor="content">Conteúdo: </label>
        <br />
        <textarea
          name="content"
          id="content"
          required
          value={content}
          onChange={(event) => setContent(event.target.value)}
        ></textarea>
        <br />
        <input type="submit" value="Criar" />
      </form>
    </div>
  );
}

export default Home;
