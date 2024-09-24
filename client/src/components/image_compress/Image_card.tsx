import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Paper, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface ImageCardProps {
  itemData: { img: string; name: string }[];
  onDelete: (index: number) => void; // Pass a delete handler function
}

export default function Image_card({ itemData, onDelete }: ImageCardProps) {
  return (
    <ImageList sx={{ width: 350, height: 'auto', }} cols={2} rowHeight={200}>
      {itemData.map((item, index) => (
        <Paper key={item.img} elevation={3} sx={{ position: 'relative', overflow: 'hidden' }}>
          {/* Wrapper for the image and delete icon */}
          <ImageListItem>
            <img
              src={item.img}
              alt={item.name}
              loading="lazy"
            />

            {/* Delete icon positioned in the center and only shown on hover */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0)', // Initially invisible
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                opacity: 0,
                transition: 'background-color 0.3s ease, opacity 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark background on hover
                  opacity: 1, // Make the overlay visible
                },
              }}
            >
              <IconButton
                onClick={() => onDelete(index)}
                sx={{
                  color: 'white',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 0, 0, 0.7)', // Red background on hover
                  },
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </ImageListItem>
        </Paper>
      ))}
    </ImageList>
  );
}
