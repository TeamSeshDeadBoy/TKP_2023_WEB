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
            setError("Заполните все поля !")
        } else if (pass.length < 8){
            setError("Минимальная длина пароля - 8 символов")
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
    <h2>Выполните вход в ваш профиль</h2>
        <form className='form'>
            <label>Введите e-mail: </label>
            <input name="email"  onChange={(e) => setEmail(e.target.value)}/>
            <label>Введите пароль: </label>
            <input name="password" type="password"  onChange={(e) => setPass(e.target.value)}/>
            {error ? <div className="errortext">{error}</div> : ''}
            <button type="button"
            onClick={() => postUser()}
            >Вход</button>
        </form>
        <a href="/register">Регистрация нового аккаунта</a>
    </>
  )
}

export default Login