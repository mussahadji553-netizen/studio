'use server';

import { verifyUserAccount, type VerifyUserAccountInput, type VerifyUserAccountOutput } from '@/ai/flows/admin-account-verification';
import { revalidatePath } from 'next/cache';
import type { User } from '@/lib/types';
import { users as mockUsers } from '@/lib/data';

export async function registerNewUser(name: string, phone: string): Promise<{ success: boolean; message: string; user?: User }> {
  console.log(`Registering new user: ${name}, ${phone}`);
  const existingUser = mockUsers.find(u => u.phone === phone);
  if (existingUser) {
    return { success: false, message: 'User with this phone number already exists.' };
  }

  const newUser: User = {
    id: (mockUsers.length + 1).toString(),
    name,
    phone,
    status: 'pending',
    registrationDetails: `Registered on ${new Date().toLocaleDateString()}`,
  };

  mockUsers.push(newUser);
  console.log('Current users:', mockUsers);
  
  revalidatePath('/admin');
  revalidatePath('/login');
  
  return { success: true, message: 'Registration successful! Your account is pending admin approval.', user: newUser };
}


export async function analyzeUserForVerification(input: VerifyUserAccountInput): Promise<VerifyUserAccountOutput> {
  try {
    const result = await verifyUserAccount(input);
    return result;
  } catch (error) {
    console.error('AI verification failed:', error);
    throw new Error('Failed to analyze user data.');
  }
}

export async function approveUser(userId: string): Promise<{ success: boolean; message: string }> {
  console.log(`Attempting to approve user: ${userId}`);
  const user = mockUsers.find(u => u.id === userId);

  if (user) {
    user.status = 'approved';
    console.log(`User ${userId} approved successfully.`);
    revalidatePath('/admin');
    return { success: true, message: 'User approved successfully.' };
  } else {
    console.error(`User ${userId} not found.`);
    return { success: false, message: 'User not found.' };
  }
}

export async function removeUser(userId: string): Promise<{ success: boolean; message: string }> {
  console.log(`Attempting to remove user: ${userId}`);
  const userIndex = mockUsers.findIndex(u => u.id === userId);

  if (userIndex > -1) {
    mockUsers.splice(userIndex, 1);
    console.log(`User ${userId} removed successfully.`);
    revalidatePath('/admin');
    return { success: true, message: 'User removed successfully.' };
  } else {
    console.error(`User ${userId} not found.`);
    return { success: false, message: 'User not found.' };
  }
}

// Placeholder actions for TipManager
export async function addTip(formData: FormData) {
  'use server'
  console.log('Adding tip:', Object.fromEntries(formData.entries()));
  revalidatePath('/admin');
  revalidatePath('/');
  return { success: true, message: 'Tip added successfully (simulated).' };
}

export async function updateTipStatus(tipId: string, status: 'win' | 'lost') {
  'use server'
  console.log(`Updating tip ${tipId} to ${status}`);
  revalidatePath('/admin');
  revalidatePath('/');
  return { success: true, message: 'Tip status updated (simulated).' };
}
