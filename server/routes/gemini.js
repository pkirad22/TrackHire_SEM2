const express = require('express');
const router = express.Router();



const {
  GoogleGenerativeAI
} = require('@google/generative-ai');

const genAI =
  new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
  );

router.post(
  '/followup',
  async (req, res) => {

    try {

      const {
        company,
        role,
        status,
        daysWaiting
      } = req.body;

      const model =
        genAI.getGenerativeModel({
          model: 'models/gemini-2.0-flash'
        });

      const prompt = `
Write a professional follow-up email.

Company: ${company}
Role: ${role}
Current Status: ${status}
Days Since Last Update: ${daysWaiting}

Requirements:
- Professional tone
- Short and polite
- Ask for application status update
- Include subject line
`;

      const result =
        await model.generateContent(
          prompt
        );

      const email =
        result.response.text();

      res.json({
        email
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          'Gemini generation failed'
      });

    }

  }
);

module.exports = router;