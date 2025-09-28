// src/ai/flows/admin-account-verification.ts
'use server';

/**
 * @fileOverview Implements the admin account verification flow.
 *
 * This file defines a Genkit flow that allows administrators to verify user accounts
 * by summarizing user information and identifying potential red flags using AI.
 *
 * @exports verifyUserAccount - The main function to trigger the user verification flow.
 * @exports VerifyUserAccountInput - The input type for the verifyUserAccount function.
 * @exports VerifyUserAccountOutput - The output type for the verifyUserAccount function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VerifyUserAccountInputSchema = z.object({
  userName: z.string().describe('The name of the user.'),
  userPhone: z.string().describe('The phone number of the user.'),
  registrationDetails: z
    .string()
    .describe(
      'Any additional details provided by the user during registration.'
    ),
});
export type VerifyUserAccountInput = z.infer<typeof VerifyUserAccountInputSchema>;

const VerifyUserAccountOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A summary of the user registration information, highlighting potential red flags.'
    ),
  isApproved: z.boolean().describe('Whether the user account is approved.'),
});
export type VerifyUserAccountOutput = z.infer<typeof VerifyUserAccountOutputSchema>;

export async function verifyUserAccount(
  input: VerifyUserAccountInput
): Promise<VerifyUserAccountOutput> {
  return verifyUserAccountFlow(input);
}

const verificationPrompt = ai.definePrompt({
  name: 'verificationPrompt',
  input: {schema: VerifyUserAccountInputSchema},
  output: {schema: VerifyUserAccountOutputSchema},
  prompt: `You are an administrator reviewing a new user registration.

  Based on the following information, provide a summary of the user and highlight any potential red flags that might indicate a fraudulent account.

  User Name: {{{userName}}}
  User Phone: {{{userPhone}}}
  Registration Details: {{{registrationDetails}}}

  Respond in a professional tone. Make a determination of whether the account should be automatically approved or not. Set isApproved to true if it should be auto-approved, otherwise set it to false.`,
});

const verifyUserAccountFlow = ai.defineFlow(
  {
    name: 'verifyUserAccountFlow',
    inputSchema: VerifyUserAccountInputSchema,
    outputSchema: VerifyUserAccountOutputSchema,
  },
  async input => {
    const {output} = await verificationPrompt(input);
    return output!;
  }
);
