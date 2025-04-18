"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import {
  ArrowUpDown,
  Search,
  Users,
  Building,
  Calendar,
  DollarSign,
  Clock,
  Home,
  Percent,
  CreditCard,
  Landmark,
  Flag,
  Sprout,
  FileQuestion,
} from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Updated example data for leads, including RateTracker as a source
const leads = [
  {
    id: 1,
    name: "John Doe",
    source: "Organic",
    type: "R&T",
    status: "New",
    date: "2023-06-05",
    loanType: "conventional",
  },
  {
    id: 2,
    name: "Jane Smith",
    source: "Office",
    type: "Cash Out",
    status: "Contacted",
    date: "2023-06-04",
    loanType: "fha",
  },
  {
    id: 3,
    name: "Bob Johnson",
    source: "Event",
    type: "Shorten Term",
    status: "Qualified",
    date: "2023-06-03",
    loanType: "va",
  },
  {
    id: 4,
    name: "Alice Brown",
    source: "Organic",
    type: "Purchase",
    status: "New",
    date: "2023-06-05",
    loanType: "usda",
  },
  {
    id: 5,
    name: "Charlie Davis",
    source: "Office",
    type: "R&T",
    status: "Contacted",
    date: "2023-06-02",
    loanType: "nonqm",
  },
  {
    id: 6,
    name: "Eva Wilson",
    source: "Event",
    type: "Cash Out",
    status: "Qualified",
    date: "2023-06-01",
    loanType: "conventional",
  },
  {
    id: 7,
    name: "Frank Miller",
    source: "RateTracker",
    type: "Shorten Term",
    status: "New",
    date: "2023-06-04",
    loanType: "fha",
  },
  {
    id: 8,
    name: "Grace Taylor",
    source: "RateTracker",
    type: "Purchase",
    status: "Contacted",
    date: "2023-06-03",
    loanType: "va",
  },
  {
    id: 9,
    name: "Henry Clark",
    source: "RateTracker",
    type: "R&T",
    status: "Qualified",
    date: "2023-06-06",
    loanType: "usda",
  },
  {
    id: 10,
    name: "Ivy Martinez",
    source: "Organic",
    type: "Cash Out",
    status: "New",
    date: "2023-06-07",
    loanType: "nonqm",
  },
]

const sourceFilters = [
  { id: "organic", label: "Organic Leads", icon: Users },
  { id: "office", label: "Office Leads", icon: Building },
  { id: "event", label: "Event Leads", icon: Calendar },
  { id: "ratetracker", label: "RateTracker Leads", icon: Percent },
]

const typeFilters = [
  { id: "rt", label: "R&T", icon: DollarSign },
  { id: "cashout", label: "Cash Out", icon: DollarSign },
  { id: "shortenterm", label: "Shorten Term", icon: Clock },
  { id: "purchase", label: "Purchase", icon: Home },
]

const loanTypeFilters = [
  { id: "conventional", label: "Conventional", icon: CreditCard },
  { id: "fha", label: "FHA", icon: Landmark },
  { id: "va", label: "VA", icon: Flag },
  { id: "usda", label: "USDA", icon: Sprout },
  { id: "nonqm", label: "Non-QM", icon: FileQuestion },
  { id: "heloc", label: "HELOC", icon: Home },
]

