
import React, { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { Event, ImportanceLevel } from "@/types/event";
import { generateSampleEvents, sortEventsByDate, filterEventsByImportance } from "@/utils/eventUtils";
import TimelineEvent from "@/components/TimelineEvent";
import EventForm from "@/components/EventForm";
import TimelineControls from "@/components/TimelineControls";
import { Button } from "@/components/ui/button";
import { CalendarPlus } from "lucide-react";

const Index = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [importanceFilter, setImportanceFilter] = useState<ImportanceLevel | "all">("all");

  // Load initial sample events
  useEffect(() => {
    setEvents(generateSampleEvents());
  }, []);

  // Filter and sort events whenever dependencies change
  useEffect(() => {
    let result = filterEventsByImportance(events, importanceFilter);
    result = sortEventsByDate(result, sortDirection === "asc");
    setFilteredEvents(result);
  }, [events, importanceFilter, sortDirection]);

  const handleAddEvent = () => {
    setEditingEvent(null);
    setIsFormOpen(true);
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setIsFormOpen(true);
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
    toast({
      title: "Event deleted",
      description: "The event has been successfully removed from your timeline.",
    });
  };

  const handleSaveEvent = (eventData: Event) => {
    if (editingEvent) {
      // Update existing event
      setEvents(events.map(event => 
        event.id === eventData.id ? eventData : event
      ));
      toast({
        title: "Event updated",
        description: "The event has been successfully updated on your timeline.",
      });
    } else {
      // Add new event
      setEvents([...events, eventData]);
      toast({
        title: "Event added",
        description: "The new event has been successfully added to your timeline.",
      });
    }
  };

  const toggleSortDirection = () => {
    setSortDirection(prev => prev === "asc" ? "desc" : "asc");
  };

  return (
    <div className="container py-8 mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Timeline Events</h1>
        <p className="text-muted-foreground">Manage and track your important events</p>
      </div>

      <TimelineControls
        onAddNew={handleAddEvent}
        sortDirection={sortDirection}
        onChangeSortDirection={toggleSortDirection}
        importanceFilter={importanceFilter}
        onChangeImportanceFilter={setImportanceFilter}
      />

      <div className="relative">
        {filteredEvents.length > 0 ? (
          <div className="space-y-0">
            {filteredEvents.map(event => (
              <TimelineEvent
                key={event.id}
                event={event}
                onEdit={handleEditEvent}
                onDelete={handleDeleteEvent}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border rounded-lg bg-gray-50">
            <h3 className="text-lg font-medium mb-2">No events found</h3>
            <p className="text-muted-foreground mb-4">
              {events.length === 0 
                ? "Start by adding your first event to the timeline."
                : "No events match your current filter settings."}
            </p>
            {events.length === 0 && (
              <Button onClick={handleAddEvent}>
                <CalendarPlus className="mr-2 h-4 w-4" />
                Add Your First Event
              </Button>
            )}
          </div>
        )}
      </div>

      <EventForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveEvent}
        editingEvent={editingEvent}
      />
    </div>
  );
};

export default Index;
