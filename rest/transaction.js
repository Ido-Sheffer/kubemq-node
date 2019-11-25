
const WebSocket = require('ws');
let ws = undefined;
const StreamRequestType = {
    'StreamRequestTypeUnknown': 0,
    'ReceiveMessage': 1,
    'AckMessage': 2,
    'RejectMessage': 3,
    'ModifyVisibility': 4,
    'ResendMessage': 5,
    'SendModifiedMessage': 6

}
let  TranMessage = undefined;

class transaction {
    constructor(kubeMQHost, kubeMQRestPort, client, queueName) {
        this.kubeMQHost = kubeMQHost;
        this.kubeMQRestPort = isNaN(kubeMQRestPort) ? kubeMQPort.toString() : kubeMQRestPort;
        this.client = client;
        this.queueName = queueName;
        var url = 'ws://';
        url = url.concat(this.kubeMQHost.concat(':', this.kubeMQRestPort));
        url = url.concat('/queue/stream');
        url = url.concat('?client_id=' + this.client);
        url = url.concat('&channel=' + this.queueName);

        if (this.group !== undefined) {
            url = url.concat('&group=' + Group);
        }
        this.url = url;
      
        this.Receiver  = this.Receiver.bind(this);
    }





    ReceiveMessage() {
        if (this.TranMessage !== undefined) {
            reject('already message in tran');
        }
        return this.Receiver(StreamRequestType.ReceiveMessage);
    };

    AckMessage() {
        return new Promise((resolve, reject) => {
            if (TranMessage === undefined) {
               return reject('no message in tran');
            }
            return this.Receiver(StreamRequestType.AckMessage);
        });
    };


    Receiver(streamRequestTypeData) {
        var options = {

            headers: {
                'X-Kubemq-Server-Token': '1b12c563-4f8a-49e9-94e1-aa29b7be70d6'
            }
        };

        
        ws = new WebSocket(this.url, options);
        var StreamQueueMessageRequest = {
            RequestID: undefined,
            ClientID: this.client,
            StreamRequestTypeData: streamRequestTypeData,
            Channel: this.queueName,
            VisibilitySeconds: 120,
            WaitTimeSeconds: 1,
            RefSequence: TranMessage !==undefined ?   TranMessage.Message.Attributes.Sequence : undefined,
            ModifiedMessage: null,
        }



        var json = JSON.stringify(StreamQueueMessageRequest);




        return new Promise((resolve, reject) => {


            ws.on('open', function open() {
                console.log('open');
                ws.send(json, error => {
                    console.log(error);
                })
            });

            ws.on('error', err => {
                console.log();
                reject(err);
            })

            ws.on('message', function incoming(data) {
                let objectData = JSON.parse(data);
                if(objectData.IsError)
                {
                    TranMessage = undefined;

                   return reject(objectData.Error);
                }
                if (objectData.StreamRequestTypeData == StreamRequestType.ReceiveMessage) {
                   
                    TranMessage = objectData;
                    return  resolve(objectData);
                }
            });
        });

    };
};
module.exports = transaction;