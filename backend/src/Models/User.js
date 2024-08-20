class User {
    constructor(name, email, password, role) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    toObject () {
        return {
            name: this.name, 
            email: this.email,
            password: this.password,
            role: this.role
        }
    }
}

export default User;