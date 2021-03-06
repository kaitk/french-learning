import React from 'react';
import PropTypes from 'prop-types';
import readXlsxFile from 'read-excel-file';
import Dropzone from 'react-dropzone';
import { FormattedMessage } from 'react-intl';
import FileCloudUpload from 'material-ui/svg-icons/file/cloud-upload';

import { fileUploadSchema } from './FileUploadSchema.js';

const dropzoneStyle = {
  cursor: 'pointer',
  width: '100%',
  border: '2px dashed #757575',
  textAlign: 'center',
  padding: '35px'
};

class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFileUploaded: false
    };
  }

  isFileUploaded = () => this.state.isFileUploaded;

  onDrop = (acceptedFiles) => {
    this.setState({
      isFileUploaded: true
    });

    readXlsxFile(acceptedFiles[0], { schema: fileUploadSchema }).then(({ rows, errors }) => {
      this.props.handleAddWords(rows);
    });
  };

  render() {
    if (this.state.isFileUploaded) { return ''; }

    return (
      <React.Fragment>
        <Dropzone onDrop={this.onDrop} multiple={false} accept=".xlsx" >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} style={dropzoneStyle}>
              <input {...getInputProps()} />
              <div>
                <FileCloudUpload style={{ color: '#757575', width: '48px', height: '48px' }} />
                <div style={{ color: '#5e35b1' }}>
                  <b><FormattedMessage id="fileUpload.addFile" /></b>
                </div>
              </div>
            </div>
          )}
        </Dropzone>
        <div style={{ marginTop: '20px' }}>
          <a
            href="https://drive.google.com/file/d/1ANdUHYa-E202sNiSYNUCgUNrEyLZWyeO/view"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FormattedMessage id="words.add.input.file.example" />
          </a>
        </div>
      </React.Fragment>
    );
  }
}

FileUpload.propTypes = {
  chapterId: PropTypes.string.isRequired,
  addedWords: PropTypes.array.isRequired
};

export default FileUpload;
