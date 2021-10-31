import './Typing.scss'
import Test from './Test';
import { words as jWords } from '../../datas/words.json'
import { useEffect, useState } from 'react';

interface IState{
    words: {   
        eng: string,
        thai: string
    }[]
    currWord: {   
        eng: string,
        thai: string
    },
    typedWord: string,
    typedHistory: string[]
}

export default function Typing(){
    const [state, setState] = useState<IState>(() => {
        const words = jWords.sort(() => Math.random() - 0.5)
        return {
            words: words,
            currWord: words[0],
            typedWord: '',
            typedHistory: []
        }
    })
    // const [letters, setLetters] = useState<Element[]>([])

    const recordTyping = (e: KeyboardEvent) => {
        if(e.key === 'Tab'){
            resetTyping()
            e.preventDefault()
            return
        }
        const { words, currWord, typedWord } = state
        const currInx = words.indexOf(currWord)
        const caret = document.getElementById('caret')!
        const activeWord = document.querySelector('#active')!
        const activeEng = document.querySelectorAll('#active .eng span:not(:first-child)')!
        caret.classList.remove('blink')
        setTimeout(() => caret.classList.add('blink'), 500)
        switch(e.key){
            case ' ':
                if(typedWord === '') return
                setState((item) => {
                    activeWord.classList.add(currWord.eng !== typedWord ? 'wrong' : 'right')
                    return {
                        ...item,
                        currWord: item.words[currInx + 1],
                        typedWord: '',
                        typedHistory: [...item.typedHistory, typedWord]
                    }
                })
                break;
            case 'Backspace':
                break;
            default:
                const updateTyped = typedWord + e.key
                    setState(item => {
                    return{
                        ...item,
                        typedWord: updateTyped
                    }
                    })
                    const typeInx = typedWord.length
                    if(updateTyped.length > currWord.eng.length) return
                    activeEng[typeInx].classList.add(updateTyped[typeInx] !== currWord.eng[typeInx] ? 'wrong' : 'right')
                break;
        }
    }

    const resetTyping = () => {
        const words = jWords.sort(() => Math.random() - 0.5)
        document.querySelectorAll('.wrong, .right')!.forEach((item) => {
            item.classList.remove('wrong', 'right')
        })
        setState({
            words: words,
            currWord: words[0],
            typedWord: '',
            typedHistory: []
        })
    }

    useEffect(() => {
        document.querySelector('#active')!.scrollIntoView({behavior: 'smooth', block: 'center'})
    },[state.currWord])

    useEffect(() => {
        window.onkeydown = (e) => {
            if(e.key === 'Tab' || e.key.length === 1 || e.key === "Backspace"){
                recordTyping(e)
                e.preventDefault()
            }
    
        }
        return () => {
            window.onkeydown = null
        }
    })

    return (
        <div className="Typing">
            <Test 
                words={state.words}
                currWord={state.currWord}
                typedWord={state.typedWord}
                typedHistory={state.typedHistory}
            />
        </div>
    )
}