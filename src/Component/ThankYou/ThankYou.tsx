import React, { Dispatch, SetStateAction } from "react";
import './ThankYou.css';
import './ThankYouResponsive.css';
import icon_complete from '../../images/icon-complete.svg';
import { NavigateFunction } from "react-router-dom";
import { ICardInfo, defaultICardInfo } from "../../Interfaces/ICardInfo";

interface ThankYouProps {
    trasition: any
    navigate: NavigateFunction
    setCardInfo: Dispatch<SetStateAction<ICardInfo>>
}

class ThankYou extends React.Component<ThankYouProps> {
    render(): React.ReactNode {
        const { trasition, navigate, setCardInfo } = this.props;

        const handlerOnClick = () => {
            trasition();
            setTimeout(() => {
                setCardInfo(defaultICardInfo);
                setTimeout(() => {
                    navigate('/');
                }, 200);
            }, 250);
        }

        return (
            <section className="thank-you">
                <img src={icon_complete} alt="Confirmation Icon" />
                <h1>Thank You!</h1>
                <p>We’ve added your card details</p>
                <button onClick={handlerOnClick}>Continue</button>
            </section>)
    }
}

export default ThankYou;