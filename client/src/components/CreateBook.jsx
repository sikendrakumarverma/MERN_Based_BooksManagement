// import { Header } from "./Header";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from "react";


function Add() {

  let navigate = useNavigate();

  useEffect(() => {
   if (!localStorage.getItem('token')) {
        navigate("/login")
   }
},[])

  const [file, setFile] = useState("")
  const [title, setTitle] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [ISBN, setISBN] = useState("")
  //const [userId, setUserId] = useState("")
  const [category, setCategory] = useState("")
  const [subcategory, setSubcategory] = useState("")
  const [releasedAt, setReleasedAt] = useState("")

  let CreateBookUrl= "http://localhost:8080/books"
  let userId1= localStorage.getItem("loggedInUserId")
  //console.log(file)

  function signUp() {

    let formData = new FormData();    
    formData.append('file', file);   
    formData.append('title', title);
    formData.append('excerpt', excerpt);  
    formData.append('ISBN', ISBN);  
    formData.append('userId', userId1);  
    formData.append('category', category);  
    formData.append('subcategory', subcategory);  
    formData.append('releasedAt', releasedAt);  

    axios.post(CreateBookUrl, formData, { headers:{
        "x-api-key": localStorage.getItem("token")
    }})
      .then((response) => {
        console.log("response", response)
        alert(`success : ${response.data.message}`)
        navigate("/GetAllBooksList");
      })
      .catch((error) => {
        console.log("error :", error.response.data.message)
        alert(`Error: ${error.response.data.message}`)
      })
  }

  return (

    <>
      {/* <Header /> */}
      <h1> Create Book</h1>
      <div className="col-sm-6 offset-sm-3">
        <input type="file"  onChange={(e) => setFile(e.target.files[0])} className="form-control" placeholder="bookCover" />
        <br />
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" placeholder="title" />
        <br />
        <input type="text" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} className="form-control" placeholder="excerpt" />
        <br />
        <input type="Number" value={ISBN} onChange={(e) => setISBN(e.target.value)} className="form-control" placeholder="ISBN" />
        <br />
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="form-control" placeholder="category" />
        <br />
        <input type="text" value={subcategory} onChange={(e) => setSubcategory(e.target.value)} className="form-control" placeholder="subcategory" />
        <br />
        <input type="text" value={releasedAt} onChange={(e) => setReleasedAt(e.target.value)} className="form-control" placeholder="releasedAt" />
        <br />
        <button onClick={signUp} className="btn btn-primary">Create Book</button>

      </div>
    </>
  )
}

export default Add;