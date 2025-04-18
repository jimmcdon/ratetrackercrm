"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Updated test data
const testData = [
  {
    id: 1,
    loanAmount: 250000,
    interestRate: 3.5,
    hasMonthlyMI: true,
    hasFinancedMI: false,
    borrowerName: "John Doe",
    loanType: "conventional",
  },
  {
    id: 2,
    loanAmount: 350000,
    interestRate: 3.75,
    hasMonthlyMI: false,
    hasFinancedMI: true,
    borrowerName: "Jane Smith",
    loanType: "fha",
  },
  {
    id: 3,
    loanAmount: 200000,
    interestRate: 3.25,
    hasMonthlyMI: true,
    hasFinancedMI: false,
    borrowerName: "Bob Johnson",
    loanType: "va",
  },
  {
    id: 4,
    loanAmount: 400000,
    interestRate: 4.0,
    hasMonthlyMI: false,
    hasFinancedMI: false,
    borrowerName: "Alice Brown",
    loanType: "jumbo",
  },
  {
    id: 5,
    loanAmount: 300000,
    interestRate: 3.6,
    hasMonthlyMI: true,
    hasFinancedMI: true,
    borrowerName: "Charlie Davis",
    loanType: "usda",
  },
  {
    id: 6,
    loanAmount: 150000,
    interestRate: 5.5,
    hasMonthlyMI: false,
    hasFinancedMI: false,
    borrowerName: "Eva Wilson",
    loanType: "heloc",
  },
  {
    id: 7,
    loanAmount: 500000,
    interestRate: 6.0,
    hasMonthlyMI: false,
    hasFinancedMI: false,
    borrowerName: "Frank Miller",
    loanType: "non-qm",
  },
  {
    id: 8,
    loanAmount: 750000,
    interestRate: 8.0,
    hasMonthlyMI: false,
    hasFinancedMI: false,
    borrowerName: "Grace Taylor",
    loanType: "hardmoney",
  },
]

export function HarvestSearch() {
  const [minLoanAmount, setMinLoanAmount] = useState("")
  const [maxLoanAmount, setMaxLoanAmount] = useState("")
  const [minInterestRate, setMinInterestRate] = useState("")
  const [maxInterestRate, setMaxInterestRate] = useState("")
  const [hasMonthlyMI, setHasMonthlyMI] = useState(false)
  const [hasFinancedMI, setHasFinancedMI] = useState(false)
  const [loanType, setLoanType] = useState<string>("")
  const [searchResults, setSearchResults] = useState<typeof testData>([])

  const handleSearch = () => {
    const results = testData.filter((loan) => {
      if (loanType && loan.loanType !== loanType) return false
      if (minLoanAmount && loan.loanAmount < Number(minLoanAmount)) return false
      if (maxLoanAmount && loan.loanAmount > Number(maxLoanAmount)) return false
      if (minInterestRate && loan.interestRate < Number(minInterestRate)) return false
      if (maxInterestRate && loan.interestRate > Number(maxInterestRate)) return false
      if (hasMonthlyMI && !loan.hasMonthlyMI) return false
      if (hasFinancedMI && !loan.hasFinancedMI) return false
      return true
    })
    setSearchResults(results)
  }

  return (
    <Dialog>
      {/* Harvest search removed from sidebar */}
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Harvest Search</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-1.5 mb-4">
          <Label htmlFor="loanType">Loan Type</Label>
          <Select value={loanType} onValueChange={setLoanType}>
            <SelectTrigger id="loanType">
              <SelectValue placeholder="Select loan type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="conventional">Conventional</SelectItem>
              <SelectItem value="fha">FHA</SelectItem>
              <SelectItem value="va">VA</SelectItem>
              <SelectItem value="usda">USDA</SelectItem>
              <SelectItem value="jumbo">Jumbo</SelectItem>
              <SelectItem value="heloc">HELOC</SelectItem>
              <SelectItem value="non-qm">Non-QM</SelectItem>
              <SelectItem value="hardmoney">Hard Money</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="minLoanAmount">Min Loan Amount</Label>
              <Input
                id="minLoanAmount"
                placeholder="Enter amount"
                value={minLoanAmount}
                onChange={(e) => setMinLoanAmount(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="maxLoanAmount">Max Loan Amount</Label>
              <Input
                id="maxLoanAmount"
                placeholder="Enter amount"
                value={maxLoanAmount}
                onChange={(e) => setMaxLoanAmount(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="minInterestRate">Min Interest Rate</Label>
              <Input
                id="minInterestRate"
                placeholder="Enter rate"
                value={minInterestRate}
                onChange={(e) => setMinInterestRate(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="maxInterestRate">Max Interest Rate</Label>
              <Input
                id="maxInterestRate"
                placeholder="Enter rate"
                value={maxInterestRate}
                onChange={(e) => setMaxInterestRate(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="hasMonthlyMI"
              checked={hasMonthlyMI}
              onCheckedChange={(checked) => setHasMonthlyMI(checked as boolean)}
            />
            <Label htmlFor="hasMonthlyMI">Has Monthly Mortgage Insurance</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="hasFinancedMI"
              checked={hasFinancedMI}
              onCheckedChange={(checked) => setHasFinancedMI(checked as boolean)}
            />
            <Label htmlFor="hasFinancedMI">Has Financed Mortgage Insurance</Label>
          </div>
        </div>
        <Button onClick={handleSearch}>Search</Button>
        {searchResults.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Search Results</h3>
            <div className="max-h-[300px] overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Borrower Name</TableHead>
                    <TableHead>Loan Type</TableHead>
                    <TableHead>Loan Amount</TableHead>
                    <TableHead>Interest Rate</TableHead>
                    <TableHead>Monthly MI</TableHead>
                    <TableHead>Financed MI</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {searchResults.map((result) => (
                    <TableRow key={result.id}>
                      <TableCell>{result.borrowerName}</TableCell>
                      <TableCell>{result.loanType.toUpperCase()}</TableCell>
                      <TableCell>${result.loanAmount.toLocaleString()}</TableCell>
                      <TableCell>{result.interestRate}%</TableCell>
                      <TableCell>{result.hasMonthlyMI ? "Yes" : "No"}</TableCell>
                      <TableCell>{result.hasFinancedMI ? "Yes" : "No"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

