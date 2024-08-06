// // pages/api/submitEmail.js

import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

// import { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { email } = req.body;
//   const formUrl =
//     'https://docs.google.com/forms/d/1GgIcvc1UTnVJXIHVOCRSp_2nrJuBpdaOFjKuXMeZZ1E/formResponse';
//   const emailEntry = 'entry.1149473559';

//   try {
//     const formData = new URLSearchParams();
//     formData.append(emailEntry, email);

//     const response = await fetch(formUrl, {
//       method: 'POST',
//       body: formData,
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//     });

//     if (response.ok) {
//       res.status(200).json({
//         message: 'Email submitted successfully',
//       });
//     } else {
//       res.status(response.status).json({
//         message: 'Failed to submit email',
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       message: 'Internal Server Error',
//     });
//   }
// }

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { email } = await req.json();
  const formUrl =
    'https://docs.google.com/forms/d/1GgIcvc1UTnVJXIHVOCRSp_2nrJuBpdaOFjKuXMeZZ1E/formResponse';
  const emailEntry = 'entry.1149473559';
  try {
    const formData = new URLSearchParams();
    formData.append(emailEntry, email);

    const response = await fetch(formUrl, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (response.ok) {
      return NextResponse.json(
        { success: true, message: 'Email submitted successfully' },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { success: true, message: 'Failed to submit email' },
        { status: 201 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 400 }
    );
  }
}
