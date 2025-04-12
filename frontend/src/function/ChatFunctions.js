export const API_URL = 'http://localhost:8000/ai/chat';

export const addMessage = (sender, text, messagesRef) => {
    const div = document.createElement('div');
    div.className = `message ${sender}-message`;
    div.textContent = text;
    messagesRef.current?.appendChild(div);
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
};

export const showTypingIndicator = (messagesRef) => {
    const typing = document.createElement('div');
    typing.id = 'typing-indicator';
    typing.className = 'typing-indicator';
    typing.textContent = 'Píšem...';
    messagesRef.current?.appendChild(typing);
};

export const hideTypingIndicator = (messagesRef) => {
    const typing = messagesRef.current?.querySelector('#typing-indicator');
    if (typing) typing.remove();
};

export const sendMessageRequest = async (message) => {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
    });

    if (!res.ok) throw new Error(await res.text());
    const data = await res.json();
    return data.response;
};
