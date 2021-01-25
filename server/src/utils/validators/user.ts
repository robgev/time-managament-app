import { body } from 'express-validator';

const usernameIsNotEmpty = body(
  'username',
  'Username should consist of minimum 3 characters',
)
  .isLength({ min: 3 });

const passwordLengthIsOkay = body(
  'password',
  'Password should have at least 6 characters',
)
  .isStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  });
