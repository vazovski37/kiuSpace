import React from 'react';
import BuyNow from '../buyNow/BuyNow';
import usePagination from '../../useHooks/usePagination'; // Import the custom hook
import Pagination from '../pagination/Pagination';
import './helpCard.css';
import Enroll from '../enroll/Enroll';
import Discover from '../discover/Discover';

// Sample host card data
const helpCardData = Array.from({ length: 36 }, (_, index) => ({
  id: index + 1,
  imgurl: 'https://picsum.photos/400',
  username: `User ${index + 1}`,
  productTitle: `Product Title ${index + 1}`,
  productDescription: `Description lo lorem ipsum some shiti shij sdcsdv vweivwn wiena asiudnc iasudnc aiusdnic iunaois ao s soisudb ap sdbus pas duais dapisud cap aisu dapisdu caiusd aaisu daisd casa sdica sid asid aisduab sdai saius daisdc asidisdappqod q Product ${index + 1}`,
  productPrice: `$${(index + 1) * 10}`,
}));

console.log(helpCardData)

export default function HelpCard() {
  const cardsPerPage = 4;

  // Call the usePagination custom hook
  const { currentPage, itemsToDisplay, totalPages, goToPage, visiblePageNumbers } = usePagination(helpCardData, cardsPerPage);

  return (
    <div className='main-container'>
        <Discover />
      <div className='grid-container-help'>
        {itemsToDisplay.map((helpCard) => (
        <div key={helpCard.id} className='help-card'> {/* Change the class name here */}
            <div className='product-image'>
            <img src={helpCard.imgurl} alt="" />
            </div>
            <div className='product-text'>
            <span className='product-username'>{helpCard.username}</span>
            <h2 className='product-title'>{helpCard.productTitle}</h2>
            <span className='product-description'>{helpCard.productDescription}</span>
            <div className='product-card-bottom-div'>
                <span className='product-price'>{helpCard.productPrice}</span>
                <Enroll productData={helpCard} />
            </div>
            </div>
        </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        goToPage={goToPage}
        visiblePageNumbers={visiblePageNumbers}
      />
    </div>
  );
}
