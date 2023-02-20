import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from "react";
import axios from 'axios';

function Delete() {
  let params = useParams();
  let id = params.id
  //console.log(id)


  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate("/login")
    }
    alert(`Are sure want to delete this id : ${id}`)
  }, [])

  axios.delete("http://localhost:8080/books/" + id, {
    headers: {
      "x-api-key": localStorage.getItem("token")
    }
  })
    .then((response) => {
      console.log("response", response)
      alert(`success : ${response.data.message}`)
      navigate("/GetAllBooksList")
    })
    .catch((error) => {
      console.log("error :", error.response.data.message)
      alert(`Error: ${error.response.data.message}`)
    })

}

export default Delete;