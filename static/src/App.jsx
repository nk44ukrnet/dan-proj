import React, {useState, useEffect} from 'react';
import RoutesList from "./routes/RoutesList.jsx"

const App = () => {
    const [darkMode, setDarkMode] = useState(false);
    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
    };

    useEffect(() => {
        document.body.classList.toggle('dark-mode', darkMode);
    }, [darkMode]);
    return (
        <>
            <RoutesList/>
        </>
    );
};

export default App;