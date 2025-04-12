import React, {useEffect, useRef, useState} from 'react';
import {
    addMessage,
    showTypingIndicator,
    hideTypingIndicator,
    sendMessageRequest
} from '../../function/ChatFunctions';
import './ChatWidget.scss';

const ChatWidget = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [input, setInput] = useState('');
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const messagesRef = useRef(null);

    const toggleChat = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        addMessage('user', input, messagesRef);
        setInput('');
        showTypingIndicator(messagesRef);

        try {
            const response = await sendMessageRequest(input);
            hideTypingIndicator(messagesRef);
            addMessage('bot', response, messagesRef);
        } catch (error) {
            hideTypingIndicator(messagesRef);
            addMessage('bot', `Chyba: ${error.message}`, messagesRef);
        }
    };

    const handleResize = () => {
        const mobile = window.innerWidth <= 768;
        setIsMobile(mobile);
        setIsCollapsed(mobile);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            {!isMobile || !isCollapsed ? (
                <div id="chat-widget">
                    <div id="chat-container" className={isCollapsed ? 'collapsed' : ''}>
                        <div id="chat-header" onClick={toggleChat}>
                            <span>Potrebujete pomoc?</span>
                            <span className="toggle-chat">
  {isCollapsed ? '▲' : '▼'}
</span>

                        </div>
                        <div id="chat-messages" ref={messagesRef}></div>
                        <div id="input-area">
                            <input
                                type="text"
                                id="user-input"
                                placeholder="Napíšte svoju otázku..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            />
                            <button id="send-button" onClick={handleSend} disabled={!input.trim()}>
                                Odoslať
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div id="chat-icon" onClick={() => setIsCollapsed(false)}>
                    💬
                </div>
            )}
        </>
    );
};

export default ChatWidget;
