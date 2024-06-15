export interface ICardValidationState {
    holder: boolean,
    number: boolean,
    month: boolean,
    year: boolean,
    cvc: boolean
}

export const defaultCardValidationState: ICardValidationState = ({
    holder: false,
    number: false,
    month: false,
    year: false,
    cvc: false
})