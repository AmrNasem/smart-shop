import React from 'react'
import styles from "../styles/timer.module.css"
import img_G from "../assets/Timer_G.png"
import img_B from "../assets/Timer_B.png"
import { useEffect } from 'react'
import { useState } from 'react'
const Timer = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    const futureDate = new Date(2025, 1, 1, 1, 40, 0).getTime();

    const calculateTimeLeft = () => {
        const now = new Date().getTime();
        const difference = futureDate - now;

        if (difference > 0) {
            const oneDay = 24 * 60 * 60 * 1000;
            const oneHour = 60 * 60 * 1000;
            const oneMinute = 60 * 1000;

            const days = Math.floor(difference / oneDay);
            const hours = Math.floor((difference % oneDay) / oneHour);
            const minutes = Math.floor((difference % oneHour) / oneMinute);
            const seconds = Math.floor((difference % oneMinute) / 1000);

            setTimeLeft({ days, hours, minutes, seconds });
        } else {
            setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        }
    };

    useEffect(() => {
        const timer = setInterval(() => {
            calculateTimeLeft();
        }, 1000);

        return () => clearInterval(timer);
    }, []);
    return (
        <div className={styles.container}>
            <div className={styles.img}>
                <img src={img_G} style={{ bottom: "5%" }} />
            </div>
            <div className={styles.txt}>
                <h3>اكبر خصم علي الاطلاق</h3>
                <h1>احدث ملابس الاطفال</h1>
                <div className={styles.btns}>
                    <div className={styles.btn}>
                        <h1 id="d">{timeLeft.days}</h1>
                        <p>يوم</p>
                    </div>
                    <div className={styles.btn}>
                        <h1 id="h">{timeLeft.hours}</h1>
                        <p>ساعة</p>
                    </div>
                    <div className={styles.btn}>
                        <h1 id="m">{timeLeft.minutes}</h1>
                        <p>دقيقة</p>
                    </div>
                    <div className={styles.btn}>
                        <h1 id="s">{timeLeft.seconds}</h1>
                        <p>ثانيه</p>
                    </div>
                </div>
                <button>تسوق الان</button>
            </div>
            <div className={styles.img}>
                <img src={img_B} style={{ bottom: "0", left: "1%" }} />
            </div>
        </div>
    )
}

export default Timer
