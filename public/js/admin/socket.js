let socket_textarea = document.querySelector('#socket_textarea');

if (window.location.pathname === "/users/admin") {
    const socket = new WebSocket('ws://localhost:4000/');

    socket.onopen = () => {
        console.log("socket connected");
    };

    socket.onerror = () => {
        console.log("error");
    };

    socket.onmessage = (m) => {
        console.log(`message: ${m.data}`);
    };

    let sendMessage = () => {
        let msg = socket_textarea.value;
        socket.send(msg);      
    }

    // executeKeyEnter(socket_textarea, sendMessage);
}


