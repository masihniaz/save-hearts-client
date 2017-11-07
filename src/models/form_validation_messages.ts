export const validation_messages = {
    'username': [
      { type: 'required', message: 'Username is required.' },
      { type: 'minlength', message: 'Username must be at least 5 characters long.' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
      { type: 'validUsername', message: 'Your username has already been taken.' }
    ],
    'name': [
      { type: 'required', message: 'Name is required.' }
    ],
    'lastname': [
      { type: 'required', message: 'Last name is required.' }
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'email', message: 'Enter a valid email.' }
    ],
    'phone': [
      { type: 'required', message: 'Phone is required.' },
      { type: 'minLength', message: 'Phone number must be at least 10 digits.' },
      { type: 'maxLength', message: 'Phone number must be maximum 11 digits.' },
      { type: 'number', message: 'Input must be a number.' },
      { type: 'phone', message: 'Incorrect phone number.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'noWhitespaceRequired', message: 'Must not contain white spaces.'},
      { type: 'minLength', message: 'must be at least 6 characters long.'},
      { type: 'maxLength', message: 'must not be more than 20 characters long.'},
      { type: 'repeatCharacterRegexRule', message: 'A character should not repeat.' },
      { type: 'alphabeticalCharacterRule', message: 'Must contain at least 1 alphabet.' },
      { type: 'digitCharacterRule', message: 'Must contain at least 1 digit.' },
      { type: 'lowercaseCharacterRule', message: 'Must contain at least 1 lowercase character.' },
      { type: 'uppercaseCharacterRule', message: 'Must contain at least 1 uppercase character.'},
      { type: 'specialCharacterRule', message: 'Must contain at least 1 symbol.'},
      { type: 'allowedCharacterRule', message: 'only letters from A to B are allowed.'}
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required' },
      { type: 'equalTo', message: 'Password mismatch'}
    ],
    'terms': [
      { type: 'pattern', message: 'You must accept terms and conditions.' }
    ],
  };