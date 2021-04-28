export const VALID_PATTERNS = {
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
  ROLE: /^(PATIENT|DOCTOR)$/,
};

export const ERR_MSG = {
  PASSWORD: `Password must be 8 or more characters long and contain at least one of the following:
number, uppercase letter, lowercase letter, and symbol.`,
};
