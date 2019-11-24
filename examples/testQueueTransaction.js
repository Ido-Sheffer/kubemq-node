const MessageQueue = require('../queue/message_queue');
const Message = require('../queue/message');
const byteConverter = require('../tools/stringToByte').stringToByte;

let message_queue = new MessageQueue('localhost:50000', 'testQueue', 'client');



let transaction = message_queue.createTransaction();


function queueHandler(msg) {
  console.log(`Received messages ${msg.StreamRequestTypeData}`);
  if (msg.StreamRequestTypeData == "ReceiveMessage") {

    let msgSequence = msg.Message.Attributes.Sequence;
    workOnMSG(msg)
      .then(_ => {
        transaction.ackMessage(msgSequence)
          .then(_ => {
            console.log("ack was called");
          }
          )
      }).catch(_ => {
        transaction.rejectedMessage(msgSequence)
          .then(_ => {
            console.log('msg was rejected');
          });
      });
  }
  else if (msg.StreamRequestTypeData === "AckMessage" || msg.StreamRequestTypeData === "RejectMessage") {
    transaction.closeStream();
    console.log('msg acked, stream was close');
 
    transaction = message_queue.createTransaction();
    transaction.receive(100, 1, queueHandler)
  }
};

function workOnMSG(msg) {
  return new Promise((resolve, reject) => {
    if (msg.Message.Attributes.Sequence !== '3') {
      console.log('worked on msg');
      resolve();
    }
    else {
      reject();
    }
  })
};

transaction.receive(100, 1, queueHandler)















