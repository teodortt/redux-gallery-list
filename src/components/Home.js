import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import SnackBar from '../components/SnackBar'

import { useDispatch } from 'react-redux'
import { add } from '../app/favouritesList'

const style = {
    position: 'absolute',
    marginTop: 110,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function App() {

    const dispatch = useDispatch()

    const [data, setData] = useState([])
    const [albumData, setAlbumData] = useState([])


    const [open, setOpen] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleOpen = (item) => {
        const albumById = data.filter(it => it.albumId === item).map(it => it);
        setOpen(true);
        setAlbumData(albumById)
    }
    const handleClose = () => setOpen(false);

    const addToFavourites = (item) => {
        dispatch(add(item))
        setOpenSnackbar(true)
    }

    useEffect(() => {

        fetch("https://jsonplaceholder.typicode.com/photos")
            .then(res => res.json())
            .then(data => setData(data))

    }, [])

    const findUnique = data.reduce((arr, obj) => {
        if (!arr.find(item => item.albumId === obj.albumId)) {
            arr.push(obj);
        }
        return arr;
    }, [])


    return (
        <div>
            <SnackBar open={openSnackbar} setOpen={setOpenSnackbar} />
            <main >
                <Modal
                    open={open}
                    style={{ overflow: 'scroll' }}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Gallery images
                        </Typography>

                        <div className="grid">
                            {albumData.map(item =>
                                <article key={item.url} >
                                    <img src={item.url} alt={item.url} loading="lazy" />
                                    <div className="text">
                                        <p style={{ fontSize: 10, height: 50 }}>{item.title}</p>
                                        <Button variant="outlined" size="small" onClick={() => addToFavourites(item.url.slice(32, 38))}>Add to list</Button>
                                    </div>
                                </article>
                            )}
                        </div>

                    </Box>
                </Modal>

                <Box sx={{ width: 480, height: 600 }}>
                    <p className="albums">Albums</p>
                    <ImageList sx={{ width: 480, height: 450 }} cols={3} rowHeight={164}>
                        {findUnique.map((item) => (
                            <ImageListItem key={item.thumbnailUrl} onClick={() => handleOpen(item.albumId)}>
                                <img
                                    className="img-container"
                                    src={`${item.thumbnailUrl}?w=248&fit=crop&auto=format`}
                                    srcSet={`${item.thumbnailUrl}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                    alt={item.title}
                                    loading="lazy"
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Box>

            </main>


        </div >
    )
}
