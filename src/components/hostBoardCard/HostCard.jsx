import React, { useState, useEffect } from 'react';
import './hostCard.css';
import BuyNow from '../buyNow/BuyNow';
import usePagination from '../../useHooks/usePagination';
import Pagination from '../pagination/Pagination';
import Discover from '../discover/Discover';
import axios from 'axios';
import { API_BASE_URL, IMG_BASE_URL } from '../../env';

export default function HostCard() {
    const cardsPerPage = 4;
    const [posts, setPosts] = useState([]);
    const { currentPage, itemsToDisplay, totalPages, goToPage, visiblePageNumbers } = usePagination(posts, cardsPerPage);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/kiuHost`);
                setPosts(response.data.productsWithImages); // Assuming your response has a 'productsWithImages' array
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);


    const viewCard = (productId) => {
        window.location.href = `/products/${productId}`
      };

    return (
        <div className='main-container'>
            <Discover />
            <div className='grid-container-host'>
                {itemsToDisplay.map((postWithImages) => (
                    <div onClick={() => viewCard(postWithImages.product.id)} key={postWithImages.product.id} className='host-card'>
                        <div className='host-card-img-div'>
                                {postWithImages.images.length > 0 && (
                                    <img src={`${IMG_BASE_URL}/uploads/${postWithImages.images[0].image_url}`} alt="Product" />
                                )}
                        </div>
                        <div className='product-text'>
                            <span className='product-username'>{postWithImages.product.nickname}</span>
                            <h2 className='product-title'>{postWithImages.product.product_name}</h2>
                            <span className='product-description'>{postWithImages.product.description}</span>
                            <div className='product-card-bottom-div'>
                                <span className='product-price'>{postWithImages.product.price}</span>

                                <BuyNow productData={postWithImages.product} />
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
