import React from "react";
import ReactDOM from "react-dom";
import Select from "react-select";
import AsyncSelect from "react-select";
import axios from 'axios';
import "./styles.css";
import Note from "./notemodule"
let options = [];
let options1 = [];

async function getnotes(prof, classSelected) {
  let response = await axios.get('http://localhost:8080/send_data?mode=file&class=' + classSelected + '&prof=' + prof)
  let data = await response.data
  console.log(data)
  const ree = await data["file"]
  console.log(ree)
  return ree

}

async function copyOptionsForAsync(classSelected) {
  options1 = []
  let response = await axios.get('http://localhost:8080/send_data?mode=prof&class='.concat(classSelected))
  let data = await response.data;
  const ree = data["prof"]
  // console.log('data before: ', JSON.stringify(data))

  await ree.forEach(element => {
    let dropDownEle = { label: element, value: element };
    options1.push(dropDownEle);
  });
  console.log(options1)
}
function ShowNotes(props){
  const selected = props.selected
  const gotFiles = props.gotfile
  const files = props.files
  console.log(selected)
  console.log(gotFiles)
  console.log(files)
  // return <Note name='bob' link='barley'></Note>
  if(selected && gotFiles){
    return (<div className="notesContainer">
      <h1>ur files sir</h1>
      {
        files.forEach(f =>{
          <Note props={f}/>
        })
      }

    </div>)
  } else if(selected && !gotFiles){
    return <h1>Loading files...</h1>
  }else{
    return null
  }
  
}
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isSelected: false,
      isReady: false,
      allSet: false,
      option: null,
      option1: null,
      gotFile: false,
      files: []
    };
  }

  async componentDidMount() {
    let response = await axios.get('http://localhost:8080/send_data')
    console.log(response)
    const data = await response.data;
    const ree = data["classes"]

    await ree.forEach(element => {
      let dropDownEle = { label: element, value: element };
      options.push(dropDownEle);
    });
    this.setState({ isReady: true });

  }

  handleOnchange = async (option) => {
    this.setState({ gotFile: false });
    this.setState({allSet: false})
    this.setState({ option: option })
    await copyOptionsForAsync(option.label);
    this.setState({ isSelected: true });
    this.setState({ option1: '' })
    console.log('option picked is: ', this.state.option)
  };

  handleprof = async (option1) => {
    this.setState({allSet: false})
    await this.setState({ option1: option1 })
    console.log('option1 picked is: ', this.state.option1)
    this.setState({allSet: true})
    const arr = await getnotes(this.state.option1.label, this.state.option.label)
    this.setState({ files: arr })
    console.log('this is files: ', this.state.files)
    this.setState({ gotFile: true })

  }




  render() {
    return (


      <div className="App">
        {this.state.isReady ?
          <div>
            <h1>Choose class</h1>
            <AsyncSelect
              name="option"
              options={options}
              value={this.state.option}
              onChange={this.handleOnchange}

            />
          </div> :
          <h1>Loading...</h1>}

        {this.state.isSelected ?
          <div>
            <h1>Choose professor: </h1>
            <AsyncSelect
              name="options2"
              options={options1}
              value={this.state.option1}
              onChange={this.handleprof}
            />
          </div>
          : null}
        <ShowNotes selected={this.state.allSet} gotfile={this.state.gotFile} files={this.state.files} />
        {/* <Note name="joe" link="mama"/>
          <Note name="joe" link="mama"/>
          <Note name="joe" link="mama"/>
          <Note name="joe" link="mama"/> */}
      </div>
    );
  }
}

// class App1 extends React.Component {

//   render() {
//     return (
//       <div className="App">
//         <Select name="options2" options={options1} />
//       </div>
//     );
//   }
// }

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
