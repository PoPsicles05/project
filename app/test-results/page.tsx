'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { toast } from '@/components/ui/use-toast'

export default function TestResults() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTestResults()
  }, [])

  async function fetchTestResults() {
    setLoading(true)
    const { data, error } = await supabase
      .from('test_results')
      .select('*')
    if (error) {
      console.error('Error fetching test results:', error)
      toast({
        title: "Error",
        description: "Failed to fetch test results. Please try again.",
        variant: "destructive",
      })
    } else {
      setResults(data)
    }
    setLoading(false)
  }

  if (loading) {
    return <div>Loading test results...</div>
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Test Results</h1>
      <Card>
        <CardHeader>
          <CardTitle>Your Test Results</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Test</TableHead>
                <TableHead>Result</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((result) => (
                <TableRow key={result.id}>
                  <TableCell>{result.date}</TableCell>
                  <TableCell>{result.test}</TableCell>
                  <TableCell>{result.result}</TableCell>
                  <TableCell>{result.doctor}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">View Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}