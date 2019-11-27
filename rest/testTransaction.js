const tarn = require('./transaction')


let transaction = new tarn('localhost', 9090, 'testClient', 'testQueue','1b12c563-4f8a-49e9-94e1-aa29b7be70d6',true);


transaction.on('error', err => {
    console.log('Error' + err.Error);
});

transaction.on('end', mod => {
    console.log('end transaction by:' + mod.by);
  //  transaction.receiveMessage(1, 10);
});
transaction.addListener('extended', ack => {
    console.log(ack);
});

transaction.on('message', msg => {
    console.log(msg);
    if (msg.IsError) {
        console.log('error' + msg);
        return;
    }
    // transaction.extendVisibility(40);
    if (workOnMSG(msg)) {
        transaction.ackMessage();
    } else {
        transaction.rejectedMessage();
    };
});


transaction.receiveMessage(1, 1);

var counter = 1;
function workOnMSG(msg) {

    if (msg.Message.Attributes.Sequence !== 220) {
        console.log('worked on msg' + counter++);
        return true;
    }
    else {
        return false;
    }

};


