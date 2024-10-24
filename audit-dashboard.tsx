"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ThumbsUp, ThumbsDown, ChevronRight, ChevronLeft, Plus, Trash2, RefreshCw, X } from "lucide-react"

// Mock data for the pie chart
const data = [
  { name: "Completed", value: 60, color: "#4CAF50" },
  { name: "In Progress", value: 30, color: "#FFC107" },
  { name: "Not Started", value: 10, color: "#F44336" },
]

// Mock data for the audit entries
const auditEntries = [
  { id: "JE001", status: "Error", account: "Account 1", auditTrail: "Details for JE001..." },
  { id: "JE002", status: "Warning", account: "Account 2", auditTrail: "Details for JE002..." },
  { id: "JE003", status: "OK", account: "Account 3", auditTrail: "Details for JE003..." },
  // Add more entries as needed
]

export default function Component() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isRightPanelExpanded, setIsRightPanelExpanded] = useState(false)
  const [selectedAuditEntry, setSelectedAuditEntry] = useState(null)

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className={`bg-white shadow-md transition-all duration-300 ${isSidebarCollapsed ? "w-16" : "w-64"}`}>
        <div className="p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="mb-4"
          >
            {isSidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
          <nav>
            <Collapsible>
              <CollapsibleTrigger className="flex items-center w-full p-2 text-left text-gray-700 hover:bg-gray-100 rounded">
                <span className={`mr-2 ${isSidebarCollapsed ? "sr-only" : ""}`}>Audits</span>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <Button variant="ghost" className="w-full justify-start">
                  JE Audit
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  TB
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  COA
                </Button>
              </CollapsibleContent>
            </Collapsible>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Audit Dashboard</h1>
          
          {/* Dashboard Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Audit Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            {/* Add more summary cards here */}
          </div>

          {/* Audit Entries List */}
          <Card>
            <CardHeader>
              <CardTitle>Audit Entries</CardTitle>
              <div className="flex justify-between items-center">
                <Input placeholder="Search entries..." className="max-w-sm" />
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add Entry
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>JE ID</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Account</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {auditEntries.map((entry) => (
                      <TableRow key={entry.id} onClick={() => setSelectedAuditEntry(entry)}>
                        <TableCell>{entry.id}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded text-white ${
                            entry.status === "Error" ? "bg-red-500" :
                            entry.status === "Warning" ? "bg-yellow-500" : "bg-green-500"
                          }`}>
                            {entry.status}
                          </span>
                        </TableCell>
                        <TableCell>{entry.account}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Panel */}
      <div className={`bg-white shadow-md transition-all duration-300 ${isRightPanelExpanded ? "w-80" : "w-12"}`}>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsRightPanelExpanded(!isRightPanelExpanded)}
          className="m-2"
        >
          {isRightPanelExpanded ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
        {isRightPanelExpanded && selectedAuditEntry && (
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">AI Suggestions</h2>
            <p className="mb-4">Here are some AI-generated suggestions for {selectedAuditEntry.id}:</p>
            <ul className="list-disc pl-5 mb-4">
              <li>Review the transaction details</li>
              <li>Check for proper documentation</li>
              <li>Verify account classification</li>
            </ul>
            <Button className="mb-4">
              <RefreshCw className="mr-2 h-4 w-4" /> Sync
            </Button>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" size="icon">
                <ThumbsUp className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <ThumbsDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}