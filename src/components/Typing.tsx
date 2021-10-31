import { useState, useEffect } from "react"
import { words as jsonWord } from '../datas/words.json'
import Test from "./Test"
import './Typing.scss'

interface IWords{
    eng: string;
    thai: string;
}

interface IState{
    currWord: IWords,
    typedWord: string,
    key: string,
    typeHistory: string[]
}

export default function Typing(){
    const [words, setWords] = useState<IWords[]>([...jsonWord].sort(() => Math.random() - 0.5))
    const [state, setState] = useState<IState>({
        currWord: words[0],
        typedWord: '',
        key: '',
        typeHistory: []
    })
    // const { typedWord, currWord, typeHistory, key } = state
    // const currInx = words.indexOf(currWord)

    const recordTyping = (e: KeyboardEvent) => {
        if(e.key === 'Tab') {
            resetTyping()
            return
        }
        const { typedWord, currWord, typeHistory } = state
        const currInx = words.indexOf(currWord)
        const caret = document.getElementById('caret')!
        caret.classList.remove('blink')
        setTimeout(() => { caret.classList.add('blink') }, 500)
        switch(e.key){
            case ' ':
                if(typedWord === '') return
                setState({
                    currWord: words[currInx + 1],
                    typedWord: '',
                    key: e.key, // event keyboard
                    typeHistory: [...typeHistory, typedWord]
                })
                break
            case 'Backspace':
                if(currInx - 1 === -1) return
                if( typedWord.length === 0 && typeHistory[currInx - 1] !== words[currInx - 1].eng){
                    // setState({
                    //     currWord: words[currInx - 1],
                    //     typedWord: !e.ctrlKey ? typeHistory[currInx - 1] : '',
                    //     typeHistory: typeHistory.splice(0, typeHistory.length - 1)
                    // })
                    // const prevActive = document.getElementById('active')!
                    // console.log(prevActive, document.getElementById('active')!)
                    // prevActive.classList.remove('wrong', 'right')
                    // if (e.ctrlKey) {
                    //     const chilePrevActive = prevActive.querySelectorAll('.eng span:not(#caret)')!
					// 	chilePrevActive.forEach(item => {
                    //         console.log(item)
                    //         if (item instanceof HTMLSpanElement)
                    //             item.classList.remove("wrong", "right");
					// 	});
					// }
                }
                break
            default:
                setState(item => {
                    return{
                        ...item,
                        currWord: words[currInx],
                        typedWord: typedWord + e.key,
                        key: e.key
                    }
                })
        }
    }

    const resetTyping = () => {
        document
			.querySelectorAll(".wrong, .right")
			.forEach((el) => el.classList.remove("wrong", "right"));
        const words = [...jsonWord].sort(() => Math.random() - 0.5)
        setWords(words)
        setState({
            currWord: words[0],
            typedWord: '',
            key: '',
            typeHistory: []
        })
    }

    useEffect(() => { // update class 
        const { typedWord, currWord, typeHistory, key } = state
        const currInx = words.indexOf(currWord)
        switch(key){
            case ' ':
                const active = document.getElementById('active')!
                const prevActive = active.previousElementSibling
                if(prevActive) {
                    prevActive.classList.add(words[currInx - 1].eng !== typeHistory[currInx - 1] ? 'wrong' : 'right')
                    active.scrollIntoView({ behavior: "smooth", block: "center" });
                }
                break
            case 'Backspace':
                break
            default:
                if(key.length !== 1) return
                const activeEng = document.querySelectorAll('#active .eng span:not(#caret)')!
                const typedInx = typedWord.length - 1
                activeEng[typedInx].classList.add(currWord.eng[typedInx] !== typedWord[typedInx] ? 'wrong' : 'right')
        }
        return
    })

    useEffect(() => {
        document.getElementById('active')!.scrollIntoView({ behavior: "smooth", block: "center" });
        window.onkeydown = (e) => {
            if( e.key === 'Tab' || 
                e.key.length === 1 || 
                e.key === "Backspace"
            ){
                recordTyping(e)
                e.preventDefault()
            }
        }
        //!!!!!
        return () => {
            window.onkeydown = null
        }
    })

    return (
        <div className="Typing">
            <Test
                words={words}
                currWord={state.currWord}
                typedWord={state.typedWord}
                typeHistory={state.typeHistory}
            />
        </div>
    )
}