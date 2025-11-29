import React from "react";
import ExploreButton from "@/app/components/ExploreButton";
import EventCard from "@/app/components/EventCard";
import { IEvent } from "@/database";
import events from "@/lib/constant";


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Home = async () => {
  "use cache"
  // const response = await fetch(`${BASE_URL}/api/events`, {
  //   cache: "no-store",
  // });

  // const { events } = await response.json();

  return (
    <section>
      <h1 className="text-center">
        The Hub for Every Dev <br /> Event you Can't miss
      </h1>
      <p className="text-center mt-5">
        Hackathons, meetups, and Conferences, All in One Place
      </p>
      <ExploreButton />
      <div className="mt-7 space-y-7">
        <h3>Featured Events</h3>
        <ul className="events">
          {events &&
            events.length > 0 &&
            events.map((event: IEvent) => {
              return (
                <span key={event.title}>
                  {" "}
                  <EventCard {...event} />
                </span>
              );
            })}
        </ul>
      </div>
    </section>
  );
};
export default Home;
