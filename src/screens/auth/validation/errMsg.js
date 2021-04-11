const errorMessages = {
    required: () => 'This field is required.',
    pattern: () => {'At least one letter and one number', 'Invalid input'},
    minlength: (param) => `Min chars required is ${param.requiredLength}`,
    maxlength: (param) => `Max chars allowed is ${param.requiredLength}`
};

export const getErrorMsg = (err, errObj) => {
    return errorMessages[err](errObj);
}