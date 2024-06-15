import classNames from "classnames";


export const generateClassNames = (validationState: any) => {
  return {
    holder: {
      input: classNames(validationState.holder ? 'error' : ''),
      message: classNames(validationState.holder ? 'active' : 'desactive'),
    },
    number: {
      input: classNames(validationState.number ? 'error' : ''),
      message: classNames(validationState.number ? 'active' : 'desactive'),
    },
    date: {
      month_Input: classNames('month', validationState.month ? 'error' : ''),
      year_Input: classNames('year', validationState.year ? 'error' : ''),
      message: classNames("error-date", (validationState.month) || (validationState.year) ? 'active' : 'desactive')
    },
    year: {
      message: '',
    },
    cvc: {
      input: classNames('cvc', validationState.cvc ? 'error' : ''),
      message: classNames('error-cvc', validationState.cvc ? 'active' : 'desactive'),
    }
  };
};