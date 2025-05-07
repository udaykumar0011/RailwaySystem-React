
import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { format, parse } from 'date-fns';
import { 
  CreditCard, IndianRupee, Users, Calendar, 
  Train, MapPin, Ticket, CheckCircle2
} from 'lucide-react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/sonner';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';

const Payment: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [processing, setProcessing] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [pnrNumber, setPnrNumber] = useState('');
  
  const trainNumber = searchParams.get('trainNumber') || '';
  const trainName = searchParams.get('name') || '';
  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';
  const travelClass = searchParams.get('class') || '';
  const passengers = parseInt(searchParams.get('passengers') || '1');
  const dateString = searchParams.get('date') || '';
  const departure = searchParams.get('departure') || '';
  const arrival = searchParams.get('arrival') || '';
  const price = parseFloat(searchParams.get('price') || '0');
  
  const date = dateString ? parse(dateString, 'yyyy-MM-dd', new Date()) : new Date();
  const formattedDate = format(date, 'dd MMM yyyy');
  
  const handlePayment = () => {
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      setConfirmed(true);
      setPnrNumber(generatePNR());
      toast.success('Payment successful! Your ticket has been booked.');
    }, 2000);
  };
  
  const generatePNR = () => {
    // Generate a random 10-digit PNR number
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
  };
  
  const handleViewTicket = () => {
    navigate(`/ticket?pnr=${pnrNumber}`);
  };
  
  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title="Payment" toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto">
            {!confirmed ? (
              <>
                <h1 className="text-2xl font-bold mb-6">Complete Your Payment</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <Card>
                      <CardContent className="pt-6">
                        <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                          <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="card">Card</TabsTrigger>
                            <TabsTrigger value="upi">UPI</TabsTrigger>
                            <TabsTrigger value="netbanking">Net Banking</TabsTrigger>
                          </TabsList>
                          
                          <TabsContent value="card" className="space-y-4 mt-4">
                            <div className="space-y-2">
                              <Label htmlFor="cardNumber">Card Number</Label>
                              <div className="relative">
                                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                <Input 
                                  id="cardNumber" 
                                  placeholder="1234 5678 9012 3456" 
                                  className="pl-10" 
                                />
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="expiryDate">Expiry Date</Label>
                                <Input id="expiryDate" placeholder="MM/YY" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="cvv">CVV</Label>
                                <Input id="cvv" placeholder="123" type="password" maxLength={3} />
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="cardName">Name on Card</Label>
                              <Input id="cardName" placeholder="John Doe" />
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="upi" className="space-y-4 mt-4">
                            <div className="space-y-2">
                              <Label htmlFor="upiId">UPI ID</Label>
                              <Input id="upiId" placeholder="yourname@upi" />
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Enter your UPI ID (e.g., yourname@okhdfcbank, yourname@ybl)
                            </p>
                          </TabsContent>
                          
                          <TabsContent value="netbanking" className="space-y-4 mt-4">
                            <div className="space-y-2">
                              <Label>Select Bank</Label>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {['SBI', 'HDFC', 'ICICI', 'Axis', 'PNB', 'Canara'].map((bank) => (
                                  <Button key={bank} variant="outline" className="justify-start">
                                    {bank} Bank
                                  </Button>
                                ))}
                              </div>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </CardContent>
                      <CardFooter className="flex justify-between border-t pt-6">
                        <Button variant="outline" onClick={() => navigate(-1)}>
                          Back
                        </Button>
                        <Button onClick={handlePayment} disabled={processing}>
                          {processing ? 'Processing...' : 'Pay Now'}
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                  
                  <div>
                    <Card>
                      <CardContent className="pt-6">
                        <h3 className="font-semibold mb-4">Booking Summary</h3>
                        
                        <div className="space-y-4">
                          <div className="flex items-start gap-2">
                            <Train className="h-4 w-4 text-muted-foreground mt-1" />
                            <div>
                              <div className="font-medium">{trainNumber} - {trainName}</div>
                              <div className="text-sm text-muted-foreground">
                                {from} to {to}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground mt-1" />
                            <div>
                              <div className="font-medium">{formattedDate}</div>
                              <div className="text-sm text-muted-foreground">
                                {departure} - {arrival}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-2">
                            <Ticket className="h-4 w-4 text-muted-foreground mt-1" />
                            <div>
                              <div className="font-medium">{travelClass} Class</div>
                              <div className="text-sm text-muted-foreground">
                                {passengers} {passengers > 1 ? 'Passengers' : 'Passenger'}
                              </div>
                            </div>
                          </div>
                          
                          <div className="border-t pt-4 mt-4">
                            <div className="flex justify-between font-medium">
                              <span>Base Fare:</span>
                              <span className="flex items-center">
                                <IndianRupee className="h-3 w-3 mr-1" />
                                {price}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm text-muted-foreground mt-1">
                              <span>Service Charge:</span>
                              <span className="flex items-center">
                                <IndianRupee className="h-3 w-3 mr-1" />
                                {Math.round(price * 0.05)}
                              </span>
                            </div>
                            <div className="flex justify-between font-semibold text-lg mt-4">
                              <span>Total:</span>
                              <span className="flex items-center">
                                <IndianRupee className="h-4 w-4 mr-1" />
                                {Math.round(price * 1.05)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </>
            ) : (
              <Card className="text-center p-8">
                <div className="flex flex-col items-center">
                  <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
                  <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
                  <p className="text-muted-foreground mb-6">
                    Your ticket has been booked successfully.
                  </p>
                  
                  <div className="bg-muted p-4 rounded-md mb-6 max-w-md mx-auto">
                    <div className="text-sm font-medium mb-1">PNR Number:</div>
                    <div className="text-2xl font-mono font-bold">{pnrNumber}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Please save this PNR number for future reference
                    </div>
                  </div>
                  
                  <Button onClick={handleViewTicket}>View Ticket</Button>
                </div>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Payment;
