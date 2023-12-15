import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState(null)
    const [pass, setPass] = useState(null)
    const [error, setError] = useState(false)
    const [logged, setLogged] = useState(false)
    useEffect(() => {
        if (!email || !pass){
            setError("ЗАПОЛНИТЕ ВСЕ ПОЛЯ")
        } else if (pass.length < 8){
            setError("МИНИМУМ 8 СИМВОЛОВ")
        } else {
            setError(false)
        }
    }, [email,pass])

    useEffect(() => {
        if (logged){
            navigate("/rooms")
        }
     },[logged, navigate]);
    

    const postUser = () => {
        if (!error) {
            axios.post('http://localhost:3000/getUser', {email: email, password: pass}).then((response) => {
                localStorage.setItem('userId', response.data.id)
                localStorage.setItem('userQuizzes', [JSON.stringify(response.data.quizzes)])
                localStorage.setItem('userName', response.data.name)
                setLogged(true)
            }).catch((error) => {setError(error.response.data.msg)})
        }
    }
  return (
    <>
    <h1>ВОЙТИ</h1>
        <form className='form'>
            <input name="email" placeholder="E-MAIL" onChange={(e) => setEmail(e.target.value)}/>
            <input name="password" placeholder="ПАРОЛЬ" type="password"  onChange={(e) => setPass(e.target.value)}/>
            <div className="errortext" style={error ? {visibility: "visible"} : {}}>{error}</div>
            <button type="button" className="a"
            onClick={() => postUser()}
            >ВХОД</button>
            <a href="/register" className="a_to_normal">РЕГИСТРАЦИЯ</a>
        </form>
        <div className='footer'>СОЗДАНО РЫБАЛКО К., ЛЕБЕДЕВЫМ С., МОНАХОВЫМ А.</div>
    </>
  )
}

export default Login