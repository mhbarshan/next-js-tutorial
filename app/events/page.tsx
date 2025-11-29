

import React, { Suspense } from "react";
import EventCard from "@/app/components/EventCard";
import { IEvent } from "@/database";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// Async child component
const EventList = async () => {
  const res = await fetch(`${BASE_URL}/api/events`, {
    cache: "no-store", // runtime fetch
  });
  const { events } = await res.json();

  return (
    <>
      {events.map((event: IEvent) => (
        <span key={event.title}>
          <EventCard {...event} />
        </span>
      ))}
    </>
  );
};

// Top-level page is now non-async
const EventsPage = () => {
  return (
    <section>
      <h1 className="text-center mb-5">All Events</h1>
      <p className="text-center text-light-100 mb-10">
        Discover and explore all upcoming hackathons, meetups, and conferences
      </p>
      <div className="mt-7 space-y-7">
        <Suspense fallback={<p>Loading events...</p>}>
          <ul className="events">
            <EventList />
          </ul>
        </Suspense>
      </div>
    </section>
  );
};

export default EventsPage;
