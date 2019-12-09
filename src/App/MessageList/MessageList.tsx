import React, { useEffect, useState } from "react";
import { JsonRpc, RpcError } from 'eosjs';

const rpc = new JsonRpc('http://localhost:8888');

const MessageList: React.FC = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const getMessageList = async () => {
            const messageList = await getMessages();
            setMessages(messageList);
        };
        getMessageList();
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default MessageList;

const getMessages = async () => {
    try {
        const messages = await rpc.get_table_rows({
            json: true,
            code: 'tropical',
            scope: 'tropical',
            table: 'messages',
            limit: 10,
            reverse: false,
            show_payer: false
        });
        console.log(messages);
        return messages;
    } catch (e) {
        console.log(e);
        //setError(`Error Retrieving Chain Info: ${e.message}`);
        if (e instanceof RpcError)
            console.log(JSON.stringify(e.json, null, 2));
    }
};