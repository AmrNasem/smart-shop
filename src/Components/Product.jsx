import React from 'react'
import { NavLink } from 'react-router-dom'
import "../css/Product.css"
import { useState } from 'react'
import img2 from '../images/Rectangle 3691p6.png'
import img1 from '../images/Rectangle 3690mainProduct.png'
import img3 from '../images/Rectangle 3693p4.png'
import img4 from '../images/Rectangle 3692p5.png'
function Product({ product}) {
    const productDetails = [
        {
            id: 1,
            color: "blue",
            title: "فستان ازرق عصري ",
            price: 2500,
            discount: .6,
            rate: 5,
            about: "مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق ",
            path: [img1, img2, img3, img4],
            weight: ["2 كيلو", "3 كيلو ", "5 كيلو "],
            reviews: [
                {
                  reviewRate: 5,
                  reviewTitle: "منتج رائع. التعبئة والتغليف كانت جيدة أيضا!",
                  reviewText:"مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق ",
                  reviewName:"احمد بلال ",
                  reviewDate:">9 اغسطس, 2022 "
                }
              ]
        }
    ]
    console.log(product);


    const [count, setCount] = useState(1)
    const [MainImg, setMainImg] = useState(productDetails[0].path[0])

    const WColorHandler = (e) => {
        [...e.target.parentNode.children].map(element => {
            element.style.backgroundColor = "white"
        });

        e.target.style.backgroundColor = "gray"


    }
    const MainImgHandler = (e) => {
        setMainImg(e.target.src)
    }

    const addFavHandler = (e) => {
        e.target.style.color = "blue"
    }

    const countHandler = (e) => {
        if (e.target.dataset.name == "+") {
            setCount(prev => prev + 1)
        }
        else if (e.target.dataset.name == "-") { setCount(prev => prev > 1 ? prev - 1 : prev = 1) }
    }
    const star =5; // Or something else
    return (
        <>
            <div className="productDiv">
                <div className="aboutPro">
                    <div className="details" style={{ direction: "rtl" }}>
                        <h1 className="proName">{productDetails[0].title}</h1>
                        <h5 className="Price">{productDetails[0].discount * productDetails[0].price} ج.م -</h5> <h5 className='Price'><s>{productDetails[0].price} ج.م </s> </h5>
                        <div className="star">
                            {[...Array(star)].map((ele,index) =>{if(index+1<=productDetails[0].rate){return <h3><i class="fa-solid fa-star"></i></h3>}
                        else if(productDetails[0].rate<1){return <h3><i class="fa-regular fa-star"></i></h3>}})}
                            (50)
                        </div>
                        <h3 className="aboutProduct proName">{productDetails[0].about}</h3>
                        <h3 className="colorProduct proName">اللون : </h3>
                        <div className="colors">
                            {productDetails[0].path.map(path => <img className='colorImg' onClick={MainImgHandler} src={path} alt="#"></img>)}

                        </div>
                        <h3 className="weightProduct proName">الوزن : </h3>
                        <div className="weights">
                            {productDetails[0].weight.map(w => <NavLink to="/" className={'weight1'} onClick={WColorHandler}>{w}</NavLink>)}
                        </div>
                        <div className="Counter">
                            <div className="inc" data-name="+" onClick={countHandler} style={{ userSelect: "none", cursor: "pointer", backgroundColor: "rgba(217, 217, 217, 0.5)", borderLeft: "1px solid #00000020", padding: "0 7px" }}> + </div>
                            <div className="count" style={{ userSelect: "none", padding: "0 3px" }}>{count}</div>
                            <div className="dec" data-name="-" onClick={countHandler} style={{ userSelect: "none", cursor: "pointer", backgroundColor: "rgba(217, 217, 217, 0.5)", borderRight: "1px solid #00000020", padding: "0 8px" }}> - </div>
                        </div>
                        <div className="addCart proName" data-name="addCart">اضف للسلة </div>
                        <div className="addFav proName" data-name="addFav" onClick={addFavHandler}><i onClick='{addFavHandler}' class="fa-solid fa-heart favHeart" ></i> اضف للمفضلة</div>
                        <div className="buyNow proName" data-name="buyNow">اشتري الان</div>
                        <div className="socialMedia">
                            <h1 className='proName' style={{ width: "50%", fontWeight: "600", fontSize: "20px" }}> شارك عبر مواقع التواصل </h1>
                            <div className="socialIcons" style={{
                                display: "flex"
                                , gap: "10px"
                            }}>
                                <NavLink to="/"> <img
                                    src={require("../assets/Twitter.png")}
                                    alt="Twitter"
                                    style={{ width: "35px", height: "35px" }}
                                    className="d-block"
                                /></NavLink>
                                <NavLink to="/"><img
                                    src={require("../assets/Facebook.png")}
                                    alt="Facebook"
                                    style={{ width: "35px", height: "35px" }}
                                    className="d-block"
                                /></NavLink>
                                <NavLink to="/"><img
                                    src={require("../assets/Youtube.png")}
                                    alt="Youtube"
                                    style={{ width: "35px", height: "35px" }}
                                    className="d-block"
                                /></NavLink>
                                <NavLink to="/"><img
                                    src={require("../assets/Whatsapp.png")}
                                    alt="Whatsapp"
                                    style={{ width: "35px", height: "35px" }}
                                    className="d-block"
                                /></NavLink>




                            </div>
                        </div>

                    </div>
                </div>
                <div className="proImg" style={{ gridTemplateColumns: `repeat(${productDetails[0].path.length},17%)` }}>
                    <img className='mainImg' src={MainImg} alt="#"></img>
                    {productDetails[0].path.map(path => <img className='Img2' onClick={MainImgHandler} src={path} alt="#"></img>)}
                </div>

            </div>
        </>
    )
}

export default Product
