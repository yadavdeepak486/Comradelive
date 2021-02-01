const socket = io()

socket.on('message', () => {
    console.log("Ala re aala msg aala");
})