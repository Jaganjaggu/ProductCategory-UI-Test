import {
    Button, Table, TableBody, TableCell, TableCellLayout, TableHeader, TableHeaderCell, TableRow, Dialog,
    DialogTrigger,
    DialogSurface,
    DialogTitle,
    DialogContent,
    DialogBody,
    DialogActions,
} from '@fluentui/react-components'
import React, { useEffect, useState } from 'react'
import { useStyles } from './ProductListStyles'
import { DeleteRegular, EditRegular } from '@fluentui/react-icons'
import { DefaultButton, Dropdown, Panel, PrimaryButton, TextField } from '@fluentui/react'
import { useBoolean } from '@fluentui/react-hooks';
import { addProductAPI, deleteProductAPI, editProductAPI, getAllCategoryAPI, getAllProductAPI } from '../Services/allAPI'


type Column = {
    columnKey: string,
    label: string
}

interface category {
    categoryId: string;
    categoryName: string;
}
interface newProduct {
    brand: string;
    model?: string;
    price?: number;
    categoryId: string;
}

interface Product {
    id: string;
    brand: string;
    model?: string;
    price?: number;
    categoryId: string;
    categoryName: string;
}
const columns: Column[] = [
    { columnKey: "category", label: "Category" },
    { columnKey: "brand", label: "Brand" },
    { columnKey: "model", label: "Model" },
    { columnKey: "price", label: "Price" },
    { columnKey: "actions", label: "" },

]

