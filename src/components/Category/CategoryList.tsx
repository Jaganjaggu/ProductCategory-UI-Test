import { Button, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from '@fluentui/react-components'
import React, { useEffect, useState } from 'react'
import { useStyles } from '../ProductListStyles'
import { addCategoryAPI, deleteCategoryAPI, getAllCategoryAPI } from '../../Services/allAPI'
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { Panel } from '@fluentui/react/lib/Panel';
import { useBoolean } from '@fluentui/react-hooks';
import { TextField } from '@fluentui/react';
import { DeleteRegular } from '@fluentui/react-icons';

type Column = {
    columnKey: string,
    label: string
}

interface category {
    categoryId: string;
    categoryName: string;
}

const columns: Column[] = [
    { columnKey: "serialNumber", label: "Serial Number" },
    { columnKey: "categoryName", label: "Category Name" },
    { columnKey: "Actions", label: "" },
]

export const CategotyList: React.FC = () => {
    const [categoriesState, setCategoriesState] = useState<category[]>([]);
    const [categoryNameField, setCategoryNameField] = useState<string>('');

    const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);
    const styles = useStyles();

    const fetchDetails = async () => {
        const response = await getAllCategoryAPI();
        setCategoriesState(response.data)
    }
    useEffect(() => {
        fetchDetails()
    },[categoryNameField]);

    //Add Category API
    const handleAddCategory = async () => {
        const newCategory: {categoryName: string} = {categoryName: categoryNameField}
        if(newCategory.categoryName.trim() != ''){
            const response = await addCategoryAPI(newCategory)
            setCategoryNameField('')
            console.log(response);
        }
       
    }

    console.log(categoriesState.map((val) => (val.categoryId)), "Hiiiiiiiiii");

    //Delete category
    const handleDelete = async (id: string) => {
        try{
            const response = deleteCategoryAPI(id)
            setCategoriesState(categoriesState.filter(items => items.categoryId !== id))
        }catch(err){
            console.error(err);
            
        }
        
    }
    return (
        <>

            <div className={styles.heading}>
                Category List
            </div>
            <div className={styles.addButton}>
                <Button appearance="primary" onClick={openPanel} >Add Category</Button>
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
                            categoriesState.map((column, index) => (
                                <TableRow key={column.categoryId} >
                                    <TableCell className={styles.tableContent} >
                                        {index + 1}
                                    </TableCell >
                                    <TableCell className={styles.tableContent}>
                                        {column.categoryName}
                                    </TableCell>
                                    <TableCell className={styles.tableContent}  >
                                        <Button icon={<DeleteRegular />} aria-label="Delete" onClick={() => handleDelete(column.categoryId)} />
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
                    <TextField label="Add a new category" value={categoryNameField} onChange={(e, newValue)=>setCategoryNameField(newValue || '')} required/>
                    <br/>

                    <PrimaryButton text="Add" onClick={handleAddCategory} />
                    <DefaultButton onClick={dismissPanel} text="Close panel" />

                </Panel>
            </div>
        </>
    )
}

export default CategotyList