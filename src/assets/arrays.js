import ImgBilletera01 from './img/billeteras/Billetera03.webp';
import ImgBilletera02 from './img/billeteras/Billetera02.webp';
import ImgBilletera03 from './img/billeteras/Billetera04.webp';
import ImgBilletera04 from './img/billeteras/Billetera01.webp';
import ImgBilletera05 from './img/billeteras/Billetera05.webp';
import ImgCinturon01 from './img/cinturones/Cinturon01.webp';
import ImgCinturon02 from './img/cinturones/Cinturon04.webp';
import ImgCinturon03 from './img/cinturones/Cinturon02.webp';
import ImgCinturon04 from './img/cinturones/Cinturon03.webp';

const productos = [
    {
        'id':1,
        'categoria':'billeteras',
        'nombre': 'Billetera Rusty Simplicity Marron',
        'precio': 3890,
        'stock': 10,
        'marca': 'Rusty',
        'modelo':'Simplicity',
        'imgURL': ImgBilletera01,
        'alt': 'ImgBilletera01',
        'informacion':'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium velit labore distinctio possimus. Voluptate cumque magni assumenda, sed unde quae iste omnis nisi facere inventore reiciendis officia quaerat ex quis!'
    },
    {
        'id':2,
        'categoria':'billeteras',
        'nombre': 'Billetera Hombre Duogan Tarjetero Monedero Eco Cuero',
        'precio': 2280,
        'stock': 6,
        'marca': 'Duogan',
        'modelo':'Retro',
        'imgURL': ImgBilletera02,
        'alt': 'ImgBilletera02',
        'informacion':'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium velit labore distinctio possimus. Voluptate cumque magni assumenda, sed unde quae iste omnis nisi facere inventore reiciendis officia quaerat ex quis!'
    },
    {
        'id':3,
        'categoria':'billeteras',
        'nombre': 'Billetera Bioworld PlayStation One grey poliéster y poliuretano',
        'precio': 1890,
        'stock': 3,
        'marca': 'Bioworld',
        'modelo':'PlayStation One',
        'imgURL': ImgBilletera03,
        'alt': 'ImgBilletera03',
        'informacion':'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium velit labore distinctio possimus. Voluptate cumque magni assumenda, sed unde quae iste omnis nisi facere inventore reiciendis officia quaerat ex quis!' 
    },
    {
        'id':4,
        'categoria':'billeteras',
        'nombre': 'Billetera Walla Vintage black y silver cuero',
        'precio': 4899,
        'stock': 6,
        'marca': 'Walla',
        'modelo':'Vintage',
        'imgURL': ImgBilletera04,
        'alt': 'ImgBilletera04',
        'informacion':'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium velit labore distinctio possimus. Voluptate cumque magni assumenda, sed unde quae iste omnis nisi facere inventore reiciendis officia quaerat ex quis!'
    },
    {
        'id':5,
        'categoria':'billeteras',
        'nombre': 'Billetera Los Robles Polo Time 0076 marrón cuero',
        'precio': 5990,
        'stock': 7,
        'marca': 'Los Robles',
        'modelo':'Polo Time',
        'imgURL': ImgBilletera05,
        'alt': 'ImgBilletera05',
        'informacion':'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium velit labore distinctio possimus. Voluptate cumque magni assumenda, sed unde quae iste omnis nisi facere inventore reiciendis officia quaerat ex quis!'
    },
    {
        'id':6,
        'categoria':'cinturones',
        'nombre': 'Cinto De Cuero Hombre Talles Grandes Hasta 180cm',
        'precio': 1850,
        'stock': 11,
        'marca': 'Jonaro Jeans',
        'modelo':'Cinturon liso de cuero',
        'imgURL': ImgCinturon01,
        'alt': 'ImgCinturon01',
        'informacion':'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium velit labore distinctio possimus. Voluptate cumque magni assumenda, sed unde quae iste omnis nisi facere inventore reiciendis officia quaerat ex quis!'
    },
    {
        'id':7,
        'categoria':'cinturones',
        'nombre': 'Cinto Hombre Studebaker Cuero Vaqueta Hebilla Gastada',
        'precio': 1024,
        'stock': 5,
        'marca': 'Studebaker',
        'modelo':'Casual',
        'imgURL': ImgCinturon02,
        'alt': 'ImgCinturon02',
        'informacion':'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium velit labore distinctio possimus. Voluptate cumque magni assumenda, sed unde quae iste omnis nisi facere inventore reiciendis officia quaerat ex quis!'
    },
    {
        'id':8,
        'categoria':'cinturones',
        'nombre': 'Cinto De Cuero Hombre Con Tachas',
        'precio': 1780,
        'stock': 21,
        'marca': 'Jonaro Jeans',
        'modelo':'Cinturon Remache',
        'imgURL': ImgCinturon03,
        'alt': 'ImgCinturon03',
        'informacion':'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium velit labore distinctio possimus. Voluptate cumque magni assumenda, sed unde quae iste omnis nisi facere inventore reiciendis officia quaerat ex quis!'
    },
    {
        'id':9,
        'categoria':'cinturones',
        'nombre': 'Cinto De Vestir Hombre Cuero Reversible Talle Especial',
        'precio': 1899,
        'stock': 2,
        'marca': 'Fabricantes Directos',
        'modelo':'Moderno',
        'imgURL': ImgCinturon04,
        'alt': 'ImgCinturon04',
        'informacion':'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium velit labore distinctio possimus. Voluptate cumque magni assumenda, sed unde quae iste omnis nisi facere inventore reiciendis officia quaerat ex quis!'
    }
];

export {productos};