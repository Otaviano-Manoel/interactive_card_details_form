import React, { useEffect, useRef, useState } from 'react';
import { ICardInfo, defaultICardInfo } from '../Interfaces/ICardInfo';
import { defaultCardValidationState, ICardValidationState } from '../Interfaces/ICardValidationState';
import { Routes, Route, useNavigate } from 'react-router-dom';
import CardDisplay from './CardDisplay';
import CardForm from './CardForm';
import ThankYou from './ThankYou';
import '../css/globals.css'
import './App.css';
import '../css/reset.css'


function App() {

  const element = useRef<HTMLDivElement>(null)
  const navigate = useNavigate();
  const [cardInfo, setCardInfo] = useState<ICardInfo>(defaultICardInfo)
  const [cardValidationState, setCardValidationState] = useState<ICardValidationState>(defaultCardValidationState)

  //garante que a pagina estara no formulario, se ela for atualizada.
  useEffect(() => { navigate('/') }, [])

  //Animação
  const transitionPage = async () => {
    element.current?.classList.add('fade')
    setTimeout(() => {
      element.current?.classList.remove('fade')
    }, 500);
  }

  return (
    <div ref={element} className="App show">
      <CardDisplay getCardInfo={cardInfo} />
      <Routes>
        <Route index={false} path='/' element={
          <CardForm
            trasitionPage={transitionPage}
            navigate={navigate}
            cardInfo={cardInfo}
            setCardInfo={setCardInfo}
            cardValidationState={cardValidationState}
            setCardValidationState={setCardValidationState} />} />
        <Route path='/Thankyou' element={
          <ThankYou
            trasition={transitionPage}
            setCardInfo={setCardInfo}
            navigate={navigate} />} />
      </Routes>
    </div>
  );
}

export default App;
