import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { product_Options_type_props } from '@/types/Product_types';

// Sample options data
const options: product_Options_type_props[] = [
  { _id: 1, title: 'Size' },
  { _id: 2, title: 'Piece' },
  { _id: 3, title: 'Color' }
];

// Define the props for the component
interface Options_CheckboxListProps {
  set_product_options: React.Dispatch<React.SetStateAction<product_Options_type_props[]>>;
  product_options:product_Options_type_props[]
}

// Define the component with the correct props type
const Options_CheckboxList: React.FC<Options_CheckboxListProps> = ({ set_product_options,product_options }) => {
  const [checked, setChecked] = React.useState<number[]>([]);

  // Handle toggle for checking/unchecking
  const handleToggle = (value: product_Options_type_props) => () => {
    const currentIndex = checked.indexOf(value._id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value._id);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    
    // Update product options based on checked state
    const updatedOptions = options.filter(option => newChecked.includes(option._id));
    set_product_options(updatedOptions);
    setChecked(newChecked);
  };

  React.useEffect(() => {
    if (product_options.length > 0) {
      // Extract _id values from product_options and set them as the checked state
      const checkedIds = product_options.map(option => option._id);
      setChecked(checkedIds);
    } else {
      // Clear the checked state if no options are selected
      setChecked([]);
    }
  }, [product_options]);

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {options.map(value => {
        const labelId = `checkbox-list-label-${value._id}`;

        return (
          <ListItem key={value._id} disablePadding>
            <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.includes(value._id)}
                  tabIndex={-1}
                  disableRipple
                  sx={{
                    '&.Mui-checked': {
                      color: '#000',
                    },
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value.title} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default Options_CheckboxList;
