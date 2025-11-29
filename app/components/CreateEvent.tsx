"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import posthog from "posthog-js";

const CreateEvent = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    overview: "",
    venue: "",
    location: "",
    date: "",
    time: "",
    mode: "offline",
    audience: "",
    organizer: "",
    tags: "",
    agenda: "",
    image: null as File | null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("description", formData.description);
      form.append("overview", formData.overview);
      form.append("venue", formData.venue);
      form.append("location", formData.location);
      form.append("date", formData.date);
      form.append("time", formData.time);
      form.append("mode", formData.mode);
      form.append("audience", formData.audience);
      form.append("organizer", formData.organizer);
      form.append(
        "tags",
        JSON.stringify(formData.tags.split(",").map((tag) => tag.trim()))
      );
      form.append(
        "agenda",
        JSON.stringify(formData.agenda.split(",").map((item) => item.trim()))
      );
      if (formData.image) {
        form.append("image", formData.image);
      }

      const response = await fetch("/api/events", {
        method: "POST",
        body: form,
      });               

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create event");
      }

      const data = await response.json();
      setSubmitted(true);
      posthog.capture("event_created", {
        eventId: data.event._id,
        title: formData.title,
      });

      setTimeout(() => {
        router.push(`/event/${data.event.slug}`);
      }, 1500);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      posthog.captureException(
        new Error(`Event creation failed: ${errorMessage}`)
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="create-event">
      {submitted ? (
        <div className="success-message">
          <p className="text-lg font-semibold text-green-500">
            Event created successfully!
          </p>
          <p className="text-sm text-light-200">Redirecting to event page...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>Create a New Event</h2>

          {error && <p className="error-message text-red-500 mb-4">{error}</p>}

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="title">Event Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter event title"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="organizer">Organizer Name *</label>
              <input
                type="text"
                id="organizer"
                name="organizer"
                value={formData.organizer}
                onChange={handleInputChange}
                placeholder="Enter organizer name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter detailed description (max 1000 characters)"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="overview">Overview *</label>
              <textarea
                id="overview"
                name="overview"
                value={formData.overview}
                onChange={handleInputChange}
                placeholder="Enter event overview (max 500 characters)"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="venue">Venue *</label>
              <input
                type="text"
                id="venue"
                name="venue"
                value={formData.venue}
                onChange={handleInputChange}
                placeholder="Enter venue name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">Location *</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Enter location"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="date">Date *</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="time">Time *</label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="mode">Event Mode *</label>
              <select
                id="mode"
                name="mode"
                value={formData.mode}
                onChange={handleInputChange}
                required
              >
                <option value="offline">Offline</option>
                <option value="online">Online</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="audience">Target Audience *</label>
              <input
                type="text"
                id="audience"
                name="audience"
                value={formData.audience}
                onChange={handleInputChange}
                placeholder="e.g., Beginners, Developers"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="tags">Tags (comma-separated) *</label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="e.g., javascript, react, web development"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="agenda">Agenda Items (comma-separated) *</label>
              <textarea
                id="agenda"
                name="agenda"
                value={formData.agenda}
                onChange={handleInputChange}
                placeholder="e.g., Introduction, Main Content, Q&A, Networking"
                required
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="image">Event Image *</label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleFileChange}
                accept="image/*"
                required
              />
            </div>
          </div>

          <button type="submit" disabled={isLoading} className="submit-btn">
            {isLoading ? "Creating Event..." : "Create Event"}
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateEvent;
