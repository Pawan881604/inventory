"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { createSchema } from "@/components/common/Zod_schema";
import {
  product_type_props,
} from "@/types/Product_types";
import Select_field from "@/components/common/fields/Select_field";
import Input_field from "@/components/common/fields/Input_field";
import Drag_input_field from "@/components/image_compress/Drag_input_field";
import Image_card from "@/components/image_compress/Image_card";
import Jodit_text_editor from "@/components/common/fields/Jodit_text_editor";
import PositionedSnackbar from "@/components/common/Snackbar";

const ProductForm: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [editorValue, setEditorValue] = useState<string>('');
  const [pulish_status, set_pulish_status] = useState<string>('');
  const [Open, setOpen] = useState<boolean>(false)
  const [itemData, setItemData] = useState<{ img: string; name: string }[]>([]);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<product_type_props>({
    resolver: zodResolver(createSchema),
    defaultValues: {
      title: "", // Default value for the title field
    },
  });

  const onSubmit = (data: product_type_props) => {
    if (files.length < 1) {
      // console.log('add image')
    }
    // console.log(pulish_status);
    setOpen(true)
  };
  const handleDrop = (acceptedFiles: File[]) => {
    const imageData = acceptedFiles.map((file) => ({
      img: URL.createObjectURL(file),
      name: file.name,
    }));
    setFiles(acceptedFiles);
    setItemData(imageData);
  };
  const handleDelete = (index: number) => {
    const newImages = files.filter((_, i) => i !== index);
    const imageData = newImages.map((file) => ({
      img: URL.createObjectURL(file),
      name: file.name,
    }));
    setFiles(newImages);
    setItemData(imageData);
  };


  const statusOptions = [
    { value: "draft", label: "Draft" },
    { value: "publish", label: "Publish" },
  ];
  const collectonOptions = [
    { value: "packaginmaterial", label: "packagin material" },
    { value: "beautyitems", label: "beauty items" },
  ];
  const categoryOptions = [
    { value: "box", label: "Box" },
    { value: "flap", label: "Flap" },
    { value: "corrugatedbox", label: "Corrugatedbox" },
  ];
  const brandOptions = [
    { value: "boxBrother", label: "Box Brother" },
    { value: "Gurez", label: "Gurez" },
  ];
  // const product_type_Options = [
  //   { value: "Simple", label: "Simple Product" },
  //   { value: "Variable", label: "Variable Product" },
  //   { value: "Affilate", label: "Exxternal/Affiliate Product" },
  // ];

  return (
    <Box sx={{ padding: "30px 0px 20px" }}>
      {Open &&
        <PositionedSnackbar Open={Open} setOpen={setOpen} />
      }
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={10}>
                <Input_field
                  control={control}
                  errors={errors}
                  name="title"
                  label="Title"
                />
              </Grid>

              <Grid item xs={4}>
                <Select_field
                  control={control}
                  errors={errors}
                  name="collection"
                  label="Collection"
                  options={collectonOptions}
                />
              </Grid>
              <Grid item xs={4}>
                <Select_field
                  control={control}
                  errors={errors}
                  name="category"
                  label="Category"
                  options={categoryOptions}
                />
              </Grid>
              <Grid item xs={4}>
                <Select_field
                  control={control}
                  errors={errors}
                  name="brand"
                  label="Brand"
                  options={brandOptions}
                />
              </Grid>
            </Grid>
            {/* //--------------------------------------variunts part  */}
            {/* <Grid container spacing={2} sx={{ margin: "10px 0 0" }}>
              <Grid item xs={3} sx={{ paddinTop: "4px" }}>
                <Typography>Product Data</Typography>
              </Grid>
              <Grid item xs={4} >
                <Select_field
                  control={control}
                  errors={errors}
                  name="product_type"
                  label="Product Data"
                  options={product_type_Options}
                />
              </Grid>
            </Grid> */}
            {/* <Grid container spacing={2} sx={{ margin: "10px 0 0" }}>
              <Grid item xs={12} sx={{ paddinTop: "4px" }}>
                <Typography>Product Options</Typography>
              </Grid>
              <Grid item xs={12}>
                {product_options &&
                  product_options.map((item) => (
                    <Box key={item._id}>
                      <Grid container spacing={2} sx={{ margin: "10px 0 0" }}>
                        <Grid
                          item
                          xs={2}
                          className='custom-grid'
                          sx={{
                            paddinTop: "4px",
                            background: "white",
                            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                          }}
                        >
                          <Typography>Option title</Typography>
                          <Typography>{item.title}</Typography>
                        </Grid>

                        <Grid
                          item
                          xs={8}
                          sx={{
                            paddinTop: "4px",
                            background: "white",
                            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                          }}
                          className='custom-grid'
                        >
                          <TagSelector />
                        </Grid>
                        <Grid
                          item
                          xs={1}
                          sx={{
                            paddinTop: "4px",
                            background: "white",
                            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                          }}
                          className='custom-grid'
                        >
                          <IconButton
                            onClick={() => handle_list_Delete(item._id)}
                            sx={{
                              backgroundColor: "#1a202c",
                              color: "white",
                              "& .MuiChip-deleteIcon": {
                                color: "white",
                              },
                              "&:hover": {
                                backgroundColor: "#2d3748",
                                color: "red",
                                "& .MuiChip-deleteIcon": {
                                  color: "rgba(255, 0, 0, 0.7)",
                                },
                              },
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Box>
                  ))}

                <Typography>Varients</Typography>
                <Varients/>
              </Grid>
            </Grid> */}
            {/* //--------------------------------------variunts part  */}

            <Box sx={{ margin: "10px 0" }}>
              <Typography>Inventory</Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Input_field
                  control={control}
                  errors={errors}
                  name="quantity"
                  label="Quantity"
                />
              </Grid>
              <Grid item xs={3}>
                <Input_field
                  control={control}
                  errors={errors}
                  name="sku"
                  label="Sku"
                />
              </Grid>
              <Grid item xs={3}>
                <Input_field
                  control={control}
                  errors={errors}
                  name="barcode"
                  label="Barcode"
                />
              </Grid>
              <Grid item xs={3}>
                <Input_field
                  control={control}
                  errors={errors}
                  name="weight"
                  label="Weight"
                />
              </Grid>
              <Grid item xs={3}>
                <Input_field
                  control={control}
                  errors={errors}
                  name="volume"
                  label="Volume"
                />
              </Grid>
            </Grid>
            <Box sx={{ margin: "10px 0" }}>
              <Typography>Dimensions</Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Input_field
                  control={control}
                  errors={errors}
                  name="depth"
                  label="Depth"
                />
              </Grid>
              <Grid item xs={3}>
                <Input_field
                  control={control}
                  errors={errors}
                  name="width"
                  label="Width"
                />
              </Grid>
              <Grid item xs={3}>
                <Input_field
                  control={control}
                  errors={errors}
                  name="height"
                  label="Height"
                />
              </Grid>
              <Grid item xs={12}>
                <Jodit_text_editor value={editorValue} setEditorValue={setEditorValue} />
                <p>{editorValue}</p>
              </Grid>
            </Grid>
            <Box className="flex gap-2">
              <Button
                sx={{
                  padding: "5px 10px",
                  marginTop: "15px",
                  fontSize: "14px",
                }}
                variant="outlined"
                type="submit"
                onClick={() => set_pulish_status('Draft')}
              >
                Draft
              </Button>
              <Button
                sx={{
                  padding: "5px 10px",
                  marginTop: "15px",
                  background: '#15803d',
                  fontSize: "14px",
                  '&:hover': {
                    backgroundColor: '#14532d', // Darker background color on hover
                  },
                }}
                onClick={() => set_pulish_status('Publish')}
                type="submit"
                variant="contained"
              >
                Publish
              </Button>
            </Box>
          </form>
        </Grid>
        <Grid item xs={4}>
          {/* <Box>
            <Options_CheckboxList
              set_product_options={set_product_options}
              product_options={product_options}
            />
          </Box> */}
          <Box>
            <Drag_input_field onDrop={handleDrop} />
          </Box>
          <Box>
            <Image_card itemData={itemData} onDelete={handleDelete} />
          </Box>
        </Grid>
      </Grid>

    </Box>
  );
};

export default ProductForm;
