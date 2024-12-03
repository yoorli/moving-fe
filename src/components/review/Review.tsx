import styles from "./Review.module.css";
import emptyStarLarge from "../../assets/icons/ic_empty_star_large.svg";
import emptyStarMedium from "../../assets/icons/ic_empty_star_medium.svg";
import miniStarIcon from "../../assets/icons/ic_mini_star.svg";
import reviewBarLarge from "../../assets/icons/ic_review_bar_large.svg";
import reviewBarMedium from "../../assets/icons/ic_review_bar_medium.svg";

interface RatingData {
  reviews: { id: number; username: string; rating: number; comment: string; date: string }[];
}

const mockData: RatingData = {
  reviews: [
    { id: 1, username: "songhyekyo", rating: 5, comment: "듣던대로 정말 친절하시고 물건도 잘 옮겨주셨어요~~", date: "2024-11-11" },
    { id: 2, username: "leejia", rating: 4, comment: "기사님 덕분에 안전하고 신속한 이사를 했습니다! 정말 감사합니다~", date: "2024-11-05" },
    { id: 3, username: "hanjimin", rating: 3, comment: "김코드 기사님께 두 번째 받은 견적인데, 항상 친절하시고 너무 좋으세요!", date: "2024-11-21" },
    { id: 4, username: "yoojaeseok", rating: 5, comment: "짐이 많아서 걱정이었는데 김코드 기사님 덕분에 문제없이 이사 잘 할 수 있었어요!", date: "2024-11-27" },
    { id: 5, username: "kanghodong", rating: 4, comment: "역시 리뷰 내용대로 꼼꼼하세요! 감사합니다 :)", date: "2024-11-16" },
  ],
};

const maskUsername = (username: string) =>
  username.slice(0, 3) + "*".repeat(username.length - 3);

const calculateRatings = (reviews: RatingData["reviews"]) => {
  const totalReviews = reviews.length;
  const ratingsBreakdown = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((review) => Math.round(review.rating) === rating).length,
  }));
  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews || 0;

  return { totalReviews, ratingsBreakdown, averageRating };
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
              backgroundColor: isFull ? "#FFC149" : "#E0E0E0",
              width: size,
              height: size,
              ...(isPartial && {
                backgroundImage: `linear-gradient(to right, #FFC149 ${partialStar * 100}%, #E0E0E0 ${partialStar * 100}%)`,
              }),
            }}
          />
        );
      })}
    </div>
  );
};

const ReviewItem = ({ review }: { review: RatingData["reviews"][number] }) => {
  const reviewBar = window.innerWidth > 744 ? reviewBarLarge : reviewBarMedium;
  return (
    <div className={styles.reviewItem}>
      <div className={styles.reviewItemHeader}>
        <span className={styles.username}>{maskUsername(review.username)}</span>
        <img src={reviewBar} alt="Review Icon" className={styles.reviewIcon} />
        <span className={styles.reviewDate}>{review.date}</span>
      </div>
      <div style={{ marginTop: "20px" }}>
        <StarRating rating={review.rating} icon={miniStarIcon} size={14} />
      </div>
      <div className={styles.reviewComment}>{review.comment}</div>
      <div className={styles.divider}></div>
    </div>
  );
};

const Review = () => {
  const { reviews } = mockData;
  const { totalReviews, ratingsBreakdown, averageRating } = calculateRatings(reviews);
  const starIcon = window.innerWidth > 744 ? emptyStarLarge : emptyStarMedium;

  return (
    <div className={styles.reviewSection}>
      <div className={styles.reviewHeader}>리뷰 ({totalReviews})</div>
      <div className={styles.reviewContainer}>
        <div className={styles.leftSection}>
          <div className={styles.averageRating}>
            <span className={styles.averageScore}>{averageRating.toFixed(1)}</span>
            <span className={styles.averageSeparator}>/</span>
            <span className={styles.maxScore}>5</span>
          </div>
          <StarRating rating={averageRating} icon={starIcon} size={40} />
        </div>
        <div className={styles.rightSection}>
          {ratingsBreakdown.map(({ rating, count }) => {
            const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
            return (
              <div key={rating} className={styles.ratingRow}>
                <span className={styles.ratingLabel}>{rating}점</span>
                <div className={styles.barContainer}>
                  <div
                    className={styles.bar}
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: "#FFC149",
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
          <ReviewItem key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default Review;

