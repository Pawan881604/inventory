import CustomSeparator from '@/components/common/CustomSeparator';
import { Box, Breadcrumbs, Stack, Typography } from '@mui/material'
import Link from 'next/link';
import React from 'react'
import Product_form from '../Product_form';

const page = () => {


    return (
        <Box>
            <Box>
                <Typography variant="h4" gutterBottom>
                    Create a Product
                </Typography>
            </Box>
            <Box>
                <CustomSeparator />
            </Box>
            <Box><Product_form/></Box>
        </Box>
    )
}

export default page