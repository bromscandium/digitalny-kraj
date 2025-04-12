import React from 'react';
import Services from '../components/Services/Services.jsx';
import Banner from '../components/Banner/Banner.jsx';
import NewsFeed from '../components/NewsFeed/NewsFeed.jsx';

function Home() {
    return (
        <main>
            <Banner id="home" />
            <NewsFeed />
            <Services />

        </main>
    );
}

export default Home;
