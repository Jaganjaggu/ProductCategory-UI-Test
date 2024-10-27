import { BASE_URL } from "./baseURL";
import { commonAPI } from "./commonAPI";

//Category API
export const getAllCategoryAPI = async () => {
    try{
        const headers = {
            "Content-Type": "application/json"
        };
        return await commonAPI("GET",`${BASE_URL}/Categories`,'',headers);
    }catch(er){
        console.log(er);
    }
};

interface Category {
    categoryName: string;
}
export const addCategoryAPI = async (category: Category)=> {
    try{
        const headers = {
            "Content-Type": "application/json"
        };
        return await commonAPI("POST",`${BASE_URL}/Categories`,JSON.stringify(category),headers);

    }catch(err){
        console.log(err);
        
    }
}

export const deleteCategoryAPI = async (id: string)=>{
    try{
        const headers = {
            "Content-Type": "application/json"
        };
        return await commonAPI("DELETE",`${BASE_URL}/Categories/${id}`,'',headers)
    }catch(err){
        console.log(err);
    }
}

// Product API____________________________________________________________________________________

export const getAllProductAPI = async () => {
    try{
        const headers = {
            "Content-Type": "application/json"
        };
        return await commonAPI("GET",`${BASE_URL}/Products`,'',headers);
    }catch(er){
        console.log(er);
    }
};

interface newProduct {
    brand: string;
    model?: string;
    price?: number;
    categoryId: string;
}

export const addProductAPI = async (newProduct: newProduct) => {
    try{
        const headers = {
            "Content-Type": "application/json"
        };
        return await commonAPI("POST",`${BASE_URL}/Products`,JSON.stringify(newProduct),headers)
    }catch(err){
        console.log(err);
        
    }
}

//Delete product___________________
export const deleteProductAPI = async (id: string) => {
    try{
        const headers = {
            "Content-Type": "application/json"
        };
        return await commonAPI("DELETE",`${BASE_URL}/Products/${id}`,'',headers)
    }catch(err){
        console.log(err);
    }
}

//Edit Product______________
export const editProductAPI = async (id: string, product: newProduct) => {
    try{
        console.log(id,"_________",product);
        
        const headers = {
            "Content-Type": "application/json"
        };
        return await commonAPI("PUT",`${BASE_URL}/Products/${id}`,JSON.stringify(product),headers)
    }catch(er){
        console.log(er);
    }
}