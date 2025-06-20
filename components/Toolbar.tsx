import React from 'react'
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Pilcrow,
  List,
  ListOrdered,
  TextCursorInput,
} from 'lucide-react'

type Props = {
  editor: any
}

const Toolbar: React.FC<Props> = ({ editor }) => {
  if (!editor) return null

  const getClass = (type: string, options?: any) =>
    editor.isActive(type, options) ? 'button active' : 'button'

  return (
    <div className="toolbar">
      {/* Headings & Paragraph */}
      <button className={getClass('paragraph')} onClick={() => editor.chain().focus().setParagraph().run()}>
        <Pilcrow size={18} />
      </button>
      <button className={getClass('heading', { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
        <Heading1 size={18} />
      </button>
      <button className={getClass('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
        <Heading2 size={18} />
      </button>

      {/* Text styles */}
      <button className={getClass('bold')} onClick={() => editor.chain().focus().toggleBold().run()}>
        <Bold size={18} />
      </button>
      <button className={getClass('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}>
        <Italic size={18} />
      </button>
      <button className={getClass('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()}>
        <TextCursorInput size={18} />
      </button>

      {/* Lists */}
      <button className={getClass('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()}>
        <List size={18} />
      </button>
      <button className={getClass('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        <ListOrdered size={18} />
      </button>
    </div>
  )
}

export default Toolbar
