const tarn  = require('./transaction')


let nret = new tarn('localhost',9090, 'trte','testQueue');
nret.ReceiveMessage().then(res=> {

    console.log(res);

    nret.AckMessage().then(res=>console.log(res)).catch(err=>{
        console.log(err);
    })
}).catch(err=>{
    console.log(err);
})