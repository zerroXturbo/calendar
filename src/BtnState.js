export class BtnState {
    static addText = ["Add", "Добавить"];
    static editText = ["Edit", "Редактировать"];
    static saveText = ["Save", "Сохранить"];

    stateValue = "";
    value = "";

    constructor(lang) {
        this.lang = lang;
    }

    setAdd() {
        this.value = BtnState.addText[this.lang];
        this.stateValue = BtnState.addText[0];
    }

    setEdit() {
        this.value = BtnState.editText[this.lang];
        this.stateValue = BtnState.editText[0];
    }

    setSave() {
        this.value = BtnState.saveText[this.lang];
        this.stateValue = BtnState.saveText[0];
    }

    isAdd() {
        return this.stateValue === BtnState.addText[0];
    }

    isEdit() {
        return this.stateValue === BtnState.editText[0];
    }

    isSave() {
        return this.stateValue === BtnState.saveText[0];
    }
}