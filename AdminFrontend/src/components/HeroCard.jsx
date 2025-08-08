function HeroCard(props) {
  const bgColorMap = {
    blue: "bg-blue-200",
    orange: "bg-orange-200",
    green: "bg-green-200",
    purple: "bg-purple-200",
  };

  const textColorMap = {
    blue: "text-blue-500",
    orange: "text-orange-500",
    green: "text-green-500",
    gray: "text-gray-500",
  };

  return (
    <div className="flex items-center p-5 justify-between border border-gray-100 shadow-md rounded-lg">
      <div className="flex flex-col gap-2">
        <p className="text-gray-600 roboto text-sm ">{props.title}</p>
        <h1 className="font-bold text-3xl">{props.number}</h1>
        <small className={`${textColorMap[props.textColor]}`}>
          {props.text}
        </small>
      </div>

      <div className={`${bgColorMap[props.color]} p-2 rounded-2xl`}>
        {props.logo}
      </div>
    </div>
  );
}
export default HeroCard;
