import dbConnect from '@/lib/dbConnect';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/user';
export async function POST(req: NextRequest): Promise<NextResponse> {
  await dbConnect();

  try {
    const { firstName, lastName, dob, profileImage, kycDoc } = await req.json();
    const user = new User({
      firstName,
      lastName,
      dob: new Date(dob),
      profileImage,
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
