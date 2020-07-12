import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import Iframe from 'react-iframe'

//render div with title and button, button should display link underneath (pass title and embedded link)
const Note = ({name, link}) => {
    const [showNotes, setShowNotes] = useState(false)
    const toggleNotes = () => {
        setShowNotes(!showNotes)

    }
    return(
    <div>
        <h1>{name}</h1>
        <button onClick={(e) => {toggleNotes()}}>Show notes</button>
        {showNotes ?    <Iframe url={link}
                        width="450px"
                        height="450px"
                        id="myId"
                        className="myClassname"
                        display="initial"
                        position="relative" />
        :
        null}
    </div>

    )
 

}

export default Note;