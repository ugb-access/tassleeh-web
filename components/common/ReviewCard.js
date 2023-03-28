const ReviewCard = ({item,icon,title,description}) => {
    return ( 
        <>
        <div className="w-[320px] h-[300px] border p-6 rounded-2xl">
            <div className="flex justify-center items-center">
                <img src={item?.icon} alt="" />
            </div>
            <div className="flex justify-center items-center text-xl font-bold pt-4">
                {item?.title}
            </div>
            <div className="flex justify-center items-center pt-1">
                <img className="h-3" src="/images/star.png" alt="" />
            </div>
            <div className="flex justify-center items-center text-sm text-center leading-6 py-4">
                {item?.description}
            </div>
        </div>
        </>
     );
}
 
export default ReviewCard;