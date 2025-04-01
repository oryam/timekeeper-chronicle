
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Event, ImportanceLevel } from "@/types/event";
import { generateId } from "@/utils/eventUtils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EventFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Event) => void;
  editingEvent: Event | null;
}

// Form schema with validation
const formSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  date: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Please enter a valid date",
  }),
  description: z.string().min(1, "Description is required").max(500, "Description is too long"),
  importance: z.enum(["low", "medium", "high"]),
});

const EventForm = ({ isOpen, onClose, onSave, editingEvent }: EventFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      date: new Date().toISOString().split("T")[0],
      description: "",
      importance: "medium" as ImportanceLevel,
    },
  });

  // Set form values when editing an event
  useEffect(() => {
    if (editingEvent) {
      form.reset({
        title: editingEvent.title,
        date: editingEvent.date.toISOString().split("T")[0],
        description: editingEvent.description,
        importance: editingEvent.importance,
      });
    } else {
      form.reset({
        title: "",
        date: new Date().toISOString().split("T")[0],
        description: "",
        importance: "medium",
      });
    }
  }, [editingEvent, form, isOpen]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const eventData: Event = {
      id: editingEvent ? editingEvent.id : generateId(),
      title: values.title,
      date: new Date(values.date),
      description: values.description,
      importance: values.importance as ImportanceLevel,
    };
    
    onSave(eventData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {editingEvent ? "Edit Event" : "Add New Event"}
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Event title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Event description" 
                      className="resize-none" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="importance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Importance</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select importance" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                {editingEvent ? "Update" : "Add"} Event
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EventForm;
