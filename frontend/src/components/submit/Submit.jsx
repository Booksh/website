import React, { useState, useContext} from "react";
import api from '../../api';
import { redirect } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import AuthContext from "../../context/AuthContext";

function Submit() {
  const [file, setFile] = useState(null);

  let {user} = useContext(AuthContext)

  const handleFileChange = (event) => {
    //
    setFile(event.target.files[0]);
  };
  
  const navigate = useNavigate();

  let checkFileType = (file)=> {
    let file_extension = file.name.split('.').pop().toLowerCase();
    if (!['zip', 'rar', '7zip'].includes(file_extension)) {
      console.error('Invalid file type.');
      alert("Invalid file type. Please upload a .zip, .rar, or .7zip file.")
      return false;
    }
    return true;
  }

  let checkFileName = (file)=> {
    if (file.name.length > 50) {
      console.error('File name exceeds 50 characters.');
      alert("File name exceeds 50 characters.")
      return false;
    }
    return true;
  }

  let checkFileSize = (file)=> {
    // Check file size
    if (file.size > 50 * 1024 * 1024) { // 50 MB in bytes
      console.error('File size exceeds 50MB.');
      alert("File size exceeds 50MB.")
      return false;
    }
    return true;
  }

  let uploadHandler = async (e) => {
    e.preventDefault()
    const file = e.target.file.files[0]

    if (file) {
      if (!checkFileType(file) || !checkFileName(file) || !checkFileSize(file)) {
        return;
      }

      try {
        let email = e.target.email ? formData.append('email', e.target.email.value) : "" 

        let response = await api.post('/submit/upload_submission/',{
          email: email,
          submission_name: e.target.submission_name.value,
          is_logged_in: (user !== null).toString(),
          file: file
        });

        // Receives submission status and notifies user adequately
        if (response.status === 200) {
          alert("Submission sent successfully, please check your email");
        } 
      } catch (error) {
        console.log(error)
      }
    }
  };
  

  return (
    <>
    <div className='submit_container'>
      <form onSubmit={uploadHandler} method='post'>
        {!user ? (<div>
          <input
            name="email"
            type="text"
            placeholder={"Email"}/>
        </div>) : undefined } 
        <div>
          <input
            name="submission_name"
            type="text"
            placeholder={"Submission Name"}
            required/>
        </div>
        <div>
          <label>Select a File</label>
          <input
            name="file"
            type="file"
            accept=".zip,.rar,.7zip"
            onChange={handleFileChange}
          />
        </div>

        <button type="submit"> Submit solution </button>
      </form>
    </div>
</>
  );
}

export default Submit;
