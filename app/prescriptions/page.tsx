'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { toast } from '@/components/ui/use-toast'

export default function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPrescriptions()
  }, [])

  async function fetchPrescriptions() {
    setLoading(true)
    const { data, error } = await supabase
      .from('prescriptions')
      .select('*')
    if (error) {
      console.error('Error fetching prescriptions:', error)
      toast({
        title: "Error",
        description: "Failed to fetch prescriptions. Please try again.",
        variant: "destructive",
      })
    } else {
      setPrescriptions(data)
    }
    setLoading(false)
  }

  if (loading) {
    return <div>Loading prescriptions...</div>
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Prescriptions</h1>
      <Card>
        <CardHeader>
          <CardTitle>Your Current Prescriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Medication</TableHead>
                <TableHead>Dosage</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {prescriptions.map((prescription) => (
                <TableRow key={prescription.id}>
                  <TableCell>{prescription.medication}</TableCell>
                  <TableCell>{prescription.dosage}</TableCell>
                  <TableCell>{prescription.frequency}</TableCell>
                  <TableCell>{prescription.start_date}</TableCell>
                  <TableCell>{prescription.end_date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}