export type ImageDetail = {
    title: string,
    image: string,
    price: number
}[]

export interface userDetail {
    username: string,
    email: string,
    profileImage: File | null
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
    description: string,
    count: number
}

export interface AuthContextType {
    token: string;
    name: string;
    profileImage: string;
    setToken: (token: string) => void;
    setName: (name: string) => void;
    setProfileImage: (profileImage: string) => void;
}

export interface CartContextType {
    numberOfProducts: string;
    setNumberOfProducts: (numberOfProducts: string) => void;
    addProductToCart: (product: productDetail) => void;
    cartProducts: productDetail[];
    setCartProducts: (products: productDetail[]) => void;
}

  