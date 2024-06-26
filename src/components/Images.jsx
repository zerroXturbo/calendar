import React, {useState} from 'react';
import Popup from "reactjs-popup";
import './Images.css'

const Images = (props) => {
    const [, setDate] = useState(new Date());
    const [files] = useState([]);
    const [names] = useState([]);

    React.useEffect(() => {
        console.log('test')
        const namesStorage = localStorage.getItem(props.date);
        names.length = 0;
        files.length = 0;
        if (!namesStorage) {return;}
        const namesArray = namesStorage.split(' ');
        namesArray.forEach(name => {
            names.push(name);
            files.push(localStorage.getItem(name));
        });
    })

    const handleChange = (event) => {
        console.log('handleChange')
        event.preventDefault();
        const file = event.target.files[0];
        if (!file) return
        const url = URL.createObjectURL(file);
        files.push(url);
        save(file);
        setDate(new Date());
    }

    const save = (file) => {
        const name = props.date + "_" + files.length;
        getBase64(file).then(base64 => {
            localStorage[name] = base64;
            console.debug("file stored",base64);
        });
        let names = localStorage.getItem(props.date);
        if (names)
            names += (" " + name);
        else
            names = name;
        localStorage.setItem(props.date, names);
    }

    const getBase64 = (file) => {
        return new Promise((resolve,reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });
    }

    return (
        <div id="img-container">
            {files.map((file, i) => (
                <Popup
                    key={i}
                    trigger={<button className="button-img">
                        <img className="image" src={file} alt="N/A"/>
                    </button>}
                    position="bottom left">
                    <div>
                        <img className="image-popup" src={file} alt="N/A"/>
                    </div>
                </Popup>
            ))}

            <label htmlFor="file-upload" className="custom-file-upload">
                <svg width="20" height="29" viewBox="0 0 20 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path // ну svg ну и что
                        d="M12.3532 23.5806C11.2681 25.5667 9.85975 26.9836 8.12798
                         27.8314C6.39621 28.6792 4.82813 28.7195 3.42373 27.9522C2.01934
                         27.185 1.20606 25.8437 0.983886 23.9283C0.761715 22.013 1.19314
                         20.0623 2.27817 18.0763L9.70822 4.47646C10.4866 3.05171 11.5117
                         2.02802 12.7835 1.40541C14.0552 0.782785 15.1949 0.746692 16.2024
                         1.29712C17.2099 1.84755 17.7952 2.82605 17.9583 4.23262C18.1215
                         5.63918 17.8139 7.05484 17.0355 8.47959L10.3131 20.7842C9.81773
                         21.6909 9.17771 22.3363 8.393 22.7205C7.60829 23.1046 6.89537
                         23.1216 6.25423 22.7713C5.6131 22.421 5.24219 21.812 5.14152
                         20.9441C5.04085 20.0762 5.23818 19.1889 5.73352 18.2823L12.456
                         5.97763L13.8298 6.72822L7.10738 19.0329C6.90689 19.3998 6.82657
                         19.7551 6.86642 20.0987C6.90641 20.4434 7.05616 20.6867 7.31567
                         20.8285C7.57518 20.9703 7.86048 20.9647 8.17159 20.8117C8.48284
                         20.66 8.73871 20.4006 8.9392 20.0337L15.6616 7.729C16.157 6.82235
                         16.3543 5.93508 16.2536 5.0672C16.153 4.19931 15.7821 3.59023
                         15.1409 3.23996C14.4998 2.88969 13.7869 2.90664 13.0022
                         3.29081C12.2174 3.67498 11.5774 4.32039 11.0821 5.22705L3.65203
                         18.8269C2.87364 20.2517 2.56603 21.6673 2.72919 23.0739C2.89234
                         24.4805 3.47767 25.459 4.48517 26.0094C5.49267 26.5598 6.63231
                         26.5237 7.90407 25.9011C9.17584 25.2785 10.2009 24.2548 10.9793
                         22.8301L18.4094 9.23018L19.7832 9.98077L12.3532 23.5806Z"
                        fill="white"/>
                </svg>
            </label>
            <input
                id="file-upload"
                type="file"
                onChange={handleChange}
                accept="image/png, image/jpeg"
            />
        </div>
    );
}
export default Images;