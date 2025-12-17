import { createFileRoute } from "@tanstack/react-router";

export const Route= createFileRoute('/Contact')({
    component: Contact,
})



function Contact(){
    return(
        <div>
            <h1>Hello contact!</h1>
        </div>
    )

}