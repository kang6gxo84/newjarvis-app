# J.A.R.V.I.S. — Gemini + OpenAI Realtime

## Architecture
- Gemini: text commands and camera/vision.
- OpenAI Realtime: live voice conversation.
- Vercel Serverless Function: creates short-lived OpenAI Realtime client secrets.
- No permanent OpenAI API key is placed in the browser.

## Vercel setup
1. Import this repository into Vercel.
2. Add an environment variable:
   `OPENAI_API_KEY` = your OpenAI API key
3. Deploy.
4. Open the deployed site over HTTPS.
5. Allow microphone permission.

The frontend calls:
`POST /api/openai/realtime-token`

Do not put the permanent OpenAI API key in `index.html`.

## GitHub
Upload the contents of this folder to the root of your repository, not the ZIP itself.
