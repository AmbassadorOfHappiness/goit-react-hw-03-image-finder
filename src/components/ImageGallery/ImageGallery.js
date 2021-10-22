import { Component } from "react";
import { PixabayFetch } from '../../services/pexels';
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
// import ApiError from "../ApiError";
// import Idle from "../Idle";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import style from "../ImageGallery/ImageGallery.module.css";


const base_url = `https://pixabay.com/api/`;
const api_key = `23200970-d5201fb8f8a34679c1c031ab0`;
const newPixabayFetch = new PixabayFetch(base_url, api_key);

export class ImageGallery extends Component {
    state = {
        searchResult: [],
        gallery: [],
        error: null,
        loader: false,
        page: 1,
        modalSrc: null,
        status: 'init',
    };

    componentDidUpdate(prevProps, prevState) {
        
        if (prevProps.searchValue !== this.props.searchValue) {
            this.setState({ loader: true })
            newPixabayFetch.resetPage();
            newPixabayFetch.searchQuery = this.props.searchValue;

            newPixabayFetch.searchPhotos()
            // .finally(() => this.setState({ loader: false }))
            .then(gallery => {
                this.setState({ gallery });
            })
                .catch(() => {
                    this.setState({ status: 'error' });
                })
        }

        /* if (this.state.status === "pending") {
            return <Loader
                        type="Puff"
                        color="#00BFFF"
                        height={100}
                        width={100}
                        timeout={3000} //3 secs
                     />;
        } */
    }

    handleClick = () => {
        newPixabayFetch.page = 1;
        newPixabayFetch.searchPhotos()
            .then(gallery => {
                this.setState((prev) => ({ gallery: [...prev.gallery, ...gallery] }));
                this.scrollLandMore();
            })
            .catch(err => {
                this.setState({ status: 'error' });
            });
    }

    handlerModal = (idComp) => {
        this.setState({
            modalSrc: this.state.gallery.find((photo) => photo.id === idComp),
        });
    };

    closeModal = () => {
        this.setState({ modalSrc: null });
    };

    scrollLandMore = () => {
        this.setState((prevState) => ({
            page: prevState.page + 1,
        }));
    };

    render() {
        const { gallery, modalSrc, loader } = this.state;
        return (
            <>
                {loader && <Loader
                        type="Puff"
                        color="#00BFFF"
                        height={100}
                        width={100}
                        timeout={3000} //3 secs
                     />}
                <ul className={style.ImageGallery}>
                    <ImageGalleryItem
                        gallery={gallery}
                        onClickModal={this.handlerModal}>
                    </ImageGalleryItem>
                </ul>
                {gallery.length > 0 && (
                    <Button onClick={this.handleClick}></Button>
                )}
                {modalSrc && (
                    <Modal modalSrc={modalSrc} closeModal={this.closeModal}></Modal>
                )}
            </>
        )
    
    }
}