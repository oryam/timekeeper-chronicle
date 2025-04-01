
import React from "react";
import { ImportanceLevel } from "@/types/event";
import { Button } from "@/components/ui/button";
import { CalendarPlus, ArrowUp, ArrowDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";

interface TimelineControlsProps {
  onAddNew: () => void;
  sortDirection: "asc" | "desc";
  onChangeSortDirection: () => void;
  importanceFilter: ImportanceLevel | "all";
  onChangeImportanceFilter: (value: ImportanceLevel | "all") => void;
}

const TimelineControls = ({
  onAddNew,
  sortDirection,
  onChangeSortDirection,
  importanceFilter,
  onChangeImportanceFilter,
}: TimelineControlsProps) => {
  return (
    <Card className="mb-6 p-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <Button onClick={onAddNew} className="w-full md:w-auto">
            <CalendarPlus className="mr-2 h-4 w-4" />
            Add New Event
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-sm font-medium whitespace-nowrap">Importance:</span>
            <Select
              value={importanceFilter}
              onValueChange={(value) => onChangeImportanceFilter(value as ImportanceLevel | "all")}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-sm font-medium whitespace-nowrap">Sort Order:</span>
            <Button
              variant="outline"
              size="sm"
              onClick={onChangeSortDirection}
              className="w-[100px] justify-between"
            >
              {sortDirection === "asc" ? (
                <>
                  Oldest <ArrowUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  Newest <ArrowDown className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TimelineControls;
