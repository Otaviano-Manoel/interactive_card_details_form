import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { ICardInfo } from '../Interfaces/ICardInfo';

export const handlerChange = (event: ChangeEvent<HTMLInputElement>, dispatch: Dispatch<SetStateAction<ICardInfo>>) => {
    const { name, value, maxLength } = event.currentTarget;
    if (value.length <= maxLength) {
        dispatch(currentCardInfo => ({
            ...currentCardInfo,
            [name]: value

        }))
    }
}

export const formatCardNumber = (value: string) => {
    value = value.replace(' ', '');
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    return value;
}

export const validFormatHolder = (value: string): boolean => {
    const regex = /^[A-Za-z]+ [A-Za-z]+$/;
    return regex.test(value);
};

export const validFormatCardNumber = (value: string): boolean => {
    const allZerosRegex = /^[0]+$/;
    const cardNumberRegex = /^[0-9 ]+$/;

    if (allZerosRegex.test(value) || value === '') {
        return false;
    }
    return cardNumberRegex.test(value);
};

export const validFormatMonth = (value: string): boolean => {
    const month = Number.parseInt(value.padEnd(2, '0'), 10);
    return month > 0 && month <= 12;
};


export const validFormatCVC = (value: string): boolean => {
    const allZerosRegex = /^[0]+$/;
    return !allZerosRegex.test(value) && value !== '';
};
