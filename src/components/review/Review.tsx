import React from 'react';
import styles from './Review.module.css';
import emptyStarLarge from '../../assets/icons/ic_empty_star_large.svg';
import emptyStarMedium from '../../assets/icons/ic_empty_star_medium.svg';
import miniStarIcon from '../../assets/icons/ic_mini_star.svg';
import reviewBarLarge from '../../assets/icons/ic_review_bar_large.svg';
import reviewBarMedium from '../../assets/icons/ic_review_bar_medium.svg';

const maskUsername = (username: string) =>
  username.length > 3
    ? username.slice(0, 3) + '*'.repeat(username.length - 3)
    : username.replace(username[1], '*');

const formatToKoreanTime = (utcDate: string): string => {
  const date = new Date(utcDate);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: 'Asia/Seoul',
  };
  return new Intl.DateTimeFormat('ko-KR', options).format(date);
};

const StarRating = ({
  rating,
  icon,
  size,
}: {
  rating: number;
  icon: string;
  size: number;
}) => {
  const fullStars = Math.floor(rating);
  const partialStar = rating - fullStars;
  const totalStars = 5;

  return (
    <div className={styles.stars}>
      {[...Array(totalStars)].map((_, index) => {
        const isFull = index < fullStars;
        const isPartial = index === fullStars && partialStar > 0;

        return (
          <div
            key={index}
            className={styles.starWrapper}
            style={{
              WebkitMaskImage: `url(${icon})`,
              maskImage: `url(${icon})`,
              backgroundColor: isFull ? '#FFC149' : '#E0E0E0',
              width: size,
              height: size,
              ...(isPartial && {
                backgroundImage: `linear-gradient(to right, #FFC149 ${
                  partialStar * 100
                }%, #E0E0E0 ${partialStar * 100}%)`,
              }),
            }}
          />
        );
      })}
    </div>
  );
};

const ReviewItem = ({
  review,
}: {
  review: {
    reviewId: string;
    customerName: string;
    createAt: string;
    score: number;
    content: string;
  };
}) => {
  const reviewBar = window.innerWidth > 744 ? reviewBarLarge : reviewBarMedium;
  return (
    <div className={styles.reviewItem}>
      <div className={styles.reviewItemHeader}>
        <span className={styles.username}>
          {maskUsername(review.customerName)}
        </span>
        <img src={reviewBar} alt='Review Icon' className={styles.reviewIcon} />
        <span className={styles.reviewDate}>
          {formatToKoreanTime(review.createAt)}
        </span>
      </div>
      <div style={{ marginTop: '20px' }}>
        <StarRating rating={review.score} icon={miniStarIcon} size={14} />
      </div>
      <div className={styles.reviewComment}>{review.content}</div>
      <div className={styles.divider}></div>
    </div>
  );
};

const Review = ({
  totalReviews,
  averageRating,
  reviewStats,
  reviews,
}: {
  totalReviews: number;
  averageRating: number;
  reviewStats: { [key: string]: number };
  reviews: {
    reviewId: string;
    customerName: string;
    createAt: string;
    score: number;
    content: string;
  }[];
}) => {
  const ratingsBreakdown = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviewStats[rating] || 0,
  }));
  const starIcon = window.innerWidth > 744 ? emptyStarLarge : emptyStarMedium;

  return (
    <div className={styles.reviewSection}>
      <div className={styles.reviewHeader}>리뷰 ({totalReviews})</div>
      <div className={styles.reviewContainer}>
        <div className={styles.leftSection}>
          <div className={styles.averageRating}>
            <span className={styles.averageScore}>
              {averageRating.toFixed(1)}
            </span>
            <span className={styles.averageSeparator}>/</span>
            <span className={styles.maxScore}>5</span>
          </div>
          <StarRating rating={averageRating} icon={starIcon} size={40} />
        </div>
        <div className={styles.rightSection}>
          {ratingsBreakdown.map(({ rating, count }) => {
            const percentage =
              totalReviews > 0 ? (count / totalReviews) * 100 : 0;
            return (
              <div key={rating} className={styles.ratingRow}>
                <span className={styles.ratingLabel}>{rating}점</span>
                <div className={styles.barContainer}>
                  <div
                    className={styles.bar}
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: '#FFC149',
                    }}
                  ></div>
                </div>
                <span className={styles.ratingCount}>{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.reviewList}>
        {reviews.map((review) => (
          <ReviewItem key={review.reviewId} review={review} />
        ))}
      </div>
    </div>
  );
};

export default Review;
