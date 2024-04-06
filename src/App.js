import React from 'react';
import './App.css';
import Calendar from "./components/Calendar";
import TextEditor from './components/TextEditor';
import ButtonEditor from './components/Button';
import Text from './components/Text';

class App extends React.Component {
  dateID = "";
  editor = "Add";
  button = null;

  componentDidMount = async  () => {
    document.querySelector('.quill').style.display = 'none';
    document.querySelector('.text').style.display = 'none';

    this.dateID = this.getDateId(new Date());
    await this.onChangeText();
  }

  getDateId = date => {
    return `id${date.getFullYear()}_${date.getMonth()+1}_${date.getDate()}`;
  }

  onChangeText = async () => {
    document.querySelector('.ql-editor').innerHTML = "";
    const storedDate = localStorage.getItem(this.dateID);
    let inner;
    if (storedDate) {
      inner = storedDate;
      this.editor = "Edit";
    }
    else {
      inner = ``;
      this.editor = "Add";
    }
    document.querySelector('.text').innerHTML = inner;
    if (this.button === null)
      this.button = document.querySelector('#buttonEditor');
    this.button.textContent = this.editor;
  }

  saveText = async () => {
    const textEl = document.querySelector('.text')
    if (textEl) localStorage.setItem(this.dateID, textEl.innerHTML);
  }

  onChangeEditor = async (event) => {
    event.preventDefault();
    await this.saveText();
    const textEditorEl = document.querySelector('.ql-editor');
    const editorEl = document.querySelector('.quill');
    const textEl = document.querySelector('.text');
    if (this.editor === "Add") {
      editorEl.style.display = "block";
      document.querySelector('#no-data').style.display = "none";
      this.editor = "Save";
    }
    else if (this.editor === "Edit") {
      textEditorEl.innerHTML = textEl.innerHTML;
      textEl.style.display = "none";
      editorEl.style.display = "block";
      this.editor = "Save";
    }
    else if (this.editor === "Save") {
      textEl.innerHTML = textEditorEl.innerHTML;
      editorEl.style.display = "none";
      textEl.style.display = "block";
      this.editor = "Edit";
    }
    if (this.button === null)
      this.button = document.querySelector('#buttonEditor');
    this.button.textContent = this.editor;
  }

  onChangeDay = async (day, event) => {
    event.preventDefault();
    await this.saveText();
    this.dateID = this.getDateId(day);
    await this.onChangeText();
  }

  render() {
    return (
        <div id='app'>
          <div id={'app-calendar'}>
            <div id={'settings'}>Настройки / time</div>
            <Calendar id={'calendar'} changeDay={this.onChangeDay}/>
            <ButtonEditor buttonSave={this.onChangeEditor} value={this.editor}/>
          </div>
          <div id={'app-editor'}>
            <Text state={this.editor}/>
            <TextEditor state={this.editor}/>
            <span id={"no-data"}>{this.editor === "Add" && "Нет записей на сегодня"}</span>
          </div>
        </div>
    );
  }
}

export default App;