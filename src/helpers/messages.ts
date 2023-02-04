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
    1201: { status: FAILURE, message: 'Session is invalid please login' },
    1202: { status: FAILURE, message: 'Session has expired please login again' },

    // Todo
    1300: { status: SUCCESS, message: 'Todo created successfully' },
    1301: { status: FAILURE, message: 'Unable to create todo' },
    1302: { status: SUCCESS, message: 'Todo updated successfully' },
    1303: { status: FAILURE, message: 'Unable to update todo' },
    1304: { status: FAILURE, message: 'Todo not found' },
    1305: { status: FAILURE, message: 'Permission denied to update todo' },
    1306: { status: SUCCESS, message: 'Todo deleted successfully' },
    1307: { status: FAILURE, message: 'Unable to delete todo' },
    1308: { status: FAILURE, message: 'Permission denied to delete todo' },
    1309: { status: SUCCESS, message: 'Todo details retrived successfully' },
    1310: { status: FAILURE, message: 'Unable to retrive todo' },
    1311: { status: SUCCESS, message: 'Todos list retrived successfully' },
    1312: { status: FAILURE, message: 'Unable to retrive todos list' },

    // Post
    1400: { status: SUCCESS, message: 'Post created successfully' },
    1401: { status: FAILURE, message: 'Unable to create post' },
    1402: { status: SUCCESS, message: 'Post updated successfully' },
    1403: { status: FAILURE, message: 'Unable to update post' },
    1404: { status: FAILURE, message: 'Post not found' },
    1405: { status: FAILURE, message: 'Permission denied to update post' },
    1406: { status: SUCCESS, message: 'Post deleted successfully' },
    1407: { status: FAILURE, message: 'Unable to delete post' },
    1408: { status: FAILURE, message: 'Permission denied to delete post' },
    1409: { status: SUCCESS, message: 'Post details retrived successfully' },
    1410: { status: FAILURE, message: 'Unable to retrive post' },
    1411: { status: SUCCESS, message: 'Posts list retrived successfully' },
    1412: { status: FAILURE, message: 'Unable to retrive posts list' },

    // Comments
    1500: { status: SUCCESS, message: 'Comment created successfully' },
    1501: { status: FAILURE, message: 'Unable to create comment' },
    1502: { status: SUCCESS, message: 'Comment updated successfully' },
    1503: { status: FAILURE, message: 'Unable to update comment' },
    1504: { status: FAILURE, message: 'Comment not found' },
    1505: { status: FAILURE, message: 'Permission denied to update comment' },
    1506: { status: SUCCESS, message: 'Comment deleted successfully' },
    1507: { status: FAILURE, message: 'Unable to delete comment' },
    1508: { status: FAILURE, message: 'Permission denied to delete comment' },
    1509: { status: SUCCESS, message: 'Comment details retrived successfully' },
    1510: { status: FAILURE, message: 'Unable to retrive comment' },
    1511: { status: SUCCESS, message: 'Comments list retrived successfully' },
    1512: { status: FAILURE, message: 'Unable to retrive comments list' },
}

export default messages;