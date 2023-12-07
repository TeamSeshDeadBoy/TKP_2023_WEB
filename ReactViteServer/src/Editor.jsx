// import { useLoaderData } from "react-router-dom"
import './Editor.css'
import QuestionEdit from './CreatorComponents/QuestionEdit.jsx'
import { useState } from "react";
import QuestionWrapper from './CreatorComponents/QuestionWrapper.jsx';

const Editor = () => {
    // const roomID = useLoaderData().data.id;
    const tempd = [{"text":"1","answers":[{"text":"true","valid":true},{"text":"false","valid":false}],"validIndex":0},{"text":"2","answers":[{"text":"false","valid":false},{"text":"true","valid":false}],"validIndex":1},{"text":"3","answers":[{"text":"false","valid":false},{"text":"false","valid":false},{"text":"true","valid":false}],"validIndex":2},{"text":"4","answers":[{"text":"false","valid":false},{"text":"false","valid":false},{"text":"false","valid":false},{"text":"true","valid":true}],"validIndex":3}]
    
    const [data, setData] = useState(tempd);

    const childToParent = (childdata) => {
      if (childdata) { 
        setData([...data, childdata]);
      }
    }

    const changeFromChild = (childdata) => {
      console.log('changing from child')
      setData([...childdata]);
    };


  return (
  <>
    <div className="room">
        <h2>Создайте новую викторину</h2>
        <code>{JSON.stringify(data)}</code>
        <div className='main'>
          <div className="questions">
            <QuestionWrapper data={data} key={data} change={changeFromChild}/>
          </div>
          <div className="questionedit">
            <QuestionEdit childToParent={childToParent}/>
          </div>
        </div>
    </div>
  </>
  )
}

export default Editor