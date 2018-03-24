import React, { Component } from 'react';

class UploadForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageURL: '',
            message: undefined,
            fileName: 'student'
        };
    }

    handleUploadImage = (ev) => {
        ev.preventDefault();
        const data = new FormData();
        data.append('file', this.uploadInput.files[0]);
        if (this.uploadInput.files[0]) {
            const extension = this.uploadInput.files[0].name.split('.')[1];
            console.log(typeof extension, extension, 'xlsx');
            if (extension === 'xlsx') {
                this.setState(() => ({ message: undefined }));
                data.append('filename', this.state.fileName);
                fetch('http://localhost:8000/upload', {
                    method: 'POST',
                    mode: 'no-cors',
                    body: data,
                }).then((response) => {
                    if (response) {
                        console.log('Response successfully recieved, response');
                    }
                });
            } else {
                this.setState(() => ({
                    message: 'The file is not a valid file. Please make sure you are uploading an excel file with .xlsx extension'
                }));
            }
        } else {
            this.setState(() => ({
                message: 'The file is not a valid file. Please make sure you are uploading an excel file with .xlsx extension'
            }));
        }
    }

    render() {
        return (
            <form onSubmit={this.handleUploadImage}>
                <h1>{this.state.message}</h1>
                <div>
                    <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
                </div>
                <br />
                <div>
                    <button>Upload</button>
                </div>
            </form>
        );
    }
}

export default UploadForm;
