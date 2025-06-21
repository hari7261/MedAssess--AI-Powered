import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { CreditCard, Calendar, Lock } from "lucide-react";

// Card validation schema
const cardSchema = z.object({
  cardNumber: z.string()
    .min(16, { message: "Card number must be at least 16 digits" })
    .max(19, { message: "Card number cannot exceed 19 digits" })
    .refine((val) => /^[0-9\s-]+$/.test(val), { message: "Card number can only contain digits, spaces or dashes" }),
  cardholderName: z.string()
    .min(3, { message: "Please enter the cardholder name" }),
  expiryDate: z.string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: "Expiry date should be in MM/YY format" }),
  cvv: z.string()
    .min(3, { message: "CVV must be at least 3 digits" })
    .max(4, { message: "CVV cannot exceed 4 digits" })
    .refine((val) => /^\d+$/.test(val), { message: "CVV can only contain digits" }),
});

type CardFormValues = z.infer<typeof cardSchema>;

interface CardPaymentFormProps {
  totalAmount: number;
  onPaymentSuccess: (transactionId: string) => void;
}

export function CardPaymentForm({ totalAmount, onPaymentSuccess }: CardPaymentFormProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const form = useForm<CardFormValues>({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      cardNumber: "",
      cardholderName: "",
      expiryDate: "",
      cvv: "",
    },
  });

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    // Remove any non-numeric characters
    const cleanValue = value.replace(/\D/g, "");
    // Add a space after every 4 digits
    const formatted = cleanValue.replace(/(\d{4})(?=\d)/g, "$1 ");
    return formatted.substring(0, 19); // Limit to 16 digits + 3 spaces
  };

  // Format expiry date as MM/YY
  const formatExpiryDate = (value: string) => {
    const cleanValue = value.replace(/\D/g, "");
    if (cleanValue.length >= 3) {
      return `${cleanValue.substring(0, 2)}/${cleanValue.substring(2, 4)}`;
    } else if (cleanValue.length === 2) {
      return `${cleanValue}/`;
    }
    return cleanValue;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    form.setValue("cardNumber", formatted);
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    form.setValue("expiryDate", formatted);
  };

  const onSubmit = async (data: CardFormValues) => {
    setIsProcessing(true);
    
    // Simulate payment processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Generate a mock transaction ID
    const mockTransactionId = "TRX" + Math.random().toString(36).substring(2, 10).toUpperCase();
    
    // Call the success callback
    onPaymentSuccess(mockTransactionId);
    setIsProcessing(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="cardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center">
                <CreditCard className="h-4 w-4 mr-2" />
                Card Number
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="1234 5678 9012 3456"
                  {...field}
                  onChange={handleCardNumberChange}
                  maxLength={19}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cardholderName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cardholder Name</FormLabel>
              <FormControl>
                <Input placeholder="John Smith" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="expiryDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Expiry Date
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="MM/YY" 
                    {...field} 
                    onChange={handleExpiryDateChange}
                    maxLength={5}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cvv"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  <Lock className="h-4 w-4 mr-2" />
                  CVV
                </FormLabel>
                <FormControl>
                  <Input 
                    type="password" 
                    placeholder="123" 
                    {...field} 
                    maxLength={4}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="pt-4">
          <Button 
            type="submit" 
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing Payment...
              </span>
            ) : `Pay ₹${totalAmount}`}
          </Button>
        </div>

        <div className="text-center text-xs text-gray-500 mt-4">
          <p>🔒 Your payment information is secure and encrypted</p>
          <div className="flex justify-center gap-2 mt-2">
            <img src="https://cdn-icons-png.flaticon.com/128/349/349221.png" className="h-6" alt="Visa" />
            <img src="https://cdn-icons-png.flaticon.com/128/349/349228.png" className="h-6" alt="MasterCard" />
            <img src="https://cdn-icons-png.flaticon.com/128/349/349230.png" className="h-6" alt="American Express" />
            <img src="https://cdn-icons-png.flaticon.com/128/349/349292.png" className="h-6" alt="RuPay" />
          </div>
        </div>
      </form>
    </Form>
  );
}
