import { useContext, useEffect, useState, Link } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { ApiContext } from '../../utils/api_context';
import { AuthContext } from '../../utils/auth_context';
import { Button } from '../common/button';

export const Home = () => {
  const [AuthToken, setAuthToken] = useContext(AuthContext);
  const api = useContext(ApiContext);

  // const navigate = useNavigate();

  const [name, setName] = useState('');
  const [chatRooms, setChatRooms] = useState([]);

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [userLatitude, setUserLatitude] = useState(null);
  const [userLongitude, setUserLongitude] = useState(null);

  useEffect(async () => {
    const res = await api.get('/users/me');
    const { chatRooms } = await api.get('/chat_rooms');
    const location = await navigator.geolocation.getCurrentPosition((location) => {
      console.log(location);
      setUserLatitude(parseInt(location.coords.latitude));
      setUserLongitude(parseInt(location.coords.longitude));
      setLoading(false);
      return location;
    }, (err) => {
      setErrorMessage(err.message);
    })
    setChatRooms(chatRooms);
    setUser(res.user);
  }, []);


  // useEffect(() => {
  // })

  const logout = async () => {
    const res = await api.del('/sessions');
    if (res.success) {
      setAuthToken(null);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const createRoom = async () => {
    const { chatRoom } = await api.post('/chat_rooms', { name, userLatitude, userLongitude });
    console.log(chatRoom);
      setChatRooms([...chatRooms, chatRoom]);
      setName('');
  }

  const distanceFormula = (x1, y1, x2, y2) => {
    const distance =  Math.sqrt((Math.pow((x2-x1), 2)) + (Math.pow((y2-y1), 2)))
    //console.log(`x1: ${x1}, y1: ${y1}, x2: ${x2}, y2: ${y2}`)
    //console.log("Distance: " + distance)
    if (parseInt(distance) < 100) {
      return true
    }
    else{
      return false
    }
  }

  return (
    <div style={{
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      backgroundColor: "#E8F5E9",
      minHeight: "100vh"
      }}>
      <div style={{display: "flex"}}>
        <h1 style={{fontSize: "50px", padding: "20px"}}>Welcome to GeoChat!</h1>
      </div>
      <h1 style={{fontSize: "20px", padding: "20px"}}>Welcome back user: {user.firstName}!</h1>
      <div style={{
        display: "flex", 
        backgroundColor: "#4CAF50", 
        padding: "20px", 
        borderRadius: "10px"}}>
        <h1 style={{padding: "10px"}}>Create a room: </h1>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
        <Button onClick={createRoom}>Create Room</Button>
      </div>
      <div style={{display: "flex", flexDirection: "column"}}>
        <h1>Currently Available Chat Rooms: </h1>
        {chatRooms.map((chatRoom) => {

          if (distanceFormula(chatRoom.latitude, chatRoom.longitude, userLatitude, userLongitude) == true) {
            return(
              <div style={{display: "flex", padding: "10px"}} key={chatRoom.id}>
                <div style={{
                  display: "flex", 
                  justifyContent: "center",
                  minWidth: "300px",
                  minHeight: "50px",
                  backgroundColor: "#2E7D32",
                  borderRadius: "10px"
                  }}>
                  <Link style={{
                    display: "flex", 
                    justifyContent: "center", 
                    fontSize: "20px"}}
                    to={`/chat_rooms/${chatRoom.id}`}>{chatRoom.name}</Link>
                </div>
              </div>
            )
          }
        })}
      </div>
    </div>
  );
};
