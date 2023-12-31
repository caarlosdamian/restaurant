import { prisma } from '@/utils/connect';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  //localhost/api/porducts?cat='pizzas'
  const cat = searchParams.get('cat');

  try {
    const products = await prisma.product.findMany({
      where: {
        ...(cat ? { catSlug: cat } : { isFeatured: true }),
      },
    });
    return new NextResponse(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: 'Something went worng!' }),
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  //localhost/api/porducts?cat='pizzas'

  try {
    const product = await prisma.product.create({
      data: body,
    });
    return new NextResponse(JSON.stringify(product), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: 'Something went worng!' }),
      { status: 500 }
    );
  }
};
