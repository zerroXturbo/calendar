import React, {useState} from 'react';
import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';

const TextEditor = () => {
    const [text, setText] = useState('');
    const handleChange = (html) => {setText(html);}
    const placeholder = "Введите ваши достижения в этот день";
    const modules = [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline','strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', ],
        ['clean']
        ]

    return (
        <div>
            <ReactQuill
                value={text}
                onChange={handleChange}
                placeholder={placeholder}
                modules={{
                    toolbar: modules
                }}
            />
        </div>
    )
}
export default TextEditor;