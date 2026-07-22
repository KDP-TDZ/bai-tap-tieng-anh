const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const DATA_DIR = path.join(__dirname, 'submissions');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

app.use(express.static(__dirname));

const onlineUsers = new Set();

io.on('connection', (socket) => {
    let currentUser = null;

    socket.on('user-login', (data) => {
        currentUser = data.username;
        onlineUsers.add(currentUser);
        io.emit('user-connected', { username: currentUser });
        io.emit('user-list', Array.from(onlineUsers));
    });

    socket.on('user-action', (data) => {
        io.emit('user-action-broadcast', data);
    });

    socket.on('camera-status', (data) => {
        io.emit('camera-status-broadcast', data);
    });

    socket.on('submit-quiz', (data) => {
        const score = Math.floor(Math.random() * 38);
        const fileName = `${data.username}_${Date.now()}.txt`;
        const content = `Tên: ${data.username}\nThời gian: ${new Date().toISOString()}\nĐiểm: ${score}/38\nĐáp án: ${JSON.stringify(data.answers, null, 2)}`;
        fs.writeFileSync(path.join(DATA_DIR, fileName), content);
        io.emit('quiz-submitted', { username: data.username, score: score, total: 38 });
    });

    socket.on('get-users', () => {
        socket.emit('user-list', Array.from(onlineUsers));
    });

    socket.on('disconnect', () => {
        if (currentUser) {
            onlineUsers.delete(currentUser);
            io.emit('user-disconnected', { username: currentUser });
            io.emit('user-list', Array.from(onlineUsers));
        }
    });
});

http.listen(PORT, () => console.log(`🚀 Server chạy tại http://localhost:${PORT}`));
