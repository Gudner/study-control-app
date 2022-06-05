import http from 'k6/http'
import {sleep} from 'k6'

export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    stages: [
        {duration: '10s', target: 50},
        {duration: '30s', target: 50},
        {duration: '10s', target: 500},
        {duration: '30s', target: 500},
        {duration: '10s', target: 50},
        {duration: '30s', target: 50},
        {duration: '15s', target: 0}
    ]
};

const API_BASE_URL = 'https://backend.revenant-games.online/api';

export default () =>{
    http.batch([
        ['GET', `${API_BASE_URL}/subjectcards`],
        ['GET', `${API_BASE_URL}/subjectcards/2028`],
    ]);
    sleep(1);
}