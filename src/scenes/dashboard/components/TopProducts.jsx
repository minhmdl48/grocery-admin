import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';

const topProducts = [
  { name: 'Tomato', sales: 150, price: '5000VND', image: 'https://cdn.britannica.com/16/187216-131-FB186228/tomatoes-tomato-plant-Fruit-vegetable.jpg' },
  { name: 'Coca Cola', sales: 120, price: '10,000VND', image: 'https://www.coca-cola.com/content/dam/onexp/vn/home-image/coca-cola/Coca-Cola_OT%20320ml_VN-EX_Desktop.png' },
  { name: 'Fanta', sales: 100, price: '12,000VND', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMI-g4xWqP1pq5rTdDecE9R4g5XmDw5QDxAA&s' },
  { name: 'Banana', sales: 90, price: '4000VND', image: 'https://static.wixstatic.com/media/53e8bb_a1e88e551162485eb4ff962437300872~mv2.jpeg/v1/crop/x_0,y_105,w_1024,h_919/fill/w_560,h_560,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Banana.jpeg' },
];
const TopProducts = () => {
  return (
    <Box mt={4} sx={{width: '50%'}} >
        <Typography variant="h6" gutterBottom>
          Top Products
        </Typography>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: '5%' }}>Image</TableCell>
            <TableCell sx={{ width: '40%' }}>Product</TableCell>
            <TableCell align="right" sx={{ width: '30%' }}>Sales</TableCell>
            <TableCell align="right" sx={{ width: '30%' }}>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {topProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell sx={{ width: '5%' }}>
                  <img src={product.image} alt={product.name} width="50" />
                </TableCell>
              <TableCell sx={{ width: '40%' }}>{product.name}</TableCell>
              <TableCell align="right" sx={{ width: '30%' }}>{product.sales}</TableCell>
              <TableCell align="right" sx={{ width: '30%' }}>{product.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
};

export default TopProducts;