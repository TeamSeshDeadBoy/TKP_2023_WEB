import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState(null)
    const [name, setName] = useState(null)
    const [pass, setPass] = useState(null)
    const [pass2, setPass2] = useState(null)
    const [error, setError] = useState(false)
    useEffect(() => {
        if (!email || !name || !pass){
            setError("Заполните все поля!")
        }
        else if (pass != pass2) {
            setError("Пароли не совпадают!")
            if (pass.length < 8){
                setError("Минимальная длина пароля - 8 символов")
            }
        } else {
            setError(false)
        }
    }, [email, name, pass, pass2])

    const postUser = () => {
        if (email && pass && pass2 && !error){
            setError(false)
            axios.post('http://localhost:3000/user', {name: name, email: email, password: pass2}).then((response) => {
                console.log(response)
                localStorage.setItem('userId', response.data.id)
                localStorage.setItem('userQuizzes', '[]')
                navigate("/rooms")
            }).catch((error) => {setError(error.response.data.msg)})
        } else {
            setError("Заполните все поля!")
        }
    }
  return (
    <>
    <h2>Регистрация нового аккаунта</h2>
    {name + " " + email + '\n' + pass}
        <form className='form'>
            <label>Введите имя: </label>
            <input name="name"  onChange={(e) => setName(e.target.value)}/>
            <label>Введите e-mail: </label>
            <input name="email" type="email"  onChange={(e) => setEmail(e.target.value)}/>
            <label>Введите пароль: </label>
            <input name="password" type="password"  onChange={(e) => setPass(e.target.value)}/>
            {pass && pass.length >= 8 ? <>
                <label>Повторите пароль: </label>
                <input name="password2" type="password"  onChange={(e) => setPass2(e.target.value)}/>
            </> : ""}
            {error ? <div className="errortext">{error}</div> : ''}
            <button type="button"
            onClick={() => postUser()}
            >Регистрация</button>
        </form>
        <a href="/login">Вход в существующий аккаунт</a>
    </>
  )
}

export default Register