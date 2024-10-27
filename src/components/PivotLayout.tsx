import * as React from 'react';
import { IStyleSet, Label, ILabelStyles, Pivot, PivotItem } from '@fluentui/react';
import ProductList from './ProductList';
import CategotyList from './Category/CategoryList';

export const labelStyles: Partial<IStyleSet<ILabelStyles>> = {
    root: { marginTop: 10 },
};
export const PivotLayout: React.FunctionComponent = () => {
    return (
      <Pivot aria-label="Basic Pivot Example">
        <PivotItem
          headerText="Products"
          headerButtonProps={{
            'data-order': 1,
            'data-title': 'My Files Title',
          }}
        >
          <ProductList/>
        </PivotItem>
        <PivotItem headerText="Categories">
          <CategotyList/>
        </PivotItem>
      </Pivot>
    );
  };