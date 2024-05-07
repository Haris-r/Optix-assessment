import React, { useState } from "react";

interface IReviewForm {
  onSubmit: (review: string) => void;
  submitting: boolean;
}

function ReviewForm({ onSubmit, submitting }: IReviewForm) {
  const [reviewMessage, setReviewMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setReviewMessage(value);

    if (e.target.value.length >= 100) {
        setErrorMessage("Message cannot be over 100 characters");
      } else {
        setErrorMessage("");
      }
      setReviewMessage(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (reviewMessage.trim() === "") {
      return;
    }
    onSubmit(reviewMessage.trim());
    setReviewMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Review:
        <input
          type="text"
          value={reviewMessage}
          onChange={handleChange}
          maxLength={100}
          disabled={submitting}
        />
        {errorMessage && <p>{errorMessage}</p>}
        <button type="submit" disabled={submitting || reviewMessage.length >= 100}>
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </label>
    </form>
  );
}

export default ReviewForm;
