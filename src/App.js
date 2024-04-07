import React from 'react';
import {BtnState} from "./BtnState";
import './App.css';
import Calendar from "./components/Calendar";
import TextEditor from './components/TextEditor';
import Form from './components/Form';
import Text from './components/Text';
import Time from './components/Time';


class App extends React.Component {
  state = {
    btnState: undefined
  }
  dateID = "";
  btnState =  new BtnState(1);

  componentDidMount = async  () => {
    document.querySelector('.quill').style.display = 'none';
    this.dateID = this.getDateId(new Date());
    await this.changeText();
  }

  changeText = async () => {
    document.querySelector('.quill').style.display = 'none';
    const textEl = document.querySelector('.text');
    textEl.style.display = 'block';
    let storedDate = localStorage.getItem(this.dateID);
    if (storedDate) {
      this.btnState.setEdit()
    }
    else {
      storedDate = `Нет записей на сегодня`;
      this.btnState.setAdd();
    }
    this.setState({btnState: this.btnState.value});
    textEl.innerHTML = storedDate;
  }

  changeToEdit = async () =>
  {
    const textEditorEl = document.querySelector('.ql-editor');
    textEditorEl.innerHTML = localStorage.getItem(this.dateID);
  }

  saveText = async () => {
    const textEl = document.querySelector('.text')
    const textEditorEl = document.querySelector('.ql-editor')
    textEl.innerHTML = textEditorEl.innerHTML;
    localStorage.setItem(this.dateID, textEditorEl.innerHTML);
  }
  onBtnPush = async event => {
    event.preventDefault();
    if (this.btnState.isAdd())
    {
      this.switchTextToEditor(true);
      this.btnState.setSave();
    }
    else if (this.btnState.isEdit()){
      await this.changeToEdit();
      this.switchTextToEditor(true);
      this.btnState.setSave();
    }
    else if (this.btnState.isSave()){
      await this.saveText();
      this.switchTextToEditor(false);
      this.btnState.setEdit();
    }
    this.setState({btnState: this.btnState.value});
  }

  switchTextToEditor(toEdit){
    const editorEl = document.querySelector('.quill');
    const textEl = document.querySelector('.text')
    if(toEdit){
      textEl.style.display = "none";
      editorEl.style.display = "block";
    }
    else {
      textEl.style.display = "block";
      editorEl.style.display = "none";
    }
  }

  onChangeDay = async (day, event) => {
    event.preventDefault();
    this.dateID = this.getDateId(day);
    await this.changeText();
  }

  render() {
    return (
        <div id={'app'}>
          <div id={'app-calendar'}>
            <Time id={'time'} />
            <Calendar changeDay={this.onChangeDay}/>
            <Form id={'button'}
                btnPush={this.onBtnPush}
                value={this.state.btnState}
            />
          </div>
          <div id={'app-editor'}>
            <Text />
            <TextEditor />
          </div>
        </div>
    );
  }
  getDateId = date => {
    return `id${date.getFullYear()}_${date.getMonth()+1}_${date.getDate()}`;
  }
}
export default App;