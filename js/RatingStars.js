
/**
 * Rating Star component
 * 
 * @param {number} ratingNumber 
 */
const RatingStars = (ratingNumber = 5) => {

    let checked = (n) => (n <= ratingNumber) ? 'rating__star--checked' : '';
    const stars = [1, 2, 3, 4, 5]; // max number of stars
    let str = '';


    stars.forEach(i => 
        str += /* html */`<span class="fa fa-star rating__star ${checked(i)}"></span>`
    );


    return /* html */`
        <div class="rating">
            ${str}
        </div>
    `;
}

export default RatingStars