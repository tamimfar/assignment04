export interface RegisterUserInterface {
    name: string
    email: string
    password: string
    role: Role
}
enum Role {
    TENANT = "TENANT",
    LANDLORD = "LANDLORD",
    ADMIN = "ADMIN"
}

export interface LoginUserInterface {
    email: string
    password: string
}