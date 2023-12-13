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
            setError("ЗАПОЛНИТЕ ВСЕ ПОЛЯ")
        }
        else if (pass != pass2) {
            setError("ПАРОЛИ НЕ СОВПАДАЮТ")
            if (pass.length < 8){
                setError("МИНИМУМ 8 СИМВОЛОВ")
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
                localStorage.setItem('userName', name)
                navigate("/rooms")
            }).catch((error) => {setError(error.response.data.msg)})
        } else {
            setError("Заполните все поля!")
        }
    }
  return (
    <>
    <h1>РЕГИСТРАЦИЯ</h1>
        <form className='form'>
            <input name="name" placeholder="ИМЯ" onChange={(e) => setName(e.target.value)}/>
            <input name="email" placeholder="E-MAIL" type="email"  onChange={(e) => setEmail(e.target.value)}/>
            <input name="password" placeholder="ПАРОЛЬ" type="password"  onChange={(e) => setPass(e.target.value)}/>
            {pass && pass.length >= 8 ? <>
                <input name="password2" type="password" placeholder="ПАРОЛЬ"  onChange={(e) => setPass2(e.target.value)}/>
            </> : ""}
            {error ? <div className="errortext">{error}</div> : ''}
            <button type="button"
            onClick={() => postUser()}
            >РЕГИСТРАЦИЯ</button>
            <a href="/login" className="a_to_normal">ВХОД</a>
        </form>
        <div className='footer'>СОЗДАНО РЫБАЛКО К., ЛЕБЕДЕВЫМ С., МОНАХОВЫМ А.</div>
    </>
  )
}

export default Register