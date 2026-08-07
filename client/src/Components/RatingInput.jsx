import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const RatingInput = ({ value, onChange }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          size={22}
          className={`cursor-pointer transition-colors ${
            star <= (hover || value) ? "text-warning" : "text-base-300"
          }`}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(star)}
        />
      ))}
    </div>
  );
};

export default RatingInput;
