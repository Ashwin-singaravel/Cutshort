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

    // Authentication messages
    1200: { status: SUCCESS, message: 'User Authenticated' },
    1201: { status: FAILURE, message: 'Session is invalid please login again' },
    1202: { status: FAILURE, message: 'Session has expired please login again' },

    // Todo
    1300: { status: SUCCESS, message: 'Todo created successfully' },
    1301: { status: FAILURE, message: 'Unable to create to todo' },
    1302: { status: SUCCESS, message: 'Todo update successfully' },
    1303: { status: FAILURE, message: 'Unable to update todo' },
    1304: { status: FAILURE, message: 'Todo not found' },
    1305: { status: FAILURE, message: 'Permission denied to update todo' },
    1306: { status: SUCCESS, message: 'Todo deleted successfully' },
    1307: { status: FAILURE, message: 'Unable to delete todo' },
    1308: { status: FAILURE, message: 'Permission denied to delete todo' },
    1309: { status: SUCCESS, message: 'Todo details retrived successfully' },
    1310: { status: FAILURE, message: 'Unable to retrive to todo' },
    1311: { status: SUCCESS, message: 'Todo list retrived successfully' },
    1312: { status: FAILURE, message: 'Unable to retrive todo list' },
}

export default messages;