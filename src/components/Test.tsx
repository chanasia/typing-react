import './Test.scss'

interface Props{
    words:{
        eng: string;
        thai: string;
    }[],
    currWord: {
        eng: string,
        thai: string
    },
    typedWord: string,
    typeHistory: string[]
}

export default function Test(props: Props){
    const { words, currWord, typedWord, typeHistory } = props
    const extraLetters = typedWord.slice(currWord.eng.length).split("");

    return(
        <div className="box">
        {words.map((item, i) => {
            const { eng } = item
            return(
                <div className="word" key={'w-' + eng + '-' + i} id={currWord === item ? 'active' : ''}>
                    <div className="eng" key={'e-' + eng + '-' + i}>
                        {currWord === item ? (<span className="blink" id="caret" style={{left: (typedWord.length) * 13.45}}></span>) : ''}
                        {eng.split('').map((item, i) => {
                            return (
                                <span key={'l-'+ eng + '-' + i}>{item}</span>
                            )
                        })}
                        {currWord === item ? extraLetters.map((item, i) => {
                            return (
                                <span key={'ex-'+ eng + '-' + i} className="extra">{item}</span>
                            )
                        })
                        : typeHistory[i] ? typeHistory[i]
                            .slice(words[i].eng.length)
                            .split('')
                            .map((item, i) => {
                                return(
                                    <span key={'ex-'+ eng + '-' + i } className="wrong extra">{item}</span>
                                )
                            })
                        : null}
                    </div>
                    <span key={'s-' + eng + '-' + (item.eng.length + 1)} className="space"></span>
                </div>
            )
        })}
        </div>
    )
}