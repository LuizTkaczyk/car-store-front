export interface Vehicle{
    id?: number,
    model: string,
    brand_id: string,
    category_id: string,
    year: number,
    price: number,
    description?: string,
    images?: any,
    deleting?: boolean,
}
