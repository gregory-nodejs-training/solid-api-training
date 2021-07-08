import { v4 as uuid } from "uuid";

class User {

    readonly id!: string;
    name!: string;
    email!: string;
    password!: string;

    constructor(props: Omit<User, 'id'>, id?: string) {
        Object.assign(this, props);
        
        if (!id) {
            this.id = uuid();
        }
    }
}

export { User };