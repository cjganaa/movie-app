"use client";
import { useParams } from "next/navigation";
import { Header } from "../heater";
import { Footer } from "../footer";

export default function Home(){
    const { genres } = useParams();
    console.log(genres);
    return(
        <div>
            <Header/>
            {genres}
            <Footer/>
        </div>
    )
}