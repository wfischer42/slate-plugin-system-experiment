import { EditorComponent } from './RichEditor/RichEditor'
import './styles.css'

export default function App() {
  return (
    <div className="App w-screen h-screen flex flex-col justify-center">
      <div className="w-full h-full max-w-2xl my-12 mx-auto caret-neutral-600">
        <EditorComponent />
      </div>
    </div>
  )
}
