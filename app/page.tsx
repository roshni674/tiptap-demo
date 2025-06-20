// app/page.tsx
import EditorComponent from '../components/Editor'

export default function HomePage() {
  return (
    <main>
      <h1 style={{ fontSize: '24px' }}>Text Editing System </h1>
      <EditorComponent />
    </main>
  )
}
