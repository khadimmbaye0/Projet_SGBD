import React, { useState, useEffect, useRef } from 'react';
import { Card, List, Input, Button, Avatar } from 'antd';
import { SendOutlined, RobotOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSendMessage = async () => {
        if (inputValue.trim()) {
            setIsLoading(true);

            setMessages([...messages, { text: inputValue, sender: 'user' }]);

            setMessages((prevMessages) => [
                ...prevMessages,
                { text: '...', sender: 'bot', pending: true },
            ]);

            try {
                const response = await axios.post('http://localhost:5000/api/chat', {
                    message: inputValue,
                    lang: 'fr-FR',
                });

                setMessages((prevMessages) => {
                    const messagesWithoutPending = prevMessages.filter(
                        (message) => !message.pending
                    );
                    return [
                        ...messagesWithoutPending,
                        { text: response.data, sender: 'bot' },
                    ];
                });
            } catch (error) {
                console.error('Erreur lors de la requête API :', error);

                setMessages((prevMessages) => {
                    const messagesWithoutPending = prevMessages.filter(
                        (message) => !message.pending
                    );
                    return [
                        ...messagesWithoutPending,
                        { text: 'Une erreur est survenue. Veuillez réessayer.', sender: 'bot' },
                    ];
                });
            }

            setIsLoading(false);
            setInputValue('');
        }
    };

    const formatMessage = (text) => {
        if (!text) return "";
            text = text.replace(/\n/g, "<br />");
            text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
            text = text.replace(/(###\s)(.*)/g, '<h3>$2</h3>');
            text = text.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
            return text;
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <Card
            title="Chatbot"
            style={{
                borderRadius: 20,
                height: '84vh',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
            }}
            styles={{ body:{
                flex: 1,
                border: 0,
                display: 'flex',
                flexDirection: 'column',
                padding: 0,
                overflow: 'hidden',
            }}}
        >
            <div
                style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '16px',
                    borderBottom: '1px solid #f0f0f0',
                }}
            >
                <List
                    dataSource={messages}
                    bordered={false}
                    split={false}
                    style={{border: "none"}}
                    renderItem={(message) => (
                        <List.Item
                            style={{
                                justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                                padding: '8px 0',
                            }}
                        >
                            <Card
                                style={{
                                    background: message.sender === 'user' ? '#1976d2' : '#f0f0f0',
                                    color: message.sender === 'user' ? '#fff' : '#000',
                                    borderRadius: '30px',
                                    maxWidth: '90%',
                                }}
                                bodyStyle={{ padding: '4px 12px' }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', padding: 8 }}>
                                    {message.sender === 'bot'}
                                    <span dangerouslySetInnerHTML={{ __html: formatMessage(message.text)}} />
                                    {message.sender === 'user'}
                                </div>
                            </Card>
                        </List.Item>
                    )}
                />
                <div ref={messagesEndRef} />
            </div>
            <div style={{ padding: '16px', borderTop: '1px solid #f0f0f0', display: 'flex', flexDirection: 'row' }}>
                <Input
                    style={{ borderRadius: 20 }}
                    placeholder="Posez votre question ici..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onPressEnter={handleSendMessage}
                    disabled={isLoading}
                    suffix={
                        <Button
                            type="primary"
                            style={{ borderRadius: 20, marginLeft: 15 }}
                            icon={<SendOutlined />}
                            onClick={handleSendMessage}
                        >
                        </Button>
                    }
                />
            </div>
        </Card>
    );
};

export default Chatbot;