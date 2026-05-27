// app/api/revalidate/route.ts
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    
    revalidatePath('/'); 
    
    revalidateTag('featured-event', {}); 
    
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    return NextResponse.json({ revalidated: false, error: "Revalidation failed" }, { status: 500 });
  }
}
