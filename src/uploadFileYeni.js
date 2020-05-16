import React, { Component } from "react";
import { Image, Container, Figure, Button, ButtonGroup, ToggleButton } from "react-bootstrap";
import h1 from './h1.png';
import h2 from './h2.png';
import h3 from './h3.png';
import axios, { post } from 'axios';
import JSONPretty from 'react-json-pretty';

class ReactFileUpload extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      file:null,
      value:'',  
      rslt: []  
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }
  onFormSubmit(e){
    e.preventDefault() // Stop form submit
    this.fileUpload(this.state.file).then((response)=>{
    this.setState({rslt:response.data})   
    //console.log(response.data);
    })
  }
  onChange(e) {
    this.setState({file:e.target.files[0]})
  }
    
  handleChange(e) {
    this.setState({value:e.target.value})
  } 
    
  fileUpload(file, e){
    const url = 'http://localhost:5000/upload';
    const formData = new FormData();
    formData.append('file',file)
    formData.append('value',this.state.value)  
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return  post(url, formData,config)
  }

  render() {
    return (
      <form align="center" onSubmit={this.onFormSubmit}>
        <p align="center">Upload your user story set .txt format.</p>
        <p>File Upload</p>
        <input type="file" name="file" onChange={this.onChange} />
        <p align="center">Select a model type to generate your customized goal model.</p>       
        <p align="center">Select a heuristic type.</p>
        <label>
            <input type="radio" name="heu" value="h1" checked={this.state.value === 'h1'} onChange={this.handleChange} /> 
            Role Action <img src={h1} alt="Role-Action" width="240" height="210"/>
        </label>
        <label>
            <input type="radio" name="heu" value="h2" checked={this.state.value === 'h2'} onChange={this.handleChange} /> 
            Role Topic <img src={h2} alt="Role-Topic" width="220" height="200"/>
        </label>
        <label>
            <input type="radio" name="heu" value="h3" checked={this.state.value === 'h3'} onChange={this.handleChange} /> 
            Role <img src={h3} alt="Role" width="260" height="200"/>
        </label><br/>  
        <br/> 
        <br/> 
        <br/> 
        <button type="submit" name="submitButton">Upload</button>
        <JSONPretty id="json-pretty" data={this.state.rslt}></JSONPretty>
      </form>
   )
  }
}



export default ReactFileUpload;