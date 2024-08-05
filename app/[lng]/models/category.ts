export type BaseCategory = {
    _id: string,
    name: string,
    icon: string,
    color: string,
}
export interface Category extends BaseCategory{
    subcategories: Category[] | []
    type: string,
}
export type CategoryPayload = {    
    name?: string,
    icon?: string,
    color?: string,
    type?: string 
}