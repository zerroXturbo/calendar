import React from 'react';
import './App.css';
import Calendar from "./components/Calendar";
import TextEditor from './components/TextEditor';
import Save from './components/Save';
import Text from './components/Text';
import {HTMLToJSON} from "html-to-json-parser";
import {JSONToHTML} from "html-to-json-parser";

class App extends React.Component {
  dateID = "";
  componentDidMount = async  () => {
    this.dateID = this.getDateId(new Date());
    await this.onChangeText();
  }

  getDateId = date => {
    return `id${date.getFullYear()}_${date.getMonth()+1}_${date.getDate()}`;
  }

  onSaveText = async (event) => {
    event.preventDefault();

    const textEl = document.querySelector('.text')
    const textEditorEl = document.querySelector('.ql-editor');
    textEl.innerHTML += textEditorEl.innerHTML;
    const json = await  HTMLToJSON(textEl, true);
    localStorage.setItem(this.dateID, JSON.stringify(json));

    textEditorEl.innerHTML = "";
  }

  onChangeText = async () => {
    document.querySelector('.ql-editor').innerHTML = "";

    const storedDate = localStorage.getItem(this.dateID);
    let inner;
    if (storedDate) {
      const json = JSON.parse(storedDate);
      inner = await  JSONToHTML(json, false);
    }
    else {
      inner = `Нет записей на сегодня`;
    }
    document.querySelector('.text').innerHTML = inner;
  }

  onChangeDay = async (day, event) => {
    event.preventDefault();
    this.dateID = this.getDateId(day);
    await this.onChangeText();
  }

  render() {
    return (
        <div>
          <Calendar changeDay={this.onChangeDay}/>
          <Text />
          <TextEditor />
          <Save saveText={this.onSaveText} />
        </div>
    );
  }
}

export default App;