export const ProductList: React.FC = () => {
    const [open, setOpen] = React.useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState('')

    const [productsState, setProductsState] = useState<Product[]>([]);
    const [categoriesState, setCategoriesState] = useState<category[]>([]);

    const [id, setId] = useState<string>('');
    const [brand, setBrand] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [model, setModel] = useState<string>('');
    const [categoryId, setCategoryId] = useState<string>('');

    //add or edit -- true: add | false: edit
    const [addEdit, setAddEdit] = useState(true)

    const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);
    const styles = useStyles();

    const fetchProductDetails = async () => {
        const fetchProducts = await getAllProductAPI();
        setProductsState(fetchProducts.data)
        console.log("asdas");
        
    }
    useEffect(() => {
        
        fetchProductDetails()
    }, [categoryId])

    // console.log(productsState, "hiiiii");

    useEffect(() => {
        const fetchDetails = async () => {
            const response = await getAllCategoryAPI();
            setCategoriesState(response.data)
        }
        fetchDetails()
    }, []);

    // console.log(categoriesState, "hiiiii");
    // console.log(brand, model, price, categoryId);



    //Add Prduct API
    const handleAddProducts = async () => {
       
        setAddEdit(true)

        const newProduct: newProduct = {
            brand,
            model,
            price,
            categoryId
        }
        if(newProduct.brand.trim() !== '' && newProduct.categoryId.trim() !== ''){
            const response = await addProductAPI(newProduct)
            setCategoryId('')
            setBrand('')
            setPrice(0)
            setModel('')
        }
       
        // console.log(response, "adasdsad");
    }

    //Delete Product API
    const handleDelete = (id: string) => {
        setDeleteConfirmation(id)
        setOpen(true);
        // console.log(response);
    }

    const confirmDelete = async () => {
        const response = await deleteProductAPI(deleteConfirmation);
        console.log("asdasdasdasdasdasd");
        
        fetchProductDetails()
        setOpen(false)
    }

    const cancelDelete = () => {
        setDeleteConfirmation('')
        setOpen(false)
    }

    //Edit Product 
    const updateProduct = async () => {
        const updateProduct: newProduct = {
            brand,
            model,
            price,
            categoryId
        }
        const response = await editProductAPI(id, updateProduct)

        setCategoryId('')
        setBrand('')
        setPrice(0)
        setModel('')
        setId('')
        // console.log(response,"updated products");
    }

    const handleEdit = async (column: Product) => {
        setAddEdit(false)

        setId(column.id)
        setCategoryId(column.categoryId)
        setBrand(column.brand)
        setPrice(column.price || 0)
        setModel(column.model || '')
        openPanel()
    }
    // console.log("____________",categoryId,model,price,brand,id,);
    const handleDismissPanel = () => {
        dismissPanel();
        setId('');
        setCategoryId('');
        setBrand('');
        setPrice(0);
        setModel('');
        setAddEdit(true);
    }



    return (
        <>

            <div className={styles.heading}>
                Product List
            </div>
            <div className={styles.addButton}>
                <Button appearance="primary" onClick={openPanel}>Add Products</Button>
            </div>
            <div className={styles.tableBody}>
                <Table className={styles.table}>
                    <TableHeader>
                        <TableRow>
                            {
                                columns.map((column, index) => (
                                    <TableHeaderCell className={styles.headerCell} key={index + 1}>
                                        {column.label}
                                    </TableHeaderCell>
                                ))
                            }
                        </TableRow>
                    </TableHeader>
                    <TableBody >
                        {
                            productsState.map((column) => (
                                <TableRow key={column.id}>
                                    <TableCell className={styles.tableContent} >
                                        {column.categoryName}
                                    </TableCell >
                                    <TableCell className={styles.tableContent}>
                                        {column.brand}
                                    </TableCell>
                                    <TableCell className={styles.tableContent}>
                                        {column.model}
                                    </TableCell>
                                    <TableCell className={styles.tableContent}  >
                                        {column.price}
                                    </TableCell>
                                    <TableCell className={styles.tableContent}  >
                                        <Button icon={<EditRegular />} aria-label="Edit" onClick={() => handleEdit(column)} />
                                        <Button icon={<DeleteRegular />} aria-label="Delete" onClick={() => handleDelete(column.id)} />
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
            <div>
                <Panel
                    // To entirely disable the default dismiss behavior:
                    // 1. Don't provide an onDismiss prop
                    isOpen={isOpen} // 2. Control the visibility
                    hasCloseButton={false} // 3. Hide the close button
                    headerText="New Category"
                >
                    <br></br>
                    <Dropdown
                        label="Select Difficulty"
                        selectedKey={categoryId}
                        onChange={(e, option) => setCategoryId(option?.key as string)}
                        options={categoriesState.map(d => ({
                            key: d.categoryId,
                            text: d.categoryName,
                        }))}
                        required
                    />
                    <TextField value={brand} label="Brand" onChange={(e, newValue) => setBrand(newValue || '')} required />
                    <TextField value={model} label="Model" onChange={(e, newValue) => setModel(newValue || '')} />
                    <TextField value={price.toString()} type='number' label="Price" onChange={(e, newValue) => setPrice(parseFloat(newValue || "0"))} />
                    <br />
                    {
                        addEdit ? (<PrimaryButton text="Add" onClick={handleAddProducts} />)
                            : (<PrimaryButton text="Edit" onClick={updateProduct} />)
                    }

                    <DefaultButton onClick={handleDismissPanel} text="Close panel" />
                    {/* <DefaultButton onClick={dismissPanel} text="Close panel" /> */}


                </Panel>
            </div>

            <div>
                <Dialog open={open} onOpenChange={(event, data) => setOpen(data.open)}>

                    <DialogSurface>
                        <DialogBody>
                            <DialogTitle>Do you want to delete</DialogTitle>
                            
                            <DialogActions>
                                <DialogTrigger disableButtonEnhancement>
                                    <Button appearance="secondary" onClick={cancelDelete}>No</Button>
                                </DialogTrigger>
                                <Button appearance="primary" onClick={confirmDelete}>Yes</Button>
                            </DialogActions>
                        </DialogBody>
                    </DialogSurface>
                </Dialog>
            </div>
        </>
    )
}

export default ProductList