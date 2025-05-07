
import React from 'react';
import { Button } from '@/components/ui/button';
import { Printer, Download, Share2, TicketCheck, Plus } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { toast } from '@/components/ui/sonner';

interface TicketHeaderProps {
  onAddTicket?: () => void;
}

const TicketHeader: React.FC<TicketHeaderProps> = ({ onAddTicket }) => {
  const handleDownload = async () => {
    try {
      // Find the ticket element to capture
      const ticketElement = document.querySelector('.ticket-container');
      
      if (!ticketElement) {
        toast.error("Could not find ticket to download");
        return;
      }
      
      toast.info("Preparing your ticket for download...");
      
      // Generate canvas from the ticket element
      const canvas = await html2canvas(ticketElement as HTMLElement, {
        scale: 2, // Higher scale for better quality
        backgroundColor: '#ffffff',
        logging: false
      });
      
      // Initialize PDF document
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      // Calculate dimensions to fit the PDF
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Add the canvas as an image to the PDF
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      
      // Save the PDF
      pdf.save('train-ticket.pdf');
      
      toast.success("Ticket downloaded successfully!");
    } catch (error) {
      console.error("Error downloading ticket:", error);
      toast.error("Failed to download ticket. Please try again.");
    }
  };
  
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold flex items-center">
        <TicketCheck className="h-6 w-6 mr-2" />
        E-Ticket / Booking Details
      </h1>
      <div className="flex gap-2">
        {onAddTicket && (
          <Button variant="default" size="sm" onClick={onAddTicket}>
            <Plus className="h-4 w-4 mr-2" />
            Add Ticket
          </Button>
        )}
        <Button variant="outline" size="sm">
          <Printer className="h-4 w-4 mr-2" />
          Print
        </Button>
        <Button variant="outline" size="sm" onClick={handleDownload}>
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
        <Button variant="outline" size="sm">
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </div>
    </div>
  );
};

export default TicketHeader;
