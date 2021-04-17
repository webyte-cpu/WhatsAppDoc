export const VALID_PATTERNS = {
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
  ROLE: /^(PATIENT|DOCTOR)$/
}

export const ERR_MSG = {
  PASSWORD: 'Must contain at least a number, an uppercase and lowercase letter, and at least 8 or more characters'
}
