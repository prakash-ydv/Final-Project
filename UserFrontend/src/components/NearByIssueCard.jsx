import React from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";

function NearByIssueCard({
  image,
  title,
  category,
  address,
  postedAgo,
  onLike,
  onDislike,
}) {
  return (
    <div className="w-full h-32 flex gap-3 p-3 rounded-lg bg-white shadow-md relative text-sm border border-gray-200">
      {/* Image */}
      <div className="h-full aspect-square bg-gray-100 rounded-lg overflow-hidden">
        <img src={image} alt={title} className="object-cover h-full w-full" />
      </div>

      {/* Details */}
      <div className="flex flex-col justify-between flex-1">
        <div>
          <h2 className="text-base font-semibold truncate text-gray-800">
            {title}
          </h2>
          <p className="w-18 rounded-lg text-xs text-gray-500 mb-1 ">
            {category}
          </p>
          <p className="text-xs text-gray-700 line-clamp-2">{address}</p>
        </div>
        <span className="text-[10px] text-gray-400">{postedAgo}</span>
      </div>

      {/* Action Buttons */}
      <div className="absolute flex gap-3 bottom-2 right-3 text-gray-600">
        <button
          onClick={onLike}
          className="hover:text-blue-600 transition-all"
          title="Like"
        >
          <ThumbsUp size={16} />
        </button>
        <button
          onClick={onDislike}
          className="hover:text-red-600 transition-all"
          title="Dislike"
        >
          <ThumbsDown size={16} />
        </button>
      </div>
    </div>
  );
}

export default NearByIssueCard;
