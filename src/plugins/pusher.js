import Pusher from 'pusher-js';

Pusher.logToConsole = false;

let pusher = new Pusher(`${process.env.VUE_APP_PUSHER_KEY}`, {
	cluster: `${process.env.VUE_APP_PUSHER_CLUSTER}`,
});

export default pusher;
