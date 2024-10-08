export interface LoginDate{
    email:string,
    password:string,
    role:"admin"|"user"
}

export interface LoginResponse{
    token:string,
    userId:string
}

