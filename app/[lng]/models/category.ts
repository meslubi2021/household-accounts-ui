export type Category = {  
    _id: string,
    name: string,
    icon: string,
    color: string
}
export type UpdateCategory = {    
    name?: string,
    icon?: string,
    color?: string
}