export default function LeadsPage() {
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [selectedSources, setSelectedSources] = useState<string[]>([])
  const [selectedLeadType, setSelectedLeadType] = useState<string | null>(null)
  const [activeLoanTypeFilter, setActiveLoanTypeFilter] = useState<string | null>(null)

  const [minLoanAmount, setMinLoanAmount] = useState("")
  const [maxLoanAmount, setMaxLoanAmount] = useState("")
  const [minInterestRate, setMinInterestRate] = useState("")
  const [maxInterestRate, setMaxInterestRate] = useState("")
  const [hasMonthlyMI, setHasMonthlyMI] = useState(false)
  const [hasFinancedMI, setHasFinancedMI] = useState(false)
  const [harvestLoanType, setHarvestLoanType] = useState<string>("")
  const [propertyType, setPropertyType] = useState<string>("")
  const [loanToValue, setLoanToValue] = useState<string>("")
  const [ficoScore, setFicoScore] = useState<string>("")

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const toggleFilter = (filterId: string, filterType: "source" | "type" | "loanType") => {
    if (filterType === "source") {
      setSelectedSources((prev) =>
        prev.includes(filterId) ? prev.filter((id) => id !== filterId) : [...prev, filterId],
      )
      setActiveFilters([])
      setSelectedLeadType(null)
      setActiveLoanTypeFilter(null)
    } else if (filterType === "type") {
      setSelectedLeadType(selectedLeadType === filterId ? null : filterId)
      setActiveLoanTypeFilter(null)
      setActiveFilters((prev) => (prev.includes(filterId) ? prev.filter((f) => f !== filterId) : [...prev, filterId]))
    } else {
      setActiveLoanTypeFilter(activeLoanTypeFilter === filterId ? null : filterId)
    }
  }

  const filteredAndSortedLeads = leads
    .filter(
      (lead) =>
        (searchTerm === "" || lead.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedSources.length === 0 || selectedSources.includes(lead.source.toLowerCase())) &&
        (activeFilters.length === 0 || activeFilters.includes(lead.type.toLowerCase().replace(/\s+/g, ""))) &&
        (!activeLoanTypeFilter ||
          lead.loanType?.toLowerCase() === activeLoanTypeFilter.toLowerCase() ||
          loanTypeFilters.find((filter) => filter.id === lead.loanType?.toLowerCase())),
    )
    .sort((a, b) => {
      if (!sortColumn) return 0

      if (a[sortColumn as keyof typeof a] < b[sortColumn as keyof typeof b]) {
        return sortDirection === "asc" ? -1 : 1
      }
      if (a[sortColumn as keyof typeof a] > b[sortColumn as keyof typeof b]) {
        return sortDirection === "asc" ? 1 : -1
      }
      return 0
    })

  return (
    <DashboardLayout>
      <div className="space-y-4 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Leads</h1>
          <Button>
            <Users className="mr-2 h-4 w-4" /> Add New Lead
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lead Filters</CardTitle>
            <CardDescription>Filter leads by source and type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Lead Source</h3>
                <div className="flex flex-wrap gap-2">
                  {sourceFilters.map((filter) => (
                    <Button
                      key={filter.id}
                      variant={selectedSources.includes(filter.id) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleFilter(filter.id, "source")}
                    >
                      <filter.icon className="mr-2 h-4 w-4" />
                      {filter.label}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Lead Type</h3>
                <div className="flex flex-wrap gap-2">
                  {typeFilters.map((filter) => (
                    <Button
                      key={filter.id}
                      variant={selectedLeadType === filter.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleFilter(filter.id, "type")}
                      disabled={!selectedSources.length}
                      className={!selectedSources.length ? "opacity-50 cursor-not-allowed" : ""}
                    >
                      <filter.icon className="mr-2 h-4 w-4" />
                      {filter.label}
                    </Button>
                  ))}
                </div>
              </div>
              {selectedLeadType && (
                <div>
                  <h3 className="text-sm font-medium mb-2">Mortgage Type</h3>
                  <div className="flex flex-wrap gap-2">
                    {loanTypeFilters.map((filter) => (
                      <Button
                        key={filter.id}
                        variant={activeLoanTypeFilter === filter.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleFilter(filter.id, "loanType")}
                      >
                        <filter.icon className="mr-2 h-4 w-4" />
                        {filter.label}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              {selectedLeadType && (
                <div>
                  <div className="space-y-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="harvestLoanType">Loan Type</Label>
                      <Select value={harvestLoanType} onValueChange={setHarvestLoanType}>
                        <SelectTrigger id="harvestLoanType">
                          <SelectValue placeholder="Select loan type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="owner-occupied">Owner Occupied</SelectItem>
                          <SelectItem value="second-home">Second Home</SelectItem>
                          <SelectItem value="investment-property">Investment Property</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col space-y-1.5 mt-4">
                      <Label>Property Type</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {["Single Family Residence", "2 Unit", "3-4 Unit", "Condo", "PUD", "Manufactured Home"].map(
                          (type) => (
                            <div key={type} className="flex items-center space-x-2">
                              <input
                                type="radio"
                                id={type.toLowerCase().replace(/\s+/g, "-")}
                                name="propertyType"
                                value={type}
                                checked={propertyType === type}
                                onChange={(e) => setPropertyType(e.target.value)}
                                className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                              />
                              <Label htmlFor={type.toLowerCase().replace(/\s+/g, "-")}>{type}</Label>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col space-y-1.5 mt-4">
                      <Label>Loan to Value</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          "Less than 60%",
                          "60.01% to 65%",
                          "65.01% to 70%",
                          "70.01% to 75%",
                          "75.01% to 80%",
                          "Above 80%",
                        ].map((range) => (
                          <div key={range} className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id={range.toLowerCase().replace(/\s+/g, "-")}
                              name="loanToValue"
                              value={range}
                              checked={loanToValue === range}
                              onChange={(e) => setLoanToValue(e.target.value)}
                              className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                            />
                            <Label htmlFor={range.toLowerCase().replace(/\s+/g, "-")}>{range}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col space-y-1.5 mt-4">
                      <Label htmlFor="ficoScore">FICO Score</Label>
                      <Select value={ficoScore} onValueChange={setFicoScore}>
                        <SelectTrigger id="ficoScore">
                          <SelectValue placeholder="Select FICO score range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="800+">800+</SelectItem>
                          <SelectItem value="780-799">780–799</SelectItem>
                          <SelectItem value="760-779">760–779</SelectItem>
                          <SelectItem value="740-759">740–759</SelectItem>
                          <SelectItem value="720-739">720–739</SelectItem>
                          <SelectItem value="700-719">700–719</SelectItem>
                          <SelectItem value="680-699">680–699</SelectItem>
                          <SelectItem value="660-679">660–679</SelectItem>
                          <SelectItem value="640-659">640–659</SelectItem>
                          <SelectItem value="620-639">620–639</SelectItem>
                          <SelectItem value="580-619">580–619</SelectItem>
                          <SelectItem value="550-579">550–579</SelectItem>
                          <SelectItem value="below-550">Below 550</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
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
                    <Button onClick={() => console.log("Perform Harvest search")}>Search</Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lead List</CardTitle>
            <CardDescription>View and manage all leads</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <Search className="h-5 w-5 text-muted-foreground" />
              <Label htmlFor="search" className="sr-only">
                Search leads
              </Label>
              <Input
                id="search"
                placeholder="Search leads..."
                className="max-w-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Lead ID</TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort("name")}>
                      Name
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort("source")}>
                      Source
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort("type")}>
                      Type
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort("status")}>
                      Status
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort("date")}>
                      Date
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedLeads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell className="font-medium">{lead.id}</TableCell>
                    <TableCell>{lead.name}</TableCell>
                    <TableCell>{lead.source}</TableCell>
                    <TableCell>{lead.type}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{lead.status}</Badge>
                    </TableCell>
                    <TableCell>{lead.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

