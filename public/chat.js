$(function() {
    const socket = io.connect('localhost:3005')

    const message = $("#message");
    const username = $("#username");
    const send_message = $("#send_message");
    const send_username = $("#send_username");
    const chatroom = $("#chatroom");
    const feedback = $("#feedback");

    send_username.click(()=> {
        console.log(username.val())
        socket.emit ('change_username', {username: username.val()})
    })

    send_message.click(()=> {
        socket.emit('new_message', {message: message.val()})
        message.val('')
    })

    socket.on('new_message', (data)=> {
        chatroom.append("<p class='message'>"+ data.username + ': ' + data.message 
        + "</p>")
        feedback.html('')
    })

    message.bind ('keypress', () => {
        socket.emit ('typing')
    })

    socket.on('typing', (data)=> {
        feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>" )
    })
});