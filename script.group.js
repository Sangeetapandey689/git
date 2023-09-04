// script.js

document.addEventListener("DOMContentLoaded", () => {
    const messageList = document.querySelector(".message-list");
    const messageInput = document.getElementById("message-input");
    const sendButton = document.getElementById("send-button");

    // Check if the user is logged in
    const username = localStorage.getItem("username");

    if (!username) {
        window.location.href = "/login";
    }

    // Load messages from local storage and display them
    const loadMessages = () => {
        const messages = JSON.parse(localStorage.getItem("messages")) || [];

        messageList.innerHTML = "";

        messages.forEach((message) => {
            const div = document.createElement("div");
            div.textContent = `${message.username}: ${message.message}`;
            messageList.appendChild(div);
        });
    };

    loadMessages();

    // Event listener for sending messages
    sendButton.addEventListener("click", () => {
        const message = messageInput.value;

        if (message) {
            const messages = JSON.parse(localStorage.getItem("messages")) || [];
            messages.push({ username, message });
            localStorage.setItem("messages", JSON.stringify(messages));

            messageInput.value = "";
            loadMessages();
        }
    });
});
