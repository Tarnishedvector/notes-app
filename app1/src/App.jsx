import { useEffect, useState } from 'react'
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy
} from 'firebase/firestore'

import { db } from './firebase'
import './App.css'

function App() {
  const [notes, setNotes] = useState([])
  const [text, setText] = useState('')

  useEffect(() => {
    const q = query(
      collection(db, 'notes'),
      orderBy('createdAt', 'desc')
    )

    const unsub = onSnapshot(q, (snapshot) => {
      setNotes(
        snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
      )
    })

    return () => unsub()
  }, [])

  const addNote = async (e) => {
    e.preventDefault()
    if (!text.trim()) return

    await addDoc(collection(db, 'notes'), {
      text,
      createdAt: serverTimestamp()
    })

    setText('')
  }

  const deleteNote = async (id) => {
    await deleteDoc(doc(db, 'notes', id))
  }

  return (
    <div className="App">
      <h1>📝 Notes</h1>

      <form onSubmit={addNote}>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Write a note..."
        />
        <button>Add</button>
      </form>

      <ul>
        {notes.map(note => (
          <li key={note.id}>
            {note.text}
            <button onClick={() => deleteNote(note.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App

