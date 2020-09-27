const uuid = require("uuid")

const gameServer = (io)=>{
    io.on('connection', (socket) => {
        const user = {
            id : uuid.v4(),
            name : "no name"
        }
    
        socket.emit('signIn', user.id);
    
        socket.on('signIn',(id)=>{
            if(id == user.id){
                console.log("[SOCKET CONNECTION] User connected with id : "+id)
            }else{
                console.log("[SOCKET CONNECTION] connection error [1]")
            }
            
        })
    
        socket.on('setName',(name)=>{
            user.name = name;
            io.emit('userAdded',user)
        })
    
        socket.on('disconnect', () => {
            console.log("[SOCKET CONNECTION] user disconnect with id : "+user.id)
            io.emit('userRemoved',user)
        })
    });
}

module.exports = gameServer;