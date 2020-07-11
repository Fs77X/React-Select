import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";

//render div with title and button, button should display link underneath (pass title and embedded link)
const Note = (props) => {
    const name = props[0]
    const link = props[1]
    return(
    <div>
        <h1>joe</h1>
        {/* <button>{link}</button> */}
    </div>

    )
 

}

export default Note;