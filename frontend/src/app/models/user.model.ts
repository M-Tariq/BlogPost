export class User{
    name: String;
    userName: String;
    email: String;
    password: String;
    constructor(name: String, username: String, email: String, password: String){
        this.name=name;
        this.userName=username;
        this.email=email;
        this.password=password;
    }
}
export default User;