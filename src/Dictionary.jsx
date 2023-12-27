import React, { useEffect, useRef, useState } from 'react'
import { FaPlay } from "react-icons/fa";

export default function Dictionary() {
  const [result,setResult] = useState([])
  const [query,setQuery] = useState('')
  const audio = useRef()
  const fetchData = async()=>{
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`)
    const data = await res.json()
    setResult(data)
    console.log(data)

  }
  const handleChange = (e)=>{
    setQuery(e.target.value)
  }
  useEffect(()=>{
    fetchData()
  },[])
  function playSound(){
    audio.current.play()
  }
  return (
    <div className='dict-container'>
      <div className='input-container'>
        <input type='text' onChange={handleChange} />
        <button onClick={fetchData}>Search</button>
      </div>
      {result.length >0 ? 
      <>
      <div className="word-container">
        <div>
          <h1>{result[0]?.word}</h1>
          <span>{result[0]?.phonetics[1]?.text}</span>
        </div>
        {result[0].phonetics[0].audio && <button className='audio-btn' onClick={playSound}>
          <FaPlay/>
          <audio ref={audio} className='audio'>
              <source src={result[0]?.phonetics[0].audio} />
            </audio>
        </button>}
      </div>
      <div className="definitions">
            {result[0]?.meanings.map((meaning, index) => (
              <div className='definition' key={index}>
                <div className="part-of-speech">
                  <p className='pos'>{meaning.partOfSpeech}</p>
                  <hr />
                </div>
                <h3 style={{color:'grey'}}>Meaning</h3>
                <ul className="meanings">
                  {meaning.definitions.map((definition, idx) => (<>
                    <li key={idx}>{definition.definition}</li>
                    {definition.example && <p style={{color:'grey'}}>'{definition.example}'</p>}
                    {definition.synonyms && <div>
                      synonyms:<div className='synonyms-container'>
                      {definition.synonyms.map(syn=>(
                        <p>{syn}</p>
                        ))}
                      </div>
                      </div>}
                    </>
                  ))}
                </ul>
                
              </div>
            ))}
          </div>
        </>
      :<>
      <h1>{result.title}</h1>
      <p>{result.message}</p>
      <p style={{color:'grey'}}>{result.resolution}</p></>}

  </div>
  );
}