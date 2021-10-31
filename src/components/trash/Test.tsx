import './Test.scss'

type engAndThai = {
    eng: string
    thai: string
}

interface Props {
	words: engAndThai[],
    currWord: {   
        eng: string,
        thai: string
    }
    typedWord: string,
    typedHistory: string[]
}

export default function Test(props:Props){
    const { words, currWord, typedWord, typedHistory} = props
    const extraLetters = typedWord.slice(currWord.eng.length).split("");

    return(
        <div className="box">
            {words.map((item, i) => {
                const { eng, thai } = item
                return(
                    <div className="word" key={eng+"-"+thai+"-"+1} id={currWord.eng === eng ? 'active' : ''}>
                        <div className="thai">
                            {thai.split("").map((item, i) => {
                                return(
                                    <span key={thai+"-"+i}>
                                        {item}
                                    </span>
                                )
                            })}
                        </div>
                        <div className="eng">
                            {currWord.eng === eng ? (<span id="caret" className="blink" style={{left: typedWord.length * 14.5833}}>|</span>) : ''}
                            {eng.split("").map((item, i) => {
                                return(
                                    <span key={eng+"-"+i}>
                                        {item}
                                    </span>
                                )
                            })}
                            {currWord.eng === eng ?
                                extraLetters.map((item, i) => {
                                    return (
                                        <span key={eng+"-"+i+"e"} className="extra">
                                            {item}
                                        </span>
                                    )
                                })
                            : typedHistory[i] //เอาข้อความใน typedHistory มาทำไปตัวแดง
                            ? typedHistory[i]
                                .slice(words[i].eng.length)
                                .split('')
                                .map((item, i) => {
                                    return(
                                        <span key={eng+"-"+i+"e"} className="wrong extra">
                                            {item}
                                        </span>
                                    )
                                })
                            : null
                            }
                        </div>
                    </div>
                )
            })}
        </div>
    )
}