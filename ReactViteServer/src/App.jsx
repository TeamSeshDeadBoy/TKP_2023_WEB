import './App.css'

function App() {
  

  return (
    <>
    <h1>Рубильник</h1>
    {localStorage.getItem('userId') ? 
        <a className='button' href="/rooms">
          Продолжить как предыдущий вход
        </a> : ""}
      <div className="card">
        <a className='button' href="/register">
          Зарегистрировать новый аккаунт
        </a>
        <a className='button' href="/login">
          Войти в существующий аккаунт
        </a>
      </div>
      <div className='footer'>
        Создано Монаховым Артемом, Лебедевым Степаном и Рыбалко Константином в рамках курсового проекта МосПолитеха 5 семестра в 2023 году.
      </div>
    </>
  )
}

export default App
