
/**
 * Rating Star component
 * 
 * @param {number} ratingNumber 
 */
const RatingStars = (ratingNumber = 5) => {

    return /* html */`
        <div class="rating">
            <span class="fa fa-star rating__star rating__star--checked"></span>
            <span class="fa fa-star rating__star rating__star--checked"></span>
            <span class="fa fa-star rating__star rating__star--checked"></span>
            <span class="fa fa-star rating__star rating__star--checked"></span>
            <span class="fa fa-star rating__star"></span>
        </div>
    `;
}

export default RatingStars