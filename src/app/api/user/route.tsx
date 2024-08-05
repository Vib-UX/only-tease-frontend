import dbConnect from '@/lib/dbConnect';
import { NextRequest, NextResponse } from 'next/server';
import CreatorOnboarding from '@/models/user';
export async function POST(req: NextRequest): Promise<NextResponse> {
  await dbConnect();

  try {
    const { firstName, lastName, dob, profileImage, idDoc, kycDoc } =
      await req.json();
    const user = new CreatorOnboarding({
      firstName,
      lastName,
      dob: new Date(dob),
      profileImage,
      idDoc,
      kycDoc,
    });
    await user.save();
    return NextResponse.json({ success: true, data: user }, { status: 201 });
  } catch (error) {
    console.error('Error saving user:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 400 }
    );
  }
}
