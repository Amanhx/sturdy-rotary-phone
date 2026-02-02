import axios from 'axios';

export async function POST(req) {
  const { user } = await req.json();
  const botToken = process.env.BOT_TOKEN || 'YOUR_BOT_TOKEN'; // Replace or use env var
  const chatId = process.env.CHAT_ID || 'YOUR_CHAT_ID'; // Your backup chat ID

  try {
    await axios.post(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        chat_id: chatId,
        text: `New subscriber access:\nID: ${user.id}\nName: ${user.first_name}\nUsername: ${user.username || 'N/A'}`
      }
    );
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to send' }), { status: 500 });
  }
}
