
const http = require('http');
var options ;
var httpExec = require('./httpExecuter');

class Queue {
    constructor(kubeMQHost, kubeMQRestPort, client, queueName, kubeMQToken,group, maxReceive=32, waitTime=1, isSecure) {
        this.kubeMQHost    =  kubeMQHost;
        this.kubeMQPort    =  isNaN(kubeMQRestPort)? kubeMQPort.toString() : kubeMQRestPort ;
        this.queueName     =  queueName;
        this.client        =  client;
        this.kubeMQToken = kubeMQToken;
        this.isSecure = isSecure;
        this.group = group;
        this.max_number_of_messages             =   maxReceive;
        this.wait_time_seconds_queue_messages   =   waitTime;

        options = {
            'host': this.kubeMQHost,
            'port': this.kubeMQPort,          
            "headers": { 'Content-Type' : 'application/json',  'x-kubemq-server-token' : this.kubeMQToken}
        };  
    }
    

    send(message) {

            message.Channel = this.queueName;
            message.ClientId = this.client;
            
            options.method = 'POST';
            options.path = '/queue/send';
          
            if (this.isSecure) {
                return httpExec.getHttpsRequest(event, options);
    
            } else {
    
                return httpExec.getRequest(event, options);
            }
       
    };

    sendBatch(messages) {
        
        options.method = 'POST';
        options.path = '/queue/send_batch';
       
        messages.forEach(element => {
            //validation
            element.Channel = this.queueName;
            element.ClientId = this.client;
        });

        if (this.isSecure) {
            return httpExec.getHttpsRequest(event, options);

        } else {

            return httpExec.getRequest(event, options);
        }
    }

    receive(max_number_of_messages, wait_time_seconds) {
    
        options.method = 'POST';
        options.path = '/queue/receive';

         request = {           
            ClientID                :   this.client,
            Channel                 :   this.queueName,
            MaxNumberOfMessages     :   max_number_of_messages === undefined ? this.max_number_of_messages :max_number_of_messages,
            IsPeak                  :   false,
            WaitTimeSeconds         :   wait_time_seconds === undefined ? this.wait_time_seconds :wait_time_seconds,
        };
    
        if (this.isSecure) {
            return httpExec.getHttpsRequest(request, options);

        } else {

            return httpExec.getRequest(request, options);
        }
    }

    peek(max_number_of_messages, wait_time_seconds) {

        options.method = 'POST';
        options.path = '/queue/receive/';

        request = {           
            ClientID                :   this.client,
            Channel                 :   this.queueName,
            MaxNumberOfMessages     :   max_number_of_messages === undefined ? this.max_number_of_messages :max_number_of_messages,
            IsPeak                  :   true,
            WaitTimeSeconds         :   wait_time_seconds === undefined ? this.wait_time_seconds :wait_time_seconds,


        };
        
        if (this.isSecure) {
            return httpExec.getHttpsRequest(event, options);

        } else {

            return httpExec.getRequest(event, options);
        }
    }

    ackAllMessages() {
       
        options.method = 'POST';
        options.path = '/queue/ack_all';
        let request = {
            Channel: this.queueName,
            ClientId: this.client
        };
        if (this.isSecure) {
            return httpExec.getHttpsRequest(event, options);

        } else {

            return httpExec.getRequest(event, options);
        }
  
    }

    ping() {

        options.method = 'GET';
        options.path = '/ping';
  
        if (this.isSecure) {
            return httpExec.getHttpsRequest(event, options);

        } else {

            return httpExec.getRequest(event, options);
        }
    }
}

module.exports = Queue;

