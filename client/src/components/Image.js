import React from "react"
import {ColorExtractor} from "react-color-extractor"

export const Image = props =>
props.error ? (
    <div className="error-message">
        an error occured
    </div>
) : (
    <div className="image-container">
        <ColorExtractor getColors={props.getColors} onError={props.onError}>
            <img src={props.image}/>
        </ColorExtractor>
    </div>
)