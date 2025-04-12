// /app/api/emp/login/route.ts
import { NextResponse } from 'next/server';
import { connectMongDB } from '../../../../../lib/mongodb';
import Employee from '../../../../../models/employee';

export async function POST(req) {
    try {
      const { username, password } = await req.json();
      console.log('Login attempt:', username, password);
  
      await connectMongDB();
      const user = await Employee.findOne({ ID_Emp: username });
  
      console.log('Found user:', user);
  
      if (!user || user.emp_Pass !== password) {
        console.log('Invalid credentials');
        return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
      }
  
      if (!user.emp_Action) {
        console.log('User not active');
        return NextResponse.json({ message: 'User not active' }, { status: 403 });
      }
  
      return NextResponse.json(user);
    } catch (error) {
      console.error('Login error:', error);
      return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
  }
  