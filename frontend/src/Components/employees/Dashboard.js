import React from 'react';
import Stomp from 'stompjs';

import NewsFeed from './NewsFeed';

let client;
let subscription;

class Dashboard extends React.Component{
    state = {
        news: []
    }
    componentDidMount(){
        this.findNews();
        client = Stomp.client('ws://localhost:15674/ws');
        client.connect('guest', 'guest', this.subscribeToEmployeeQueue);
    }
    render(){
        let newsfeed = this.state.news;
        newsfeed = newsfeed.map((feed, id) => {
            return (
                <NewsFeed news={feed} key={id}/>
            );
        });

        return(
            <div className="card">
                {(this.state.employee !== null) ?
                <div>
                    <div>
                        <h1>Üdv</h1>
                        <p></p>
                        <h4>Íme az önt érintő események, amig távol volt:</h4>
                        <ul className="details">{newsfeed}</ul>
                    </div>
                </div> : 
                <p>A keresett felhasználó nem létezik</p>}
            </div>
        );
    }

    // Hírfolyam
    subscribeToEmployeeQueue = () => {
        let clientId = `user-${localStorage.getItem('userId')}`;

        if (subscription) {
            subscription.unsubscribe();
            
            console.log('unsubscribe')
            client.disconnect();
        } else if (!subscription) {
            
            subscription = client.subscribe(`/amq/queue/${clientId}`, (message) => {

                let newNews = JSON.parse(message.body);

                let news = this.state.news;
                news = [...news, newNews];

                this.setState({
                    news: news
                });

            }, { ack: 'client', exclusive: true, durable: false, 'auto-delete': true });
            
            client.debug = (str) => {
                console.log(str)
            }
            console.log("congratulation you are subscribed")
            console.log(subscription);
        }
    }

    findNews = () => {
        fetch('/api/messages/news').then((response) => {
            return response.json();
        }).then((jsonFile) => {
            this.setState({
                news: jsonFile
            });
        })
    }
}

export default Dashboard;