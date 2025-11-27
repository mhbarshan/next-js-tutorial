import React from 'react'
import ExploreButton from "@/app/components/ExploreButton";
import EventCard from "@/app/components/EventCard";
import events from "@/lib/constant";

// const events= [
//
//     {image:'/images/event1.png', title: 'Event 1',
//     slug:'event-1', location:'location-1',
//     date:'date-1', time:'time-1'},
//
//
//
//     {image:'/images/event2.png', title: 'Event 2',  slug:'event-2', location:'location-2',
//         date:'date-2', time:'time-2'},
// ]

const Home = () => {
    console.log("What component I am")

    return (

        <section>
            <h1 className='text-center'>
                The Hub for Every Dev <br/> Event you Can't miss
            </h1>
            <p className='text-center mt-5'>
                Hackathons, meetups, and Conferences, All in One Place
            </p>
            <ExploreButton/>
            <div className="mt-7 space-y-7">
                <h3>Featured Events</h3>
                <ul className="events">
                    {
                        events.map((event) => {
                            return <span key={event.title}> <EventCard {...event}/></span>;
                        })
                    }
                </ul>
            </div>
        </section>


    )
}
export default Home
