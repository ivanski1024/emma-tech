export default class User {
    constructor(username) {
        this.username = username;
    }

    ping() {
        console.log("This is " + this.username);
    }
}