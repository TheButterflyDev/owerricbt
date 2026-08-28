import Hero from "../components/layout/hero"
import WhyChooseUs from "../components/layout/social-proof"
import Services from "../components/layout/services"
import { BookingCTA } from "../components/layout/subscribe";
import Reviews from "../components/layout/reviews";

export default function Home(){
    return (
        <>  
            <Hero />
            <WhyChooseUs />
            <Services />
            <Reviews />
            <BookingCTA />
        </>
       
    )
}