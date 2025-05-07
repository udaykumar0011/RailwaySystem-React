
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from '@/components/ui/sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

interface AddTicketFormProps {
  onClose: () => void;
  onAddSuccess: (ticket: any) => void;
}

const AddTicketForm: React.FC<AddTicketFormProps> = ({ onClose, onAddSuccess }) => {
  const form = useForm({
    defaultValues: {
      trainNumber: '',
      trainName: '',
      from: '',
      to: '',
      travelDate: new Date(),
      travelClass: '2A',
      passengerName: '',
      passengerAge: '',
      passengerGender: 'M',
    },
  });

  const onSubmit = (data: any) => {
    // Generate a mock PNR number
    const pnr = Math.floor(Math.random() * 9000000000) + 1000000000;
    
    // Create a new ticket object
    const newTicket = {
      pnr: pnr.toString(),
      trainNumber: data.trainNumber,
      trainName: data.trainName,
      from: data.from,
      fromStation: data.from,
      to: data.to,
      toStation: data.to,
      date: format(data.travelDate, 'yyyy-MM-dd'),
      departureTime: '08:00',
      arrivalTime: '14:00',
      travelClass: data.travelClass,
      coach: 'B1',
      seats: ['24'],
      passengers: [
        {
          name: data.passengerName,
          age: parseInt(data.passengerAge),
          gender: data.passengerGender,
          seat: '24',
          status: 'CNF',
        },
      ],
      fare: 1200,
      bookingDate: format(new Date(), 'yyyy-MM-dd'),
    };

    // In a real app, this would be sent to an API
    setTimeout(() => {
      toast.success('Ticket added successfully!', {
        description: `PNR: ${pnr}`,
      });
      onAddSuccess(newTicket);
      onClose();
    }, 1000);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Add New Ticket</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="trainNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Train Number</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 12301" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="trainName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Train Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Rajdhani Express" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="from"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>From</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., NDLS" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="to"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>To</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., HWH" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="travelDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Travel Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className="w-full pl-3 text-left font-normal"
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date() || date > new Date(new Date().setMonth(new Date().getMonth() + 3))
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="travelClass"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1A">First AC (1A)</SelectItem>
                        <SelectItem value="2A">Second AC (2A)</SelectItem>
                        <SelectItem value="3A">Third AC (3A)</SelectItem>
                        <SelectItem value="SL">Sleeper (SL)</SelectItem>
                        <SelectItem value="CC">Chair Car (CC)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="border-t pt-4">
              <h3 className="font-medium mb-4">Passenger Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="passengerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="passengerAge"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" max="120" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="passengerGender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="M">Male</SelectItem>
                          <SelectItem value="F">Female</SelectItem>
                          <SelectItem value="O">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Add Ticket</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AddTicketForm;
