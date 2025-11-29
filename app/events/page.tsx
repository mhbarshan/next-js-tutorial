"use cache"
import EventCard from "@/app/components/EventCard";
import { IEvent } from "@/database";

export const dynamic = "force-dynamic";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventsPage = async () => {
  const response = await fetch(`${BASE_URL}/api/events`);

  const { events } = await response.json();

  return (
    <section>
      <h1 className="text-center mb-5">All Events</h1>
      <p className="text-center text-light-100 mb-10">
        Discover and explore all upcoming hackathons, meetups, and conferences
      </p>
      <div className="mt-7 space-y-7">
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
export default EventsPage;
