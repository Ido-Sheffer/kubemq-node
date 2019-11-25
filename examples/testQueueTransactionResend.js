const MessageQueue = require('../queue/message_queue');
const msgQueue     = require('../queue/message');

let message_queue = new MessageQueue('localhost:50000', 'testQueue', 'client');


let transaction      =     message_queue.createTransaction();

function queueHandler(msg) {
    console.log(`Received messages ${msg}`);
    if (msg.StreamRequestTypeData=="ReceiveMessage")
    {
      console.log("Received Message sending resend request.");
      transaction.resend(channelName).then(_=> {
        console.log(`sent resend`);
      });
    }
}


  transaction.receive(5, 10,queueHandler);
