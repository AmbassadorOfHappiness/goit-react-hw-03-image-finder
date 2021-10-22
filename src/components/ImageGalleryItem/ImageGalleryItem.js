import style from '../ImageGalleryItem/ImageGalleryItem.module.css';

function ImageGalleryItem({ gallery, onClickModal }) {
    return gallery.map((el) => (
        <li key = { el.id } className={style.ImageGalleryItem} >
            <img
                src={el.webformatURL}
                alt={el.user}
                onClick={() => onClickModal(el.id)}
                className={style.ImageGalleryItemImage} />
        </li >
    ));
}

export default ImageGalleryItem;