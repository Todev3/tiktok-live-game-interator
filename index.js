import { WebcastPushConnection } from 'tiktok-live-connector';
import robot from 'robotjs';
import { setTimeout } from 'node:timers/promises';

const keyMap = {
    up: 'up',
    down: 'down',
    left: 'left',
    right: 'right',
    a: 'x',
    b: 'z',
    start: 'enter',
    select: 'backspace',
};

const inputs = [];

(async () => {

    while(true) {

        if(inputs.length === 0) {
            await setTimeout(100);
            continue;
        }

        const stringInput = inputs.pop();
        robot.keyTap(stringInput);
        console.log(`input -> ${stringInput}`);
    }
    
} )();

// Username of someone who is currently live
let tiktokUsername = "live_user_id";

// Create a new wrapper object and pass the username
let tiktokLiveConnection = new WebcastPushConnection(tiktokUsername);

// Connect to the chat (await can be used as well)
tiktokLiveConnection.connect().then(state => {
    console.info(`Connected to roomId ${state.roomId}`);
}).catch(err => {
    console.error('Failed to connect', err);
})

// Define the events that you want to handle
// In this case we listen to chat messages (comments)
tiktokLiveConnection.on('chat', data => {
    const inputText = data.comment.toLowerCase().split(' ')[0];
    
    const input = keyMap[inputText];

    if(input) {
        inputs.push(input);
    }

})