"use server";

import { db } from "@/lib/prisma";

/**
 * For patients: ensure they have received this month's credit allocation.
 * If no CREDIT_PURCHASE this month, add default monthly credits.
 */
export async function checkAndAllocateCredits(user) {
  if (!user || user.role !== "PATIENT") return;

  const startOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );

  const existingThisMonth = await db.creditTransaction.findFirst({
    where: {
      userId: user.id,
      type: "CREDIT_PURCHASE",
      createdAt: { gte: startOfMonth },
    },
  });

  if (existingThisMonth) return;

  const monthlyCredits = 2;
  await db.$transaction([
    db.creditTransaction.create({
      data: {
        userId: user.id,
        type: "CREDIT_PURCHASE",
        amount: monthlyCredits,
        packageId: "monthly_allocation",
      },
    }),
    db.user.update({
      where: { id: user.id },
      data: { credits: { increment: monthlyCredits } },
    }),
  ]);
}
