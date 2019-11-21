const MessageQueue = require('../queue/message_queue');
const msgQueue = require('../queue/message');
const byteConverter = require('../tools/stringToByte').stringToByte;

let message_queue = new MessageQueue('localhost:50000','testQueue','client');


  let messages = [];
  let message = new msgQueue("MyFirstMessage", byteConverter('ms1'));
  let second_message = new msgQueue.Message("MySecondMessage", byteConverter('ms2'));

  messages.push(message);
  messages.push(second_message);

  message_queue.sendQueueMessageBatch(messages).then(res => console.log(res));
  console.log("batch messages were sent");
