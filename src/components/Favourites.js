import React from 'react'
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useSelector, useDispatch } from 'react-redux'
import { remove } from '../app/favouritesList'

const Favourites = () => {

    const favourites = useSelector((state) => state.counter.arr)
    const dispatch = useDispatch()

    const handleRemove = (item) => {
        dispatch(remove(item))
    }

    return (
        <div>

            <Box sx={{ width: 500, height: 600 }}>

                <p className="albums">{favourites.length < 1 ? "Favourites list is empty!" : `You have ${favourites.length} favourite items.`}</p>

                <ImageList sx={{ width: 480, height: 450 }} cols={3} rowHeight={164}>
                    {favourites.map((item) => (
                        <ImageListItem key={item} onClick={() => handleRemove(item)}>
                            <img
                                className="img-container"
                                src={`https://via.placeholder.com/600/${item}?w=248&fit=crop&auto=format`}
                                srcSet={`https://via.placeholder.com/600/${item}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                alt={item}
                                loading="lazy"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Box>


        </div>)
}
export default Favourites;