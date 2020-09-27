const socket = io();
const me = {
    id : null,
    name : null
}

let lobby = [];

window.onload = function(){init()}



init = () =>{
    document.getElementById("setNameButton").addEventListener("click", setName);
}


setName = () => {
    const name = document.getElementById("name").value;
    document.getElementById("nameInput").style.display = "none";
    socket.emit("setName",name);
    me.name = name;
    updateLobby();
}

updateLobby = () => {
    let lobbyString = "";
    if(me.name){
        lobbyString = me.name + "<br>";
    }else{
        lobbyString = "";
    }
   

    for (let i = 0; i < lobby.length; i++) {
        lobbyString += lobby[i].name + "<br>";
    }

    document.getElementById('lobby').innerHTML = lobbyString;
}

socket.on('signIn',(userId)=>{
    console.log("Conneted to server my id is : "+userId);
    me.id = userId;
    socket.emit("signIn",userId);
})

socket.on('userAdded',(user)=>{
    if(user.id !== me.id){
        if(!lobby.find((u)=>{return u.id == user.id})){
            //console.log(user.name + " connected");
            lobby.push(user);
            updateLobby();

        }
        //console.log(lobby);
    }
})


socket.on('userRemoved',(user)=>{
    if(user.id !== me.id){
        if(lobby.find((u)=>{return u.id == user.id})){
            console.log(user.name + " was removed");
            lobby.splice(lobby.indexOf(lobby.find((u)=>{return u.id == user.id})),1);
            updateLobby();
        }        
        //console.log(lobby);
    }
})