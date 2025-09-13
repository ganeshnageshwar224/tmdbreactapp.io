const HeaderBg = ({image, altText}) =>{
    return(
        <div className="bg-header">
            <img className="w-100 h-100" src={image} alt={altText || "Slider Image"} />
        </div>
    )
}

export default HeaderBg