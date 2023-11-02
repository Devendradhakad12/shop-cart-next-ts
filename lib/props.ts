export interface userProps {

    iat: number;
    id: string;
    name: string;
    role: string;
}

// token props 

export interface DataStoredInToken {
    id:string,
    role:string,
    name:string,
}

// user address prop
export interface UserAddress{
    address :{
        name: string,
        mobile: string,
        pincode: string,
        locality: string, 
        city: string,
        state: string,
    }[]
}
