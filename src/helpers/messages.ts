const SUCCESS = 'success';
const FAILURE = 'failure';

interface Message {
    message: string;
    status: string;
}

const messages: { [key: number]: Message } = {
    //Sign up
    1000: { status: SUCCESS, message: 'Sign-up successful' },
    1001: { status: FAILURE, message: 'Unable to Sign-up' },
    1002: { status: FAILURE, message: 'Invalid request' },
    1003: { status: FAILURE, message: 'Invalid email' },
    1004: { status: FAILURE, message: 'Password must contain atleast 8 characters' },
    1005: { status: FAILURE, message: 'User already exists' },

    //Sign in
    1106: { status: SUCCESS, message: 'Sign-in successful' },
    1107: { status: FAILURE, message: 'Account does not exists' },
    1108: { status: FAILURE, message: 'Unable to Sign-in' },
    1109: { status: FAILURE, message: 'Invalid credentials' },
}

export default messages;