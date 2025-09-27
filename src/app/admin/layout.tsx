'use client';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { Trophy, Users, ListPlus, LogOut, PanelLeft, Settings } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        // In a real app, this would clear tokens/session
        router.push('/admin/login');
    }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 p-2">
            <Trophy className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline text-lg">BetPro Admin</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
            <SidebarMenu>
                <SidebarMenuItem>
                    <Link href="/admin">
                        <SidebarMenuButton isActive={pathname === '/admin'}>
                            <Users />
                            <span>Users</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
            <div className='flex items-center justify-between p-2 border-t'>
                <div className='flex items-center gap-2'>
                    <Avatar className="h-9 w-9">
                        <AvatarImage src="https://picsum.photos/seed/admin/40/40" alt="Admin" data-ai-hint="person portrait" />
                        <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col'>
                        <span className='text-sm font-semibold'>Admin</span>
                        <span className='text-xs text-muted-foreground'>admin@betpro.com</span>
                    </div>
                </div>
                <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="Log out">
                    <LogOut className='h-5 w-5' />
                </Button>
            </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className='flex items-center p-4 border-b bg-background/50 backdrop-blur-sm'>
             <SidebarTrigger className="md:hidden"/>
             <h1 className='text-xl font-headline ml-4'>Dashboard</h1>
        </header>
        <main className="p-4 sm:p-6 lg:p-8 bg-background">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
