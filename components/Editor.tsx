'use client'

import Placeholder from '@tiptap/extension-placeholder'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextStyle from '@tiptap/extension-text-style'
import Heading from '@tiptap/extension-heading'
import { FC, useState } from 'react'

const EditorComponent: FC = () => {
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      Placeholder.configure({
        placeholder: 'Write something...',
      }),
    ],
    content: ' ',
  })

  if (!editor) return null

  const handleSave = async () => {
    if (!editor) return

    setLoading(true)
    setMessage('')

    const content = editor.getHTML()

    try {
      const res = await fetch('/api/document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title || 'Untitled', content }),
      })

      if (res.ok) {
        setMessage('✅ Document saved successfully!')
        editor.commands.clearContent()
        setTitle('')
      } else {
        setMessage('❌ Failed to save document.')
      }
    } catch (error) {
      setMessage('❌ Error connecting to server.')
    }

    setLoading(false)
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Enter title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 mb-4"
      />

      <div className="toolbar">
        <button onClick={() => editor.chain().focus().toggleBold().run()}>
          Bold
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}>
          Italic
        </button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()}>
          Underline
        </button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
          • List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          1. List
        </button>
        <button onClick={() => editor.chain().focus().setParagraph().run()}>
          Normal
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          H1
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          H2
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          H3
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
        >
          H4
        </button>
      </div>

      <EditorContent editor={editor} />

      <button className="save-button" onClick={handleSave} disabled={loading}>
        {loading ? 'Saving...' : 'Save'}
      </button>

      {message && <p style={{ marginTop: '10px' }}>{message}</p>}
    </div>
  )
}

export default EditorComponent
