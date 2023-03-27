const ReviewCard = ({item,icon,title,description}) => {
    return ( 
        <>
        <div className="w-[400px] h-[350px] border">
            <div>
                <img src={item?.icon} alt="" />
            </div>
            <div>
                {item?.title}
            </div>
            <div>
                <img src="/images/star.png" alt="" />
            </div>
            <div>
                {item?.description}
            </div>
        </div>
        </>
     );
}
 
export default ReviewCard;