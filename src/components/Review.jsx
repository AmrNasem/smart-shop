import React from 'react'
import '../css/Review.css'
import { NavLink } from 'react-router-dom'
import { useState, useRef } from 'react'
import revImg from '../images/Ellipse 190revImg.png'
import img2 from '../images/Rectangle 3691p6.png'
import img1 from '../images/Rectangle 3690mainProduct.png'
import img3 from '../images/Rectangle 3693p4.png'
import img4 from '../images/Rectangle 3692p5.png'

function Review() {
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
                  reviewDate:"9 اغسطس, 2022 "
                },{
                    reviewRate: 5,
                    reviewTitle: "منتج رائع. التعبئة والتغليف كانت جيدة أيضا!",
                    reviewText:"مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق ",
                    reviewName:"احمد بلال ",
                    reviewDate:"9 اغسطس, 2022 "
                  },{
                    reviewRate: 5,
                    reviewTitle: "منتج رائع. التعبئة والتغليف كانت جيدة أيضا!",
                    reviewText:"مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق ",
                    reviewName:"احمد بلال ",
                    reviewDate:"9 اغسطس, 2022 "
                  }
              ]
        }
    ]

    const x = <i class="fa-regular fa-star"></i>
    const star = 5;
    const starHandler = (e) => {
        [...e.target.parentNode.children].map((star)=> {if(star.classList.contains('fa-solid')){
            star.classList.remove('fa-solid');
           star.classList.add('fa-regular');
       }});
         e.target.classList.remove('fa-regular');
         e.target.classList.add('fa-solid');
        [...e.target.parentNode.children].map((star,index )=> {if(star.classList.contains('fa-solid')){ [...e.target.parentNode.children].map((ele,ind)=>{if(ind<=index){ele.classList.remove('fa-regular'); ele.classList.add('fa-solid')}})}
        })
    }
    const y = 0;

    const [Revs, setRevs] = useState(y)
    // const [RevTitle, setRevTitle] = useState("")
    // const [RevText, setRevText] = useState("")
    // const [RevName, setRevName] = useState("")
    // const [RevMail, setRevMail] = useState("")

    const STitle=useRef(null)
    const SText=useRef(null)
    const SName=useRef(null)
    const SMail=useRef(null)
    const Reviews=useRef(null)
    
//     const RevTitleHandeler = (e) => {
// setRevTitle(e.target.value)
//     }
//     const RevTextHandeler = (e) => {
// setRevText(e.target.value)
        
//     }
//     const RevNameHandeler = (e) => {
// setRevName(e.target.value)
    
