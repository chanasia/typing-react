import { useState } from "react"

export default function Simple() {
    const [count, setCount] = useState(0)
    const [title, setTitle] = useState('')

    return (
        <div className="Simple" style={{ textAlign: "center" }}>
            <button onClick={() => {
                setCount(count + 1)
                setTitle('Reack Hook')
            }}>ADD</button>
            UseState : {count}<br />
            Title : {title}
        </div>
    )
}