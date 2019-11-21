
var pubSubClass = require('./pubSub');



var pubSub = new pubSubClass('localhost', 9090, 'cleinq', 'test','1b12c563-4f8a-49e9-94e1-aa29b7be70d6');
var Event = require('../pubSub/lowLevel/event');

var event = new Event('c29tZSBlbmNvZGVkIGJvZHk=');
event.metadata = '123';



pubSub.send(event).then(res => {
    console.log('send:' + res);
});



// pubSub.subscribe(function (data) {

//     console.log(data);
// });



// var pubSubStore = new pubSubClass('localhost', 9090,'cleinq','test',true);


// var eventStore = new Event();
// eventStore.body = 'c29tZSBlbmNvZGVkIGJvZHk=';
// eventStore.metadata ='123';


// pubSubStore.send(eventStore).then(res => {
//     console.log('send:' + res);
// });

// pubSubStore.send(eventStore).then(res => {
//     console.log('send:' + res);
// });

// pubSubStore.send(eventStore).then(res => {
//     console.log('send:' + res);
// });

// pubSubStore.send(eventStore).then(res => {
//     console.log('send:' + res);
// });


// pubSubStore.subscribe(function (data) {

//     console.log(data);
// },{Type:1});