//     }
//     const RevMailHandeler = (e) => {
// setRevMail(e.target.value)
//     }
    const addRevHandeler = (e) => {
        setRevs(prev => prev + 1)
        Reviews.current.style.overflowY="auto"
    }

    return (
        <>
            {/* ParentReview */}
            <div className="review">
                <div className="reviewTitles">
                    <NavLink to="/" className="reviews1" style={{ borderBottom: "2px solid #00000045" }}>تقييمات المنتج </NavLink>
                    <NavLink to="/" className="reviews2">معلومات اضافية </NavLink>
                    <NavLink to="/" className="reviews3">الوصف </NavLink>
                </div>
                {/* addReview */}
                <div className="addReview">
                    <h2 className="addR proName" style={{ fontWeight: "500", fontSize: "22px", color: "rgba(0, 0, 0, 0.678)" }}>اضف تقييم </h2>
                    <h4 className="yourR proName" style={{ height:"80px",fontWeight: "500",fontSize:"18px", position: "relative", color: "rgba(0, 0, 0, 0.678)" }}>تقييمك  {[...Array(star)].map(()=><i style={{ display: "inline-block" }} onClick={starHandler} class="fa-regular fa-star"></i>)}</h4>
                    <input type="text" name="ratingTitle" ref={STitle}  placeholder='عنوان التقييم'  className="ratingTitle" style={{ display: "block", width: "80%", padding: "2% 7%", border: "1px solid rgba(0, 0, 0, 0.2)", borderRadius: "3vh", position: "relative", bottom: "8%",fontWeight: "500" }} />
                    <input type="text" name="ratingText" ref={SText}   placeholder='اكتب تقييمك هنا'  className="ratingText" style={{ display: "block", width: "80%", height: "150px", padding: "0 7%", paddingBottom: "110px", border: "1px solid rgba(0, 0, 0, 0.2)", borderRadius: "3vh", position: "relative", bottom: "4%",fontWeight: "500" }} />
                    <input type="text" name="ratingName" ref={SName}   placeholder='اسمك'  className="ratingName" style={{ width: "35%", padding: "2% 5%", border: "1px solid rgba(0, 0, 0, 0.2)", borderRadius: "3vh", position: "relative",fontWeight: "500"}} />
                    <input type="text" name="ratingMail" ref={SMail}  placeholder='بريدك الالكتروني' className="ratingMail" style={{ width: "40%", padding: "2% 7%", border: "1px solid rgba(0, 0, 0, 0.2)", borderRadius: "3vh", position: "relative", right: "5%",fontWeight: "500" }} />
                    <div className="addRev buyNow proName" data-name="addRev" onClick={addRevHandeler} style={{ position: "relative", top: "3%", width: "27%", borderRadius: "3vh", padding: "3px 0" }} >أضف الان</div>
                </div>
                {/* Existed_reviews */}
                <div className="reviews" ref={Reviews}>
                    <h2 className="addR proName" style={{ textAlign: "end", width: "100%", fontWeight: "500", fontSize: "20px",position:"relative",top:"20px", color: "rgba(0, 0, 0, 0.678)" }}>({Revs+3}) تقييمات </h2>
                  
                    {productDetails[0].reviews.map(rev=><div className='reviewDiv' >
                        <img src={revImg} alt='#' style={{ display: "inline-block", height: '90px', width: "90px", position: "relative", left: "20px" }}></img>
                        <div>    <h2 className="addR proName" style={{ width: "100%", fontWeight: "500", fontSize: "20px", color: "rgba(0, 0, 0, 0.678)" }}>{rev.reviewTitle}</h2>
                            <h2 className="addR proName" style={{ width: "84%", fontWeight: "500", fontSize: "19px", color: "rgba(0, 0, 0, 0.4)" }}>{rev.reviewText}</h2>
                            <h4 className="yourR proName" style={{ fontWeight: "500", position: "relative", bottom: "10px", left: '10px', color: "rgba(0, 0, 0, 0.678)" }}>{[...Array(rev.reviewRate)].map(() => <i class="fa-solid fa-star"></i>)}</h4>
                            <h4 className="yourR proName" style={{ fontWeight: "500", fontSize: "19px", position: "relative", color: "rgba(0, 0, 0, 0.678)" }}>{rev.reviewName}<h4 style={{ color: " rgba(0, 0, 0, 0.4)", display: "inline-block", fontSize: "17px", position: "relative", right: "5%", top: "1px" }}>{rev.reviewDate}</h4></h4>
                        </div>
                    </div>)}
                   
                    {[...Array(Revs)].map(() => <div className='reviewDiv' >
                        <img src={revImg} alt='#' style={{ display: "inline-block", height: '90px', width: "90px", position: "relative", left: "20px", top: "25px" }}></img>
                        <div>    <h2 className="addR proName" style={{ width: "100%", fontWeight: "500", fontSize: "20px", color: "rgba(0, 0, 0, 0.678)" }}>{STitle.current.value}</h2>
                            <h2 className="addR proName" style={{ width: "64%", fontWeight: "500", fontSize: "20px", color: "rgba(0, 0, 0, 0.4)" }}>{SText.current.value}</h2>
                            <h4 className="yourR proName" style={{ fontWeight: "500", position: "relative", bottom: "10px", left: '10px', color: "rgba(0, 0, 0, 0.678)" }}>{[...Array(star)].map(() => <i class="fa-solid fa-star"></i>)}</h4>
                            <h4 className="yourR proName" style={{ fontWeight: "500", position: "relative", bottom: "50px", fontSize: "17px", color: "rgba(0, 0, 0, 0.678)" }}>{SName.current.value}<h4 style={{ color: " rgba(0, 0, 0, 0.4)", display: "inline-block", fontSize: "17px", position: "relative", right: "5%", top: "1px" }}>9 اغسطس, 2022 </h4></h4>
                        </div>
                    </div>)}

                </div>

            </div>
        </>
    )
}

export default Review