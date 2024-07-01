export type ImageDetail = {
    title: string,
    image: string,
    price: number
}[]

export interface userDetail {
    username: string,
    email: string
}

export interface studentDetail {
    username: string,
    email: string,
    _id: string
}

export interface userSchema {
    username: string,
    email: string,
    password: string,
    profileImage: File | null,
}

export interface loginDetail{
    username: string,
    password: string
}

export interface productSchema {
    name: string,
    price: number,
    image: File | null,
    description: string
}

export interface productDetail {
    _id: string,
    name: string,
    price: number,
    image: File | null,
    description: string
}