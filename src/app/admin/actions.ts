'use server';

import { verifyUserAccount, type VerifyUserAccountInput, type VerifyUserAccountOutput } from '@/ai/flows/admin-account-verification';
import { revalidatePath } from 'next/cache';

// Mock database interactions
let mockUsers = (await import('@/lib/data')).users;

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
