import React, { ChangeEvent, Dispatch, FormEvent, KeyboardEvent, SetStateAction } from "react";
import { ICardValidationState } from "../../Interfaces/ICardValidationState";
import { generateClassNames } from "../../Utils/GenerateClassNames";
import { NavigateFunction } from "react-router-dom";
import { ICardInfo } from "../../Interfaces/ICardInfo";
import { formatCardNumber, handlerChange, validFormatCVC, validFormatCardNumber, validFormatHolder, validFormatMonth } from '../../Utils/Utils';
import './CardForm.css'
import './CardFormResponsive.css'
import '../../css/transition.css'

interface CardFormProps {
    trasitionPage: any
    navigate: NavigateFunction
    cardInfo: ICardInfo;
    setCardInfo: Dispatch<SetStateAction<ICardInfo>>;
    cardValidationState: ICardValidationState;
    setCardValidationState: Dispatch<SetStateAction<ICardValidationState>>;
}

class CardForm extends React.Component<CardFormProps> {
    render(): React.ReactNode {
        const { trasitionPage, navigate, cardInfo, setCardInfo, cardValidationState, setCardValidationState } = this.props;
        const classNamestoError = generateClassNames(cardValidationState);

        const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
            handlerChange(event, setCardInfo);
        };
        const handleCardNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
            event.currentTarget.value = formatCardNumber(event.currentTarget.value);
            handleInputChange(event);
        }
        const preventInvalidKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
            const regex = /^[+-.]+$/
            if (regex.test(event.key)) {
                event.preventDefault();
            }
        }
        const submit = async (event: FormEvent<HTMLFormElement>) => {
            //impede a atualização da pagina
            event.preventDefault()

            const isHolderValid = validFormatHolder(cardInfo.holder);
            const isNumberValid = validFormatCardNumber(cardInfo.number);
            const isMonthValid = validFormatMonth(cardInfo.month);
            const isYearValid = cardInfo.year !== '';
            const isCvcValid = validFormatCVC(cardInfo.cvc);

            setCardValidationState({
                holder: !isHolderValid,
                number: !isNumberValid,
                month: !isMonthValid,
                year: !isYearValid,
                cvc: !isCvcValid
            });

            if (isHolderValid && isNumberValid && isMonthValid && isYearValid && isCvcValid) {

                try {
                    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(cardInfo)
                    });

                    if (response.ok) {
                        const result = await response.json();
                        localStorage.setItem('formData', JSON.stringify(result));
                        console.log('Dados enviados com sucesso.');
                        handlerTransitionPage();
                    } else {
                        console.log('Erro ao enviar dados.');
                    }
                } catch (error) {
                    console.error('Erro ao enviar dados:', error);
                }
            } else {
                console.log('Formulário inválido.');
            }

        };

        const handlerTransitionPage = () => {
            trasitionPage();
            setTimeout(() => {
                navigate('/ThankYou');
            }, 500);
        }


        return (
            <form onSubmit={submit} className="card-form" method='post'>
                <div className='defined-card-holder'>
                    <label htmlFor="card-holder">Cardholder Name</label>
                    <input
                        onChange={handleInputChange}
                        value={cardInfo.holder}
                        className={classNamestoError.holder.input}
                        maxLength={26}
                        type="text"
                        name="holder"
                        id="card-holder"
                        placeholder='e.g. Jane Appleseed' />
                    <p className={classNamestoError.holder.message}>Wrong format, first and last name</p>
                </div>

                <div className='defined-card-number'>
                    <label htmlFor="card-number">Card Number</label>
                    <input
                        onChange={handleCardNumberChange}
                        className={classNamestoError.number.input}
                        value={cardInfo.number}
                        maxLength={19}
                        name="number"
                        id="card-number"
                        placeholder='e.g. 1234 5678 9123 0000' />
                    <p className={classNamestoError.number.message}>Wrong format, numbers only</p>
                </div>

                <div className='grid'>
                    <label className='date' htmlFor="set-month-validaty">Exp. Date (MM/YY)</label>
                    <input
                        onChange={handleInputChange}
                        onKeyDown={preventInvalidKeyPress}
                        className={classNamestoError.date.month_Input}
                        value={cardInfo.month}
                        maxLength={2}
                        type="number"
                        name="month"
                        id="set-month-validaty"
                        placeholder='MM' />

                    <input
                        onChange={handleInputChange}
                        onKeyDown={preventInvalidKeyPress}
                        value={cardInfo.year}
                        className={classNamestoError.date.year_Input}
                        maxLength={2}
                        type="number"
                        name="year"
                        placeholder='YY' />
                    <p className={classNamestoError.date.message}>Can’t be blank</p>

                    <label className="title-cvc" htmlFor="cvc">CVC</label>
                    <input
                        onChange={handleInputChange}
                        onKeyDown={preventInvalidKeyPress}
                        value={cardInfo.cvc}
                        className={classNamestoError.cvc.input}
                        maxLength={3}
                        type="number"
                        name="cvc"
                        id="cvc"
                        placeholder='e.g. 123' />
                    <p className={classNamestoError.cvc.message}>Can’t be blank</p>
                </div>

                <input className='submit' type="submit" value="Confirm" />
            </form>)
    }
}

export default CardForm;