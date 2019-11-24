const MessageQueue = require('../queue/message_queue');
const msgQueue     = require('../queue/message');
const byteConverter = require('../tools/stringToByte').stringToByte;

let message_queue = new MessageQueue('localhost:50000', 'testQueue', 'client');


  let transaction      =     message_queue.createTransaction();

  function queueHandler(recm) {
      console.log(`Received messages ${recm.StreamRequestTypeData}`);
      if (recm.StreamRequestTypeData=="ReceiveMessage")
      {
        console.log("Need more time to process, extend visibility for more 3 seconds");
        transaction.extendVisibility(3).then(_=> {
          console.log(`sent extendVisibiltyRequest`);
        });
      }
  }

  function errorHandler(msg) {
    console.log(`Received error ${msg}`);
  };
    transaction.receive(5, 10,queueHandler,errorHandler);
