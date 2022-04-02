import { useState, useEffect, useContext, useRef } from "react";
import { ApiContext } from "../../utils/api_context";
import { useParams } from "react-router-dom";
import { Button } from "../common/button";
import { useMessages } from "../../utils/use_messages";
import { Link } from 'react-router-dom';



export const ChatRoom = () => {
    const [chatRoom, setChatRoom] = useState(null);
    const [contents, setContents] = useState('');
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const api = useContext(ApiContext);
    const { id } = useParams();
    const [messages, sendMessage] = useMessages(chatRoom);

    useEffect(async () => {
        setLoading(true);
        const { user } = await api.get('/users/me')
        setUser(user);
        const { chatRoom } = await api.get(`/chat_rooms/${id}`);
        setChatRoom(chatRoom);
        setLoading(false);
    }, []);

    if (loading) return 'Loading...';

    return (
        <div style={{
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center", 
          backgroundColor: "#E8F5E9",
          minHeight: "100vh"
          }}>
          <div style={{display: "flex", paddingTop: "20px"}}>
            <Link  style={{fontSize: "30px", padding: "25px", borderRadius: "10px", backgroundColor: "#43A047",}} to={'/'}>Homepage</Link>
          </div>
          <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <h1 style={{fontSize: "50px", paddingTop: "25px"}}>The {chatRoom.name} Chat Room!</h1>
            <h3 style={{fontSize: "20px", paddingBottom: "10px"}}>Chatroom coordinates: {chatRoom.latitude},{chatRoom.longitude}</h3>
          </div>
          <div style={
            {display: "flex",
             minWidth: "700px",
              maxHeight: "400px",
              minHeight: "400px",
              flexDirection: "column",
               overflowY: "scroll",
               scrollbarColor: "#1B5E20",
               backgroundColor: "#66BB6A",
               borderRadius: "10px"}}>
            {messages.map((message) => (
              <div style={{padding: "10px"}}>
                <h1 style={{
                  borderRadius: "3px",
                  minHeight: "30px",
                  backgroundColor: "#E8F5E9"
                  }} key={message.id}>{message.userName} says: {message.contents}</h1>
              </div>
            ))}
          </div>
          <div style={{display: "flex", paddingTop: "30px"}}>
            <input type="text" value={contents} onChange={(e) => setContents(e.target.value)} />
            <Button onClick={() => sendMessage(contents, user)}>Send</Button>
          </div>
        </div>
    );
};

