
import React from "react";
import { Event } from "@/types/event";
import { formatDate } from "@/utils/eventUtils";
import { CalendarPlus, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TimelineEventProps {
  event: Event;
  onEdit: (event: Event) => void;
  onDelete: (id: string) => void;
}

const TimelineEvent = ({ event, onEdit, onDelete }: TimelineEventProps) => {
  const importanceClasses = {
    low: "border-l-blue-400 bg-blue-50",
    medium: "border-l-amber-400 bg-amber-50",
    high: "border-l-red-400 bg-red-50",
  };

  return (
    <div className="mb-8 animate-fade-in">
      <div className="flex items-start gap-4">
        <div className="flex flex-col items-center">
          <div className={cn(
            "rounded-full p-2 border-2 text-foreground",
            event.importance === "high" ? "border-red-400 bg-red-100" :
            event.importance === "medium" ? "border-amber-400 bg-amber-100" :
            "border-blue-400 bg-blue-100"
          )}>
            <CalendarPlus size={16} />
          </div>
          <div className="h-full w-0.5 bg-gray-200 mt-2"></div>
        </div>
        
        <Card className={cn(
          "w-full border-l-4 shadow-sm transition-all hover:shadow-md",
          importanceClasses[event.importance]
        )}>
          <CardHeader className="p-4 pb-2">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{event.title}</h3>
                <p className="text-sm text-muted-foreground">{formatDate(event.date)}</p>
              </div>
              <span className={cn(
                "text-xs px-2 py-1 rounded-full font-medium",
                event.importance === "high" ? "bg-red-200 text-red-700" :
                event.importance === "medium" ? "bg-amber-200 text-amber-700" :
                "bg-blue-200 text-blue-700"
              )}>
                {event.importance.charAt(0).toUpperCase() + event.importance.slice(1)}
              </span>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-sm">{event.description}</p>
          </CardContent>
          <CardFooter className="flex justify-end gap-2 p-2">
            <Button variant="ghost" size="icon" onClick={() => onEdit(event)}>
              <Edit size={16} />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => onDelete(event.id)}>
              <Trash size={16} />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default TimelineEvent;
