import React, { Suspense } from "react";
import ExploreButton from "@/app/components/ExploreButton";
import EventCard from "@/app/components/EventCard";
import { IEvent } from "@/database";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// Async component only for runtime fetch
const EventList = async () => {
  const res = await fetch(`${BASE_URL}/api/events`, {
    cache: "no-store", // ensures runtime fetch
  });
  const { events } = await res.json();

  return (
    <div className="events">
      {events.map((event: IEvent) => (
        <span key={event.title}>
          <EventCard {...event} />
        </span>
      ))}
    </div>
  );
};

// Home is now non-async
const Home = () => {
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
        <Suspense fallback={<p>Loading events...</p>}>
          {/* Async child component */}
          <EventList />
        </Suspense>
      </div>
    </section>
  );
};

export default Home;
