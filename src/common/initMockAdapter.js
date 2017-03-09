import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

let mock = new MockAdapter(axios);

export default {
    getMockAdapter: function () {
        return mock;
    }
};