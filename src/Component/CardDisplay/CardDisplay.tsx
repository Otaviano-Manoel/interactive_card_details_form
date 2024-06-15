import React from "react"
import { ICardInfo } from "../../Interfaces/ICardInfo"
import { formatCardNumber } from "../../Utils/Utils"
import './CardDisplay.css'
import './CardDisplayResponsive.css'
import card_Logo from '../../images/card-logo.svg'

interface CardDisplayProps {
    getCardInfo: ICardInfo
}

class CardDisplay extends React.Component<CardDisplayProps> {
    render(): React.ReactNode {
        const { getCardInfo } = this.props;

        const getDefaultCardHolderName = () => {
            if (getCardInfo.holder === '') {
                return 'JANE APPLESEED'
            }
            else {
                return getCardInfo.holder;
            }
        }

        const getDefaultCardNumber = () => {
            if (getCardInfo.number === '') {
                return '0000 0000 0000 0000'
            }
            else {
                let value: string = getCardInfo.number;
                value = value.replaceAll(' ', '');
                value = value.padEnd(16, '0')
                return formatCardNumber(value);
            }
        }

        const getDefaultCardDate = () => {
            let value: string[] = [getCardInfo.month, getCardInfo.year];
            if (value[0] === '') {
                value[0] += '00'
            }
            else {
                value[0] = value[0].padEnd(2, '0')
            }

            if (value[1] === '') {
                value[1] += '00'
            }
            else {
                value[1] = value[1].padEnd(2, '0')
            }

            return value[0] + '/' + value[1];
        }

        const getDefaultCardCVC = () => {
            if (getCardInfo.cvc === '')
                return '000'
            else {
                return `${getCardInfo.cvc}`.padEnd(3, '0')
            }
        }

        return (
            <section className="card-display">
                <div className='card-front'>
                    <img className='card-logo' src={card_Logo} alt="Logo" />
                    <h1 className='card-number'>{getDefaultCardNumber()}</h1>
                    <div className='card-details'>
                        <p className='card-holder'>{getDefaultCardHolderName()}</p>
                        <p className='card-validity'>{getDefaultCardDate()}</p>
                    </div>
                </div>
                <div className='card-back'>
                    <p className='card-cvc'>{getDefaultCardCVC()}</p>
                </div>
            </section>)
    }
}

export default CardDisplay;