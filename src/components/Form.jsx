import { useState } from "react";
import api from "../api"
import {useNavigate} from "react-router-dom"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

function Form(routess, method) {
  const [userName, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return <form onSubmit={handleSubmit} className="form-container">
    <h1>{method === "login" ? "Login": "Register"}</h1>
  </form>
}