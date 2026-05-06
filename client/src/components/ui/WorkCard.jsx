const WorkCard = ({  image, title, description }) => {
  return (
    <div className="flex flex-col items-center group">
      <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 transition-all duration-300 h-full w-full hover:shadow-2xl hover:scale-105">
        <div className="relative mb-6">
          
          <img
            src={image}
            alt={title}
            className="w-full h-64 object-contain mb-8 group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-orange-600 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-600 text-base max-w-sm leading-relaxed mx-auto">{description}</p>
      </div>
    </div>
  );
};

export default WorkCard;
