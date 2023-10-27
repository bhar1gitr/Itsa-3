import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import { styled } from '@mui/material/styles';

const Label = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
}));

export default function ImageMasonry() {
  
const itemData = [
  {
    img: 'https://res.cloudinary.com/dpackji5g/image/upload/v1698418515/one_u7k3vv.png',
    title: 'Fern',
  },
  {
    img: 'https://res.cloudinary.com/dpackji5g/image/upload/v1698418628/Screenshot_2023-10-27_202638_tphcwh.png',
    title: 'Snacks',
  },
  {
    img: 'https://res.cloudinary.com/dpackji5g/image/upload/v1698418628/Screenshot_2023-10-27_202638_tphcwh.png',
    title: 'Mushrooms',
  },
  {
    img: 'https://res.cloudinary.com/dpackji5g/image/upload/v1698418996/Screenshot_2023-10-27_203240_bywjig.png',
    title: 'Tower',
  },
  {
    img: 'https://res.cloudinary.com/dpackji5g/image/upload/v1698419124/Screenshot_2023-10-27_203453_sw3vku.png',
    title: 'Breakfast',
  },
  {
    img: 'https://res.cloudinary.com/dpackji5g/image/upload/v1698418894/Screenshot_2023-10-27_203050_htng9c.png',
    title: 'Honey',
  },
  {
    img: 'https://res.cloudinary.com/dpackji5g/image/upload/v1698418785/Screenshot_2023-10-27_202913_wzcwjg.png',
    title: 'Sea star',
  },
  {
    img: 'https://res.cloudinary.com/dpackji5g/image/upload/v1698419240/Screenshot_2023-10-27_203658_lpklvy.png',
    title: 'Tree',
  },
  {
    img: 'https://res.cloudinary.com/dpackji5g/image/upload/v1698419240/Screenshot_2023-10-27_203658_lpklvy.png',
    title: 'Burger',
  },
];

  return (
    <Box sx={{ width: 800, minHeight: 829 }}>
      <Masonry columns={3} spacing={2}>
        {itemData.map((item, index) => (
          <div key={index}>
            <img
              src={`${item.img}?w=162&auto=format`}
              srcSet={`${item.img}?w=162&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
              style={{
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4,
                display: 'block',
                width: '100%',
              }}
            />
          </div>
        ))}
      </Masonry>
    </Box>
  );
}
