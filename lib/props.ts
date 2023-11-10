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
    email:string
}

// user address prop
export interface UserAddress{
 
    name: string,
    mobile: number | null,
    pincode: number | null,
    locality: string, 
    city: string,
    state: string,
}[]
 