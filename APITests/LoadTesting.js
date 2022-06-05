import http from 'k6/http'
import {sleep} from 'k6'

export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    stages: [
        {duration: '30s', target: 100},
        {duration: '60s', target: 100},
        {duration: '30s', target: 0},
    ],
    thresholds: {
        http_req_duration: ['p(99)<300'],
    }
};

const API_BASE_URL = 'https://backend.revenant-games.online/api';

export default () =>{
    http.batch([
        ['GET', `${API_BASE_URL}/subjectcards`],
        ['GET', `${API_BASE_URL}/subjectcards/2028`],
    ]);
    sleep(1);
}