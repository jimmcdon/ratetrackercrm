"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

const loanApplicationSchema = z.object({
  // Borrower Information
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  city: z.string().min(2, { message: "City must be at least 2 characters." }),
  state: z.string().min(2, { message: "Please select a state." }),
  zipCode: z.string().min(5, { message: "ZIP code must be at least 5 characters." }),

  // Loan Information
  loanType: z.string().min(1, { message: "Please select a loan type." }),
  loanPurpose: z.string().min(1, { message: "Please select a loan purpose." }),
  loanAmount: z.string().min(1, { message: "Please enter a loan amount." }),
  propertyType: z.string().min(1, { message: "Please select a property type." }),
  propertyUse: z.string().min(1, { message: "Please select property use." }),

  // Financial Information
  annualIncome: z.string().min(1, { message: "Please enter your annual income." }),
  employmentStatus: z.string().min(1, { message: "Please select your employment status." }),
  creditScore: z.string().min(1, { message: "Please select your credit score range." }),

  // Additional Information
  additionalNotes: z.string().optional(),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions.",
  }),
})

type LoanApplicationValues = z.infer<typeof loanApplicationSchema>

export function LoanApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1)

  const form = useForm<LoanApplicationValues>({
    resolver: zodResolver(loanApplicationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      loanType: "",
      loanPurpose: "",
      loanAmount: "",
      propertyType: "",
      propertyUse: "",
      annualIncome: "",
      employmentStatus: "",
      creditScore: "",
      additionalNotes: "",
      agreeToTerms: false,
    },
  })

  function onSubmit(data: LoanApplicationValues) {
    console.log(data)
    // In a real application, you would submit this data to your backend
    alert("Loan application submitted successfully!")
  }

  const nextStep = () => {
    setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    setCurrentStep(currentStep - 1)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Loan Application</CardTitle>
        <CardDescription>Complete the form below to apply for a loan</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex justify-between mb-6">
              <div className={`flex-1 border-b-2 pb-2 ${currentStep >= 1 ? "border-primary" : "border-muted"}`}>
                Step 1: Borrower Information
              </div>
              <div className={`flex-1 border-b-2 pb-2 ${currentStep >= 2 ? "border-primary" : "border-muted"}`}>
                Step 2: Loan Details
              </div>
              <div className={`flex-1 border-b-2 pb-2 ${currentStep >= 3 ? "border-primary" : "border-muted"}`}>
                Step 3: Financial Information
              </div>
              <div className={`flex-1 border-b-2 pb-2 ${currentStep >= 4 ? "border-primary" : "border-muted"}`}>
                Step 4: Review & Submit
              </div>
            </div>

            {currentStep === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Borrower Information</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="john.doe@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="(555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main St" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="Anytown" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="AL">Alabama</SelectItem>
                            <SelectItem value="AK">Alaska</SelectItem>
                            <SelectItem value="AZ">Arizona</SelectItem>
                            {/* Add more states as needed */}
                            <SelectItem value="CA">California</SelectItem>
                            <SelectItem value="CO">Colorado</SelectItem>
                            <SelectItem value="FL">Florida</SelectItem>
                            <SelectItem value="NY">New York</SelectItem>
                            <SelectItem value="TX">Texas</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ZIP Code</FormLabel>
                        <FormControl>
                          <Input placeholder="12345" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Loan Details</h3>
                <FormField
                  control={form.control}
                  name="loanType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Loan Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select loan type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="conventional">Conventional</SelectItem>
                          <SelectItem value="fha">FHA</SelectItem>
                          <SelectItem value="va">VA</SelectItem>
                          <SelectItem value="usda">USDA</SelectItem>
                          <SelectItem value="jumbo">Jumbo</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="loanPurpose"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Loan Purpose</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select loan purpose" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="purchase">Purchase</SelectItem>
                          <SelectItem value="refinance">Refinance</SelectItem>
                          <SelectItem value="cashout">Cash-Out Refinance</SelectItem>
                          <SelectItem value="construction">Construction</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="loanAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Loan Amount</FormLabel>
                      <FormControl>
                        <Input placeholder="$250,000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="propertyType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select property type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="singleFamily">Single Family Home</SelectItem>
                          <SelectItem value="condo">Condominium</SelectItem>
                          <SelectItem value="townhouse">Townhouse</SelectItem>
                          <SelectItem value="multiFamily">Multi-Family</SelectItem>
                          <SelectItem value="manufactured">Manufactured Home</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="propertyUse"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Use</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select property use" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="primaryResidence">Primary Residence</SelectItem>
                          <SelectItem value="secondHome">Second Home</SelectItem>
                          <SelectItem value="investment">Investment Property</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Financial Information</h3>
                <FormField
                  control={form.control}
                  name="annualIncome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Annual Income</FormLabel>
                      <FormControl>
                        <Input placeholder="$75,000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="employmentStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employment Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select employment status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="employed">Employed Full-Time</SelectItem>
                          <SelectItem value="partTime">Employed Part-Time</SelectItem>
                          <SelectItem value="selfEmployed">Self-Employed</SelectItem>
                          <SelectItem value="retired">Retired</SelectItem>
                          <SelectItem value="unemployed">Unemployed</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="creditScore"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Credit Score Range</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select credit score range" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="excellent">Excellent (750+)</SelectItem>
                          <SelectItem value="good">Good (700-749)</SelectItem>
                          <SelectItem value="fair">Fair (650-699)</SelectItem>
                          <SelectItem value="poor">Poor (600-649)</SelectItem>
                          <SelectItem value="veryPoor">Very Poor (Below 600)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="additionalNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Any additional information you'd like to share about your financial situation"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Review & Submit</h3>
                <div className="rounded-md border p-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="font-medium">Borrower Information</h4>
                      <p>
                        Name: {form.getValues("firstName")} {form.getValues("lastName")}
                      </p>
                      <p>Email: {form.getValues("email")}</p>
                      <p>Phone: {form.getValues("phone")}</p>
                      <p>
                        Address: {form.getValues("address")}, {form.getValues("city")}, {form.getValues("state")}{" "}
                        {form.getValues("zipCode")}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">Loan Details</h4>
                      <p>Loan Type: {form.getValues("loanType")}</p>
                      <p>Loan Purpose: {form.getValues("loanPurpose")}</p>
                      <p>Loan Amount: {form.getValues("loanAmount")}</p>
                      <p>Property Type: {form.getValues("propertyType")}</p>
                      <p>Property Use: {form.getValues("propertyUse")}</p>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div>
                    <h4 className="font-medium">Financial Information</h4>
                    <p>Annual Income: {form.getValues("annualIncome")}</p>
                    <p>Employment Status: {form.getValues("employmentStatus")}</p>
                    <p>Credit Score Range: {form.getValues("creditScore")}</p>
                    {form.getValues("additionalNotes") && (
                      <>
                        <h4 className="font-medium mt-2">Additional Notes</h4>
                        <p>{form.getValues("additionalNotes")}</p>
                      </>
                    )}
                  </div>
                </div>
                <FormField
                  control={form.control}
                  name="agreeToTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>I agree to the terms and conditions</FormLabel>
                        <FormDescription>
                          By checking this box, you agree to our Terms of Service and Privacy Policy.
                        </FormDescription>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <div className="flex justify-between pt-4">
              {currentStep > 1 && (
                <Button type="button" variant="outline" onClick={prevStep}>
                  Previous
                </Button>
              )}
              {currentStep < 4 ? (
                <Button type="button" onClick={nextStep}>
                  Next
                </Button>
              ) : (
                <Button type="submit">Submit Application</Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

