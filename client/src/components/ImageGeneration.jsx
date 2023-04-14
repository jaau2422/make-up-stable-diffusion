import React, { useState } from "react";
import './index.css';
import {API_KEY} from './api'


const API_TOKEN = API_KEY;

const ImageGenerationForm = () => {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const input = event.target.elements.input.value;
    const response = await fetch(
      "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({ inputs: input }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to generate image");
    }

    const blob = await response.blob();
    setOutput(URL.createObjectURL(blob));
    setLoading(false);
  };

  return (<div className="container al-c mt-3">
    <img src="https://logos-world.net/wp-content/uploads/2020/04/LOreal-Logo-700x394.png" alt="loreal logo" className="resize"/>
    <h1>Creative <span> MakeUp-Look Creator</span></h1>
    <p>Create a unique makeup look</p>
    <form className="gen-form" onSubmit={handleSubmit}>
      <input type="text" name="input" placeholder="type your prompt here..." /><br></br>
      <button type="submit">Generate</button>
    </form>
    <div>
    {loading && <div className="loading">Loading...</div>}
    {!loading && output && (
      <div className="result-image">
        <img src={output} alt="art"  />
      </div>
    )}
    </div>

    </div>);
  
};

export default ImageGenerationForm;