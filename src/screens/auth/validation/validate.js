import { getErrorMsg } from './errMsg';

const requiredValidator = (value) => {
    return value !== '';
}

const minLengthValidator = (value, minlength) => {
    return !(value.length < minlength);
}

const maxLengthValidator = (value, maxlength) => {
    return !(value.length > maxlength);
}

const pattern = (value, regex) => {
    return regex.test(value);
}

const checkValidators = (value, err, errObj) => {
    switch (err) {
        case 'required':
            return requiredValidator(value);
        case 'minlength':
            return minLengthValidator(value, errObj.requiredLength);
        case 'maxlength':
            return maxLengthValidator(value, errObj.requiredLength);
        case 'pattern':
            return pattern(value, errObj.regex);
    }
}

export const checkErrors = (value, validators) => {
    const errors = Object.keys(validators);
    let errorsOccured = [];
    for (let err of errors) {
        if (!checkValidators(value, err, validators[err])) {
            errorsOccured.push(getErrorMsg(err, validators[err]));
        }
    }
    return errorsOccured;
}