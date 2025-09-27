'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserVerification } from "./UserVerification"
import { TipManager } from "./TipManager"

export function AdminDashboard() {
  return (
    <Tabs defaultValue="users" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="users">User Management</TabsTrigger>
        <TabsTrigger value="tips">Tip Management</TabsTrigger>
      </TabsList>
      <TabsContent value="users">
        <UserVerification />
      </TabsContent>
      <TabsContent value="tips">
        <TipManager />
      </TabsContent>
    </Tabs>
  )
}
