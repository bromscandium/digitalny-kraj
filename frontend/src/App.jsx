import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
} from 'react-router-dom';

import Home from './pages/Home.jsx';
import Login from './pages/Login/Login.jsx';
import Events from './pages/Events/Events.jsx';
import News from './pages/News/News.jsx';
import Tourism from './pages/Tourism.jsx';
import Profile from './pages/Profile/Profile.jsx';
import Kontakty from './pages/Kontakty/Kontakty.jsx';
import ChatWidget from "./components/ChatBot/ChatWidget.jsx";
import Layout from './components/Layout.jsx';

function AppWrapper() {
    const location = useLocation();
    const hideLayoutOn = ['/login'];

    const isLayoutHidden = hideLayoutOn.includes(location.pathname);

    return isLayoutHidden ? (
        <Routes>
            <Route path="/login" element={<Login/>}/>
        </Routes>
    ) : (
        <Layout>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/news" element={<News/>}/>
                <Route path="/events" element={<Events/>}/>
                <Route path="/tourism" element={<Tourism/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/kontakty" element={<Kontakty/>}/>
            </Routes>
        </Layout>
    );
}

function App() {
    return (
        <Router>
            <AppWrapper/>
            <ChatWidget/>
        </Router>
    );
}

export default App;
