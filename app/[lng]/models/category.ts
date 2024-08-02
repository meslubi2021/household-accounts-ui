export type Category = {  
    _id: string,
    name: string,
    icon: string,
    color: string,
    type: string
}
export type CategoryPayload = {    
    name?: string,
    icon?: string,
    color?: string,
    type?: string 
}