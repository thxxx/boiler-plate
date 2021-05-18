import axios from 'axios';

export default {
    name: 'SIGNUP',
    data() {
        return {
            userName: 'user',
            userPhone: '01012345678',
            userAge: '19'
        }
    },
    methods: {
        searchUser: function() {
            axios.get('/searchUser').then(res => {
                console.log(res)
            })
        },
        registUser: function() {
            axios.post('registUser', { userName: this.userName }).then((res) => {
                console.log(res);
            })
        }
    }